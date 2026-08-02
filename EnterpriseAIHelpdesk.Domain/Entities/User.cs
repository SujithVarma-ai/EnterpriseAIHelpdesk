using EnterpriseAIHelpdesk.Domain.Common;
using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Domain.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Employee;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}