using EnterpriseAIHelpdesk.Domain.Entities;

namespace EnterpriseAIHelpdesk.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}