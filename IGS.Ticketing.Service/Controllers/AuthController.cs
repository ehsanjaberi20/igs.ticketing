using IGS.Ticketing.Service.Business.Service;
using IGS.Ticketing.Service.Classes;
using IGS.Ticketing.Service.Common.IService;
using IGS.Ticketing.Service.Common.Permission;
using IGS.Ticketing.Service.Common.Security;
using IGS.Ticketing.Service.Common.WebServiceDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IGS.Ticketing.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IPermissionService _permissionService;

        public AuthController(IConfiguration config, IUserService userService, IPermissionService permissionService)
        {
            this._config = config;
            this._userService = userService;
            this._permissionService = permissionService;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto register)
        {
            var result = _userService.Insert(register);
            return Ok(new { result });

        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            var user = _userService.Find(login.Username);

            if (user != null && PasswordHasher.VerifyPassword(login.Password, user.usrPasswordHashBin, user.usrSaltBin))
            {
                var token = JwtHelper.GenerateToken(_config, login.Username, user);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                };
                Response.Cookies.Append("AuthToken", token, cookieOptions);

                //var result = _permissionService.GetCurrentUserInfo();
                return Ok(new { token });
            }

            throw new CustomExeptions("نام کاربری یا رمز عبور اشتباه است.", 401);
        }
        [Authorize]
        [HttpPost("profile")]
        public IActionResult profile()
        {
            var result = _permissionService.GetCurrentUserInfo();
            return Ok(result);
        }
        [Authorize]
        [HttpPost("logout")]
        public IActionResult logout()
        {
            if (Request.Cookies.ContainsKey("AuthToken"))
            {
                Response.Cookies.Delete("AuthToken");
            }

            return Ok(new { message = "Logout successful" });
        }
        [Authorize]
        [HttpGet("secure")]
        public IActionResult SecureEndpoint()
        {
            _permissionService.HasPermission(Permissions.UserPerm.View);

            var result = _userService.FillGrid(0, 50, "", "");
            return Ok(result);
        }
        [HttpPost("GetSecurityTree")]
        public IActionResult GetSecurityTree()
        {
            var result = _permissionService.GetSecurityTree();
            return Ok(result);

        }
    }
}
