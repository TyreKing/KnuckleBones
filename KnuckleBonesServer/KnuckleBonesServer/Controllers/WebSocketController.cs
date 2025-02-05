using System.Net.WebSockets;
using KnuckleBonesServer.Models;
using KnuckleBonesServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace KnuckleBonesServer.Controllers;

[ApiController]
[Route("[controller]")]
public class WebSocketController : ControllerBase
{
    private GameService _gameService;
    public WebSocketController(GameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("game")]
    public async Task<Game> CreateGame(GameRequest createGameRequest)
    {
       return _gameService.CreateGame(createGameRequest.Player, createGameRequest.Code);
    }

    [HttpPut("game")]
    public async Task<Game?> JoinGame(GameRequest joinGameRequest)
    {
        return _gameService.JoinGame(joinGameRequest.Player, joinGameRequest.Code);
    }

    [HttpPost("game/roll")]
    public async Task<Game?> RollDie(GameRequest rollDieRequest)
    {
        return _gameService.GetDie(rollDieRequest.Player, rollDieRequest.Code);
    }

    //[Route("/ws")]
    //public async Task Get()
    //{
    //    if (HttpContext.WebSockets.IsWebSocketRequest)
    //    {
    //        using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
    //        await Echo(webSocket);
    //    }
    //    else
    //    {
    //        HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
    //    }
    //}
    //#endregion

    //private static async Task Echo(WebSocket webSocket)
    //{
    //    var buffer = new byte[1024 * 4];
    //    var receiveResult = await webSocket.ReceiveAsync(
    //        new ArraySegment<byte>(buffer), CancellationToken.None);

    //    while (!receiveResult.CloseStatus.HasValue)
    //    {
    //        await webSocket.SendAsync(
    //            new ArraySegment<byte>(buffer, 0, receiveResult.Count),
    //            receiveResult.MessageType,
    //            receiveResult.EndOfMessage,
    //            CancellationToken.None);

    //        receiveResult = await webSocket.ReceiveAsync(
    //            new ArraySegment<byte>(buffer), CancellationToken.None);
    //    }

    //    await webSocket.CloseAsync(
    //        receiveResult.CloseStatus.Value,
    //        receiveResult.CloseStatusDescription,
    //        CancellationToken.None);
    //}
}