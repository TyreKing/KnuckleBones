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
        public int[] Col {  get; set; } = [ 0, 0, 0 ];

        public void SetTotal()
        {
            Total = Col.Sum();
        }
    }

    public class Player
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public int Die { get; set; }
    }

    public class Game
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public Board Player1Board { get; set; }
        public Board Player2Board { get; set; }
        public Player Host { get; set; }
        public Player Challenger { get; set; }

        public bool IsHostTurn { get; set; } = true;

        public Game(string code, Player host)
        {
            Id = Guid.NewGuid();
            Code = code;
            Player1Board = new Board();
            Player2Board = new Board();
            Host = host;
        }
    }

    public class GameRequest()
    {
        public Player Player { get; set; }
        public string Code { get; set;}
    }
}
