using API.Controllers;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class VisitsController(IUnitOfWork unitOfWork) : BaseApiController
{
    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> Togglevisit(int targetUserId)
    {
        var sourceUserId = User.GetUserId();
        if (sourceUserId == targetUserId) return BadRequest("You cannon visit yourself");

        var existingVisit = await unitOfWork.VisitsRepository.GetUserVisit(sourceUserId, targetUserId);

        if (existingVisit == null)
        {
            var visit = new UserVisit
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };

            unitOfWork.VisitsRepository.AddVisit(visit);
        }
        else
        {
            unitOfWork.VisitsRepository.DeleteVisit(existingVisit);
        }

        if (await unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to update visit");
    }

    [HttpGet("visit")]

    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserVisitIds()
    {
        return Ok(await unitOfWork.VisitsRepository.GetCurrentUserVisitIds(User.GetUserId()));
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserVisits([FromQuery]VisitsParams visitsParams)
    {

        visitsParams.UserId = User.GetUserId();
        var users = await unitOfWork.VisitsRepository.GetUserVisits(visitsParams);

        Response.AddPaginationHeader(users);

        return Ok(users);
    }
}
