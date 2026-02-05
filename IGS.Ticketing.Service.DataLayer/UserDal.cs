using IGS.Ticketing.Service.Common.Models;
using IGS.Ticketing.Service.DataLayer.Database;
using static IGS.Ticketing.Service.Common.Enums.Enums;

namespace IGS.Ticketing.Service.DataLayer
{
    public interface IUserDal
    {
        int Insert(User user);
        void Update(int usrVCodeInt, User user);
        void Delete(int usrVCodeInt);
        (List<User> list, int count) FillGrid(int pagenumber, int pageSize, string sortBy, string search);
        User Find(int usrVCodeInt);
        User Find(string nationalIdStr);
    }
    public class UserDal : IUserDal
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public UserDal(IDbConnectionFactory dbConnectionFactory)
        {
            this._dbConnectionFactory = dbConnectionFactory;
        }
        public int Insert(User user)
        {
            var connection = _dbConnectionFactory.CreateConnection();
            try
            {
                Dictionary<string, object> inParams = new Dictionary<string, object>();
                inParams.Add("usrNameStr", user.usrNameStr);
                inParams.Add("usrFamilyStr", user.usrFamilyStr);
                inParams.Add("usrNationalCodeStr", user.usrNationalCodeStr);
                inParams.Add("usrPhoneNumberStr", user.usrPhoneNumberStr);
                inParams.Add("usrGenderTny", user.usrGenderTny.GetHashCode());
                inParams.Add("usrStatusTny", user.usrStatusTny.GetHashCode());
                inParams.Add("usrRoleTny", user.usrRoleTny.GetHashCode());
                inParams.Add("usrPasswordHashBin", user.usrPasswordHashBin);
                inParams.Add("usrSaltBin", user.usrSaltBin);
                inParams.Add("usrCreatorUsrVCodeInt", user.usrCreatorUsrVCodeInt);
                return DbHelper.ReadInt(connection, @"
INSERT INTO dbo.Users
           (usrNameStr
           ,usrFamilyStr
           ,usrNationalCodeStr
           ,usrPhoneNumberStr
           ,usrGenderTny
           ,usrStatusTny
           ,usrRoleTny
           ,usrPasswordHashBin
           ,usrSaltBin
           ,usrCreatorUsrVCodeInt)
     VALUES
           (@usrNameStr
           ,@usrFamilyStr
           ,@usrNationalCodeStr
           ,@usrPhoneNumberStr
           ,@usrGenderTny
           ,@usrStatusTny
           ,@usrRoleTny
           ,@usrPasswordHashBin
           ,@usrSaltBin
           ,@usrCreatorUsrVCodeInt)
SELECT CAST(SCOPE_IDENTITY() as int);
", inParams).Result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }
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
            var connection = _dbConnectionFactory.CreateConnection();
            try
            {
                Dictionary<string, object> inParams = new Dictionary<string, object>();
                inParams.Add("pagenumber", pagenumber);
                inParams.Add("pageSize", pageSize);
                inParams.Add("sortBy", sortBy);
                inParams.Add("search", search);
                var result = DbHelper.ReadData<User>(connection, @"
select * from dbo.Users
", inParams).Result.ToList();
                return (result, 0);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }
        }

        public User Find(int usrVCodeInt)
        {
            throw new NotImplementedException();
        }

        public User Find(string nationalIdStr)
        {
            var connection = _dbConnectionFactory.CreateConnection();
            try
            {
                Dictionary<string, object> inParams = new Dictionary<string, object>();
                inParams.Add("usrNationalCodeStr", nationalIdStr);
                var res = DbHelper.ReadFirst<User>(connection, @"
select * from dbo.Users
 where usrNationalCodeStr=@usrNationalCodeStr
", inParams);
                return res.Result;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
