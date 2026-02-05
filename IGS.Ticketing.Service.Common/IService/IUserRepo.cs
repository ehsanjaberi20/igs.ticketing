using IGS.Ticketing.Service.Common.Models;
using IGS.Ticketing.Service.Common.WebServiceDtos;

namespace IGS.Ticketing.Service.Common.IService
{
    public interface IUserService
    {
        /// <summary>
        /// افزودن کاربر
        /// </summary>
        /// <param name="user">dto کاربر</param>
        /// <returns></returns>
        int Insert(RegisterDto registerDto);
        void Update(int usrVCodeInt, User user);
        void Delete(int usrVCodeInt);
        (List<User> list, int count) FillGrid(int pagenumber, int pageSize, string sortBy, string search);
        User Find(int usrVCodeInt);
        User Find(string nationalIdStr);

    }
}
