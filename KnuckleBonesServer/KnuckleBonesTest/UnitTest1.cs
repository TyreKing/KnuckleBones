using KnuckleBonesServer.Models;
using KnuckleBonesServer.Services;

namespace KnuckleBonesTest
{
    public class Tests
    {
        private GameService _gameService;
        private Player _hostPlayer, _challengerPlayer;
        private const string CODE = "123456";

        [SetUp]
        public void Setup()
        {
            _gameService = new GameService();
            _hostPlayer = new Player
            {
                Id = Guid.NewGuid(),
                Username = "Host Player"
            };

            _challengerPlayer = new Player
            {
                Id = Guid.NewGuid(),
                Username = "Challenger player"
            };
        }

        [Test]
        public void CreateGame()
        {
            var game = _gameService.CreateGame(_hostPlayer, CODE);
            Assert.True(game.Code == CODE);
        }

        [Test]
        public void AddToBoardIsSuccessful()
        {
            _gameService.CreateGame(_hostPlayer, CODE);
            _gameService.JoinGame(_challengerPlayer, CODE);
            var die = _gameService.GetDie(_hostPlayer, CODE).Die;
            var columnIndx = 2;
            var game = _gameService.PlaceDie(_hostPlayer, CODE, columnIndx);
            Assert.True(game.HostBoard.Columns[columnIndx].Cells.Contains(die));
        }
    }
}