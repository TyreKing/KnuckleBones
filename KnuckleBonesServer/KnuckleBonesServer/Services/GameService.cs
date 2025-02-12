using KnuckleBonesServer.Models;

namespace KnuckleBonesServer.Services
{
    public class GameService
    {
        private Dictionary<string, Game> _games;

        public GameService()
        {
            if (_games == null || !_games.Any())
            {
                _games = new Dictionary<string, Game>();
            }
        }

        public Game CreateGame(Player player, string code)
        {
            var game = _games.FirstOrDefault(x => x.Key == code).Value;

            //Create game if it does not exist
            if (game == null)
            {
                game = new Game(code, player);
                _games.Add(code, game);
            }

            return game;

        }

        public Game? JoinGame(Player player, string code)
        {
            var game = _games.FirstOrDefault(x => x.Key == code).Value;
            if (game == null)
            {
                return null;
            }
            game.Challenger = player;
            return game;
        }

        public Game? GetDie(Player player, string code)
        {
            var game = _games.FirstOrDefault(x => x.Key == code).Value;
            if (game == null)
            {
                return null;
            }

            var rand = new Random();
            var die = rand.Next(1, 7);
            if (game.Host.Id == player.Id && game.IsHostTurn)
            {
                game.Die = die;
            }

            if (game.Challenger.Id == player.Id && !game.IsHostTurn)
            {
                game.Die = die;
            }

            return game;
        }

        public Game? PlaceDie(Player player, string code, int columnIndex)
        {
            var game = _games.FirstOrDefault(x => x.Key == code).Value;
            if (game == null)
            {
                return null;
            }
            if (game.IsHostTurn && game.Host.Id == player.Id)
            {
                if (columnIndex < 3 && columnIndex >= 0)
                {
                    game.HostBoard.Columns[columnIndex] = CalculateColumn(game.HostBoard.Columns[columnIndex], game.Die);
                    game.ChallengerBoard.Columns[columnIndex] = DeductDie(game.ChallengerBoard.Columns[columnIndex], game.Die);
                }
            }
            else if (!game.IsHostTurn && game.Challenger.Id == player.Id)
            {
                game.ChallengerBoard.Columns[columnIndex] = CalculateColumn(game.ChallengerBoard.Columns[columnIndex], game.Die);
                game.HostBoard.Columns[columnIndex] = DeductDie(game.HostBoard.Columns[columnIndex], game.Die);

            }

            var winner = GameStatus(game);
            return winner ?? game;
        }

        public Game? GameStatus(Game game)
        {
            if (game.HostBoard.Columns.SelectMany(x => x.Value.Cells).Count() == 9
                || game.ChallengerBoard.Columns.SelectMany(x => x.Value.Cells).Count() == 9)
            {
                if (game.HostBoard.Total > game.ChallengerBoard.Total)
                {
                    game.Winner = GameWinner.Player1;
                }
                else if (game.HostBoard.Total < game.ChallengerBoard.Total)
                {
                    game.Winner = GameWinner.Player2;
                }
                else if (game.HostBoard.Total == game.ChallengerBoard.Total)
                {
                    game.Winner = GameWinner.Tie;
                }
                else
                {
                    game.Winner = GameWinner.None;
                }
            }
            return game;
        }

        public Column DeductDie(Column column, int die)
        {
            var deductedColumn = column.Cells.Where(x => x != die).ToList();
            int total = 0;
            for (int i = 0; i < deductedColumn.Count; i++)
            {
                var occurrences = deductedColumn.Where(x => x == deductedColumn[i]).Count();
                total += deductedColumn[i] * occurrences;
            }

            return new Column()
            {
                Cells = deductedColumn,
                Total = total
            };
        }

        public Column CalculateColumn(Column column, int die)
        {
            if (column.Cells.Count < 3)
            {
                column.Cells.Add(die);
            }

            int total = 0;
            for (int i = 0; i < column.Cells.Count; i++)
            {
                var occurrences = column.Cells.Where(x => x == column.Cells[i]).Count();
                total += column.Cells[i] * occurrences;
            }

            column.Total = total;
            return column;
        }
    }
}
