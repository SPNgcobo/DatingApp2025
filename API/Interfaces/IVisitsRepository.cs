using API.DTOs;
using API.Helpers;

namespace API;

public interface IVisitsRepository
{
    Task<UserVisit?> GetUserVisit(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>> GetUserVisits(VisitsParams visitsParams);
    Task<IEnumerable<int>> GetCurrentUserVisitIds(int currentUserId);
    void DeleteVisit(UserVisit visit);
    void AddVisit(UserVisit visit);
}
