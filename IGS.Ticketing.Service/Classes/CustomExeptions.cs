
namespace IGS.Ticketing.Service.Classes
{
    public class CustomExeptions: Exception
    {
        public int StatusCode { get; }
        public string ErrorCode { get; }

        public CustomExeptions(string message, int statusCode = 400, string errorCode = "APP_ERROR")
            : base(message)
        {
            StatusCode = statusCode;
            ErrorCode = errorCode;
        }
    }
}
