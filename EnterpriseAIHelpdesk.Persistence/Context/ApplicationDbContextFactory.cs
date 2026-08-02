using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace EnterpriseAIHelpdesk.Persistence.Context;
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlServer(
            "Server=localhost;Database=EnterpriseAIHelpdeskDB;Trusted_Connection=True;TrustServerCertificate=True;");
        return new ApplicationDbContext(optionsBuilder.Options);
    }
}