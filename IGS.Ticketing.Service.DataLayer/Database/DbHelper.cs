using Dapper;
using System.Data;

namespace IGS.Ticketing.Service.DataLayer.Database
{
    public static class DbHelper
    {
        public static IDbTransaction BeginTransaction(IDbConnection connection) => connection.BeginTransaction();
        public static void CommitTransaction(IDbTransaction transaction) => transaction.Commit();
        public static void RollbackTransaction(IDbTransaction transaction) => transaction.Rollback();
        public static Task<int> ReadInt(IDbConnection connection, string sql, Dictionary<string, object>? parameters = null, int commandTimeout = 30)
        {
            return connection.ExecuteScalarAsync<int>(sql, parameters);
        }
        public static Task<string?> ReadString(IDbConnection connection, string sql, Dictionary<string, object>? parameters = null, int commandTimeout = 30)
        {
            return connection.ExecuteScalarAsync<string>(sql, parameters);
        }
        public static Task<IEnumerable<T>> ReadData<T>(IDbConnection connection, string sql, Dictionary<string, object>? parameters = null, int commandTimeout = 30)
        {
            return connection.QueryAsync<T>(sql, parameters, commandTimeout: commandTimeout);
        }
        public static Task<T?> ReadFirst<T>(IDbConnection connection, string sql, Dictionary<string, object>? parameters = null, int commandTimeout = 30)
        {
            return connection.QueryFirstOrDefaultAsync<T>(sql, parameters, commandTimeout: commandTimeout);
        }
        public static Task<int> ExecuteAsync(IDbConnection connection, string sql, Dictionary<string, object>? parameters = null, int commandTimeout = 30, IDbTransaction? transaction = null)
        {
            return connection.ExecuteAsync(sql,parameters, commandTimeout: commandTimeout, transaction: transaction);
        }
        //internal static void AddSqlParameters(SqlParameterCollection parameterCollection, Dictionary<string, object>? inParams)
        //{
        //    if (inParams != null)
        //        foreach (string paramName in inParams.Keys)
        //        {
        //            if (inParams[paramName] == null)
        //                parameterCollection.AddWithValue("@" + paramName, DBNull.Value);
        //            else
        //            {
        //                var p = new SqlParameter();
        //                if (inParams[paramName].GetType().Name == "String")
        //                {
        //                    p.SqlDbType = SqlDbType.VarChar;
        //                    p.ParameterName = "@" + paramName;
        //                    p.Direction = ParameterDirection.Input;
        //                    p.Value = inParams[paramName];
        //                    parameterCollection.Add(p);
        //                }
        //                else
        //                    parameterCollection.AddWithValue("@" + paramName, inParams[paramName]);
        //            }
        //        }
        //}

    }
}
