using API.Entities;

namespace API;

public class UserVisit
{
    public AppUser SourceUser { get; set; } = null!;
    public int SourceUserId { get; set; }
    public AppUser TargetUser { get; set; } = null!;
    public int TargetUserId { get; set; } 

    public DateTime VisitDate { get; set; } = DateTime.UtcNow;
}
