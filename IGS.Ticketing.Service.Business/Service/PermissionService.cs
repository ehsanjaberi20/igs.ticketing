using IGS.Ticketing.Service.Common.Dtos;
using IGS.Ticketing.Service.Common.IService;
using IGS.Ticketing.Service.DataLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;

namespace IGS.Ticketing.Service.Business.Service
{
    public interface IPermissionService
    {
        Common.Models.User GetCurrentUserInfo();
        bool HasPermission(Guid permissionId);
        void Update(int usrVCodeInt, List<Guid> guids);
        TreeNode GetSecurityTree();
    }
    public class PermissionService : IPermissionService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;
        private readonly IPermissionDal _permissionDal;
        private readonly IUserService _userService;
        public PermissionService(IHttpContextAccessor httpContextAccessor, IMemoryCache cache, IPermissionDal permissionDal, IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
            _permissionDal = permissionDal;
            _userService = userService;
        }

        public TreeNode GetSecurityTree()
        {
            return IGS.Ticketing.Service.Common.Permission.Permissions.GetSecurityItems();
        }
        public Common.Models.User GetCurrentUserInfo()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user?.Identity?.IsAuthenticated != true)
                throw new Exception("دسترسی غیر مجاز");

            var nationalId = user.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(nationalId))
                throw new Exception("دسترسی غیر مجاز");
            return _userService.Find(nationalId);
        }
        public bool HasPermission(Guid permissionId)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user?.Identity?.IsAuthenticated != true)
                return false;

            var nationalId = user.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(nationalId))
                return false;

            if (!_cache.TryGetValue(nationalId, out HashSet<Guid>? userPermissions))
            {
                userPermissions = LoadUserPermissionsFromSource(nationalId);

                _cache.Set(nationalId, userPermissions, TimeSpan.FromDays(50));
            }

            return userPermissions.Contains(permissionId);
        }
        public void Update(int usrVCodeInt, List<Guid> guids)
        {
            _permissionDal.Update(usrVCodeInt, guids);

            var user = _userService.Find(usrVCodeInt);
            _cache.Remove(user.usrNationalCodeStr);
        }
        private HashSet<Guid> LoadUserPermissionsFromSource(string nationalId)
        {
            var user = _userService.Find(nationalId);
            var guids = _permissionDal.GetAll(user.usrVCodeInt);
            return new HashSet<Guid>(guids);
        }
    }
}
