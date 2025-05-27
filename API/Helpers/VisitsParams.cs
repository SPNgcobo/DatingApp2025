namespace API.Helpers;

public class VisitsParams : PaginationParams
{
    public int UserId { get; set; }
    public required string Predicate { get; set; } = "visited";
}
