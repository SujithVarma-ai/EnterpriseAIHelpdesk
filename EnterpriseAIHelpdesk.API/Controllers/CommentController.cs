using EnterpriseAIHelpdesk.Application.DTOs.Comment;
using EnterpriseAIHelpdesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnterpriseAIHelpdesk.API.Controllers;

[ApiController]
[Route("api/tickets/{ticketId:guid}/comments")]
[Authorize]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpPost]
    public async Task<IActionResult> AddComment(
        Guid ticketId,
        CreateCommentDto createCommentDto)
    {
        var result = await _commentService.AddCommentAsync(
            ticketId,
            createCommentDto);

        if (!result)
            return BadRequest("Unable to add comment.");

        return Ok("Comment added successfully.");
    }

    [HttpGet]
    public async Task<IActionResult> GetComments(Guid ticketId)
    {
        var comments = await _commentService.GetCommentsAsync(ticketId);

        return Ok(comments);
    }
}