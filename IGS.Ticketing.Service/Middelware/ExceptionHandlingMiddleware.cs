using IGS.Ticketing.Service.Classes;
using System.Net;
using System.Text.Json;

namespace IGS.Ticketing.Service.Middelware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (CustomExeptions ex)
            {
                context.Response.StatusCode = ex.StatusCode;
                context.Response.ContentType = "application/json";

                var result = JsonSerializer.Serialize(new
                {
                    success = false,
                    error = new
                    {
                        code = ex.ErrorCode,
                        message = ex.Message
                    }
                });

                await context.Response.WriteAsync(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled Exception");

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                // پیام ثابت برای کاربر نهایی
                var result = JsonSerializer.Serialize(new
                {
                    success = false,
                    error = new
                    {
                        code = "INTERNAL_ERROR",
                        message = "بروز خطای ناشناخته، لطفا دوباره تلاش کنید"
                    }
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}
