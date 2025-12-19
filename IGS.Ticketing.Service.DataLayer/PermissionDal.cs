using IGS.Ticketing.Service.DataLayer.Database;

namespace IGS.Ticketing.Service.DataLayer
{
    public interface IPermissionDal
    {
        List<Guid> GetAll(int usrVCodeInt);
        void Update(int usrVCodeInt, List<Guid> guids);
    }
    /// <summary>
    /// مدیریت دسترسی های کاربر
    /// </summary>
    public class PermissionDal : IPermissionDal
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public PermissionDal(IDbConnectionFactory dbConnectionFactory)
        {
            this._dbConnectionFactory = dbConnectionFactory;
        }
        /// <summary>
        /// دریافت لیست دسترسی های کاربر
        /// </summary>
        /// <param name="usrVCodeInt">کد مجازی کاربر</param>
        /// <returns>دسترسی های کاربر</returns>
        public List<Guid> GetAll(int usrVCodeInt)
        {
            var connection = _dbConnectionFactory.CreateConnection();
            try
            {
                Dictionary<string, object> inParams = new Dictionary<string, object>();
                inParams.Add("usrVCodeInt", usrVCodeInt);
                return DbHelper.ReadData<Guid>(connection, @"SELECT perGuid FROM dbo.Permissions WHERE perUsrVCodeInt = @usrVCodeInt", inParams).Result.ToList();
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
        /// <summary>
        /// بروزرسانی دسترسی های کاربر
        /// </summary>
        /// <param name="usrVCodeInt">کد مجازی کاربر</param>
        /// <param name="guids">لیست دسترسی ها جدید کاربر</param>
        public void Update(int usrVCodeInt, List<Guid> guids)
        {
            var connection = _dbConnectionFactory.CreateConnection();
            var tr = DbHelper.BeginTransaction(connection);
            try
            {
                Dictionary<string, object> inParams = new Dictionary<string, object>();
                inParams.Add("usrVCodeInt", usrVCodeInt);
                // ابتدا دسترسی های قبلی حذف شود
                DbHelper.ExecuteAsync(connection, @"DELETE FROM dbo.Permissions WHERE perUsrVCodeInt = @usrVCodeInt", inParams, transaction: tr);
                // ذخیره دسترسی های جدید
                foreach (var guid in guids)
                    DbHelper.ExecuteAsync(connection, $@"INSERT INTO dbo.Permissions(perUsrVCodeInt, perGuid) VALUES(@usrVCodeInt, '{guid}')", inParams, transaction: tr);

                DbHelper.CommitTransaction(tr);
            }
            catch (Exception)
            {
                DbHelper.RollbackTransaction(tr);
                throw;
            }
            finally
            {
                connection.Close();
            }
        }
       
    }
}
