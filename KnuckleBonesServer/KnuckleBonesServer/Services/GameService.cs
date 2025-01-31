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
                game.Host.Die = die;
                return game.Host;
            }

            if (game.Challenger.Id == player.Id && !game.IsHostTurn)
            {
                game.Challenger.Die = die;
                return game.Challenger;
            }

            return null;
        }

    }
}
