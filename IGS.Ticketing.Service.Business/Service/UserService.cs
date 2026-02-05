using IGS.Ticketing.Service.Common.Enums;
using IGS.Ticketing.Service.Common.IService;
using IGS.Ticketing.Service.Common.Models;
using IGS.Ticketing.Service.Common.Security;
using IGS.Ticketing.Service.Common.WebServiceDtos;
using IGS.Ticketing.Service.DataLayer;

namespace IGS.Ticketing.Service.Business.Service
{
    public class UserService : IUserService
    {
        private readonly IUserDal _userDal;

        public UserService(IUserDal userDal)
        {
            _userDal = userDal;
        }
        public int Insert(RegisterDto register)
        {
            var passwordInfo = PasswordHasher.HashPassword(register.password);
            var user = new Common.Models.User()
            {
                usrNameStr = register.usrNameStr,
                usrFamilyStr = register.usrFamilyStr,
                usrNationalCodeStr = register.usrNationalCodeStr,
                usrPhoneNumberStr = register.usrPhoneNumberStr,
                usrGenderTny = (Enums.Gender)register.usrGenderTny,
                usrStatusTny = (Enums.Status)register.usrStatusTny,
                usrRoleTny = (Enums.Role)register.usrRoleTny,
                usrCreatorUsrVCodeInt = 1,
                usrPasswordHashBin = passwordInfo.Hash,
                usrSaltBin = passwordInfo.Salt,
            };
            return _userDal.Insert(user);
        }

        public void Update(int usrVCodeInt, User user)
        {
            throw new NotImplementedException();
        }
        public void Delete(int usrVCodeInt)
        {
            throw new NotImplementedException();
        }

        public (List<User> list, int count) FillGrid(int pagenumber, int pageSize, string sortBy, string search)
        {
            return _userDal.FillGrid(pagenumber, pageSize, sortBy, search);
        }

        public User Find(int usrVCodeInt)
        {
            throw new NotImplementedException();
        }

        public User Find(string nationalIdStr)
        {
            return _userDal.Find(nationalIdStr);
        }


    }
}
