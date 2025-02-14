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

        /// <summary>
        /// This initializes the game and sets the host player and game code.
        /// </summary>
        /// <param name="player">The host player that is creating the game</param>
        /// <param name="code">The 6 digit code that that will be used as the game ID</param>
        /// <returns></returns>
        public Game CreateGame(Player player, string code)
        {
            var game = GetGameByCode(code);

            //Create game if it does not exist
            if (game == null)
            {
                game = new Game(code, player);
                _games.Add(code, game);
            }

            return game;

        }

        /// <summary>
        /// This adds the challenger player to the game that has the same game code.
        /// </summary>
        /// <param name="player"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public Game? JoinGame(Player player, string code)
        {
            var game = GetGameByCode(code);

            //Checks to see if the game does not exist
            if (game == null)
            {
                return null;
            }

            //Set the challenger to the player making the join request
            game.Challenger = player;
            return game;
        }

        /// <summary>
        /// Sets a die with the value range 1-6 
        /// </summary>
        /// <param name="player"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public Game? GetDie(Player player, string code)
        {
            var game = GetGameByCode(code);

            //Checks to see if the game does not exist
            if (game == null)
            {
                return null;
            }

            //initialize Random object
            var rand = new Random();

            //get a random number with the minValue of 1 and less the the maxValue of 7
            var die = rand.Next(1, 7);

            //If it is the host's rolling the die and it is the host's turn
            //or if it is the challenger's turn
            if ((game.Host.Id == player.Id && game.IsHostTurn) 
                || (game.Challenger.Id == player.Id && !game.IsHostTurn))
            {
                //set the die 
                game.Die = die;
            }

            return game;
        }

        /// <summary>
        /// The player can place the die in their chosen column.
        /// </summary>
        /// <param name="player"></param>
        /// <param name="code"></param>
        /// <param name="columnIndex">the player selected column</param>
        /// <returns></returns>
        public Game? PlaceDie(Player player, string code, int columnIndex)
        {
            var game = GetGameByCode(code);

            //Checks to see if the game does not exist
            if (game == null)
            {
                return null;
            }

            //if it is the host's turn
            if (game.IsHostTurn && game.Host.Id == player.Id)
            {
                //if the chosen column is in the range of correct indexes
                if (columnIndex < 3 && columnIndex >= 0)
                {
                    //Calculate the host's board
                    game.HostBoard.Columns[columnIndex] = CalculateColumn(game.HostBoard.Columns[columnIndex], game.Die);

                    //Deduct the die from the challenger's board
                    game.ChallengerBoard.Columns[columnIndex] = DeductDie(game.ChallengerBoard.Columns[columnIndex], game.Die);
                }
            }

            //if it is the challenger's turn
            else if (!game.IsHostTurn && game.Challenger.Id == player.Id)
            {
                //Calculate the challenger's board
                game.ChallengerBoard.Columns[columnIndex] = CalculateColumn(game.ChallengerBoard.Columns[columnIndex], game.Die);

                //Deduct the die from the host's board
                game.HostBoard.Columns[columnIndex] = DeductDie(game.HostBoard.Columns[columnIndex], game.Die);

            }
            
            //return the game with the updated status
            return GameStatus(game);
        }


        /// <summary>
        /// Checks and updates the game's status
        /// </summary>
        /// <param name="game">The current game</param>
        /// <returns>The game</returns>
        public Game? GameStatus(Game game)
        {
            //If the host or challenger board is filled
            if (game.HostBoard.Columns.SelectMany(x => x.Value.Cells).Count() == 9
                || game.ChallengerBoard.Columns.SelectMany(x => x.Value.Cells).Count() == 9)
            {
                //if the host board total is greater than the challenge board total
                if (game.HostBoard.Total > game.ChallengerBoard.Total)
                {
                    //set the game winner to player 1
                    game.Winner = GameWinner.Player1;
                }

                //if the host board total is less than the challenger board total
                else if (game.HostBoard.Total < game.ChallengerBoard.Total)
                {
                    //set the game winner to player 2
                    game.Winner = GameWinner.Player2;
                }

                //if the host board and challenger board total are the same
                else if (game.HostBoard.Total == game.ChallengerBoard.Total)
                {
                    //set the game winner to be a tie
                    game.Winner = GameWinner.Tie;
                }

                //By default there is no game winner
                else
                {
                    //set the game winner to none
                    game.Winner = GameWinner.None;
                }
            }
            return game;
        }

        /// <summary>
        /// This deducts the die from the column and calculates the column total
        /// </summary>
        /// <param name="column"></param>
        /// <param name="die"></param>
        /// <returns></returns>
        public Column DeductDie(Column column, int die)
        {
            //create a copy of the column with out the die in it.
            var deductedColumn = column.Cells.Where(x => x != die).ToList();
            int total = 0;
            for (int i = 0; i < deductedColumn.Count; i++)
            {
                //find all of the occurrences of the of each number in the column
                var occurrences = deductedColumn.Where(x => x == deductedColumn[i]).Count();

                //multiply the number by it's occurrences and add it to the column total
                total += deductedColumn[i] * occurrences;
            }

            //return the updated column
            return new Column()
            {
                Cells = deductedColumn,
                Total = total
            };
        }


        /// <summary>
        /// Adds the die to the column then calculates the new total
        /// </summary>
        /// <param name="column"></param>
        /// <param name="die"></param>
        /// <returns></returns>
        public Column CalculateColumn(Column column, int die)
        {
            //If the cells in the column are less than 3
            if (column.Cells.Count < 3)
            {
                //add the die to the column
                column.Cells.Add(die);
            }

            int total = 0;
            for (int i = 0; i < column.Cells.Count; i++)
            {
                //find all of the occurrences of the of each number in the column
                var occurrences = column.Cells.Where(x => x == column.Cells[i]).Count();

                //multiply the number by it's occurrences and add it to the column total
                total += column.Cells[i] * occurrences;
            }

            //update the column total
            column.Total = total;
            return column;
        }

        /// <summary>
        /// Gets the game by game code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private Game? GetGameByCode(string code)
        {
            return _games.FirstOrDefault(x => x.Key == code).Value;
        }
    }
}
