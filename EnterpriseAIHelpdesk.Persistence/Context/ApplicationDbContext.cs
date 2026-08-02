using EnterpriseAIHelpdesk.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseAIHelpdesk.Persistence.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Ticket> Tickets { get; set; }

    public DbSet<Comment> Comments { get; set; }

    public DbSet<Attachment> Attachments { get; set; }
}