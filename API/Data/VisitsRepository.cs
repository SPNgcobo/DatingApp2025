using API.Data;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API;

public class VisitsRepository(DataContext context, IMapper mapper) : IVisitsRepository
{
    public void AddVisit(UserVisit visit)
    {
        context.Visits.Add(visit);
    }

    public void DeleteVisit(UserVisit visit)
    {
        context.Visits.Remove(visit);
    }

    public async Task<IEnumerable<int>> GetCurrentUserVisitIds(int currentUserId)
    {
        return await context.Visits
            .Where(x => x.SourceUserId == currentUserId)
            .Select(x => x.TargetUserId)
            .ToListAsync();
    }

    public async Task<UserVisit?> GetUserVisit(int sourceUserId, int targetUserId)
    {
        return await context.Visits.FindAsync(sourceUserId, targetUserId);
    }

    public async Task<PagedList<MemberDto>> GetUserVisits(VisitsParams visitsParams)
    {
        var visits = context.Visits.AsQueryable();
        IQueryable<MemberDto> query;

        switch (visitsParams.Predicate)
        {
            case "visited":
                query = visits
                    .Where(x => x.SourceUserId == visitsParams.UserId)
                    .Select(x => x.TargetUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
                break;
            case "visitedBy":
                query = visits
                    .Where(x => x.TargetUserId == visitsParams.UserId)
                    .Select(x => x.SourceUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider); 
                break;      
            default:
                var visitIds = await GetCurrentUserVisitIds(visitsParams.UserId);

                query = visits
                    .Where(x => x.TargetUserId == visitsParams.UserId && visitIds.Contains(x.SourceUserId))
                    .Select(x => x.SourceUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
                break;
        }

        return await PagedList<MemberDto>.CreateAsync(query, visitsParams.PageNumber, visitsParams.PageSize);
    }
}
