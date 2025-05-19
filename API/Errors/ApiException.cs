namespace API;

public class ApiException(int statuCode, string message, string? details)
{
    public int StatuCode { get; set; } = statuCode;
    public string Massage { get; set; } = message;
    public string? Details { get; set; } = details;
}
