using KnuckleBonesServer.Models;
using Microsoft.Extensions.Hosting;

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

        public Player? GetDie(Player player, string code)
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
                return game.Host;
            }

            if (game.Challenger.Id == player.Id && !game.IsHostTurn)
            {
                game.Die = die;
                return game.Challenger;
            }

            return null;
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
                    //TODO remove die from challenger board
                }
            }
            else if (!game.IsHostTurn && game.Challenger.Id == player.Id)
            {
                game.ChallengerBoard.Columns[columnIndex] = CalculateColumn(game.ChallengerBoard.Columns[columnIndex], game.Die);
            }

            return game;
        }

        private Column DeductDie(Column column, int die)
        {
            var deductedColumn = new int[3];
            for (int i = 0; i < column.Cells.Length; i++)
            {
                if (column.Cells[i].HasValue)
                if (column.Cells[i] == die)
                {
                    column.Cells[i] = null;
                }
            }

            column.Total = SetTotal(column);
            return column;
        }

        private Column CalculateColumn(Column column, int die)
        {
            for (int i = 0; i < column.Cells.Length; i++)
            {
                if (column.Cells[i] == null)
                {
                    column.Cells[i] = die;
                    break;
                }
            }

            column.Total = SetTotal(column);
            return column;
        }

        private int SetTotal(Column column)
        {
            return column.Cells.Where(x => x.HasValue)?.Sum() ?? 0;
        }



    }
}
