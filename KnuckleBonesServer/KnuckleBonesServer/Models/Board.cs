using System.Security.Cryptography.X509Certificates;

namespace KnuckleBonesServer.Models
{
    public class Board
    {
        public Dictionary<int, Column> Columns { get; set; } = [];

        public Board() 
        {
            Columns = new Dictionary<int, Column>();
            for(int i = 0; i < 3; i++)
            {
                Columns.Add(i, new Column());
            }
        }
    }

    public class Column
    {
        public int Total = 0;
        public List<int> Cells {  get; set; } = new List<int>();

    }

    public class Player
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }

    public class Game
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public Board HostBoard { get; set; }
        public Board ChallengerBoard { get; set; }
        public Player Host { get; set; }
        public Player Challenger { get; set; }
        public int Die { get; set; }
        public bool IsHostTurn { get; set; } = true;

        public Game(string code, Player host)
        {
            Id = Guid.NewGuid();
            Code = code;
            HostBoard = new Board();
            ChallengerBoard = new Board();
            Host = host;
        }
    }

    public class GameRequest
    {
        public Player Player { get; set; }
        public string Code { get; set;}
    }

    public class PlaceDieRequest : GameRequest
    {
        public int Column { get; set; }
    }
}
