using IGS.Ticketing.Service.Common.IService;
using IGS.Ticketing.Service.Common.WebServiceDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IGS.Ticketing.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("fillgrid")]
        public IActionResult FillGrid([FromBody] Users_FillGridDto dto)
        {
            var result = _userService.FillGrid(dto.PageNumber, dto.PageSize, dto.SortBy, dto.Search);
            return Ok(result.list);
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto register)
        {
            var result = _userService.Insert(register);
            return Ok(new { result });
        }
    }
}
