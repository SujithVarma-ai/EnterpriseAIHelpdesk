using EnterpriseAIHelpdesk.Application.DTOs.Comment;

namespace EnterpriseAIHelpdesk.Application.Interfaces;

public interface ICommentService
{
    Task<bool> AddCommentAsync(Guid ticketId, CreateCommentDto createCommentDto);

    Task<List<CommentResponseDto>> GetCommentsAsync(Guid ticketId);
}