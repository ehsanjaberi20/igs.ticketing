using Microsoft.Data.SqlClient;
using System.Data;

namespace IGS.Ticketing.Service.DataLayer.Database
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();
    }

    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly string _connectionString;
        public int CommandTimeout = 30;

        public DbConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        } 
    }
}
