namespace EnterpriseAIHelpdesk.Application.DTOs.Comment;

public class CommentResponseDto
{
    public Guid Id { get; set; }

    public string Message { get; set; } = string.Empty;

    public Guid UserId { get; set; }

    public DateTime CreatedAt { get; set; }
}