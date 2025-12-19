using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace IGS.Ticketing.Service.Middleware
{
    public static class ValidatorMiddleware
    {
        public static IServiceCollection AddCustomValidators(this IServiceCollection services)
        {
            // اعمال اعتبار سنجی برای وب سرویس ها
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssembly(typeof(IGS.Ticketing.Service.Common.WebServiceDtos.LoginDto).Assembly);

            // تبدیل خظای اعتبار سنجی به فرمت مناسب
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(x => x.Value?.Errors.Count > 0)
                        .ToDictionary(
                        kvp => kvp.Key,
                         kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToList()
                        );

                    var result = new BadRequestObjectResult(new
                    {
                        success = false,
                        error = new
                        {
                            code = "VALIDATION_ERROR",
                            message = "یک یا چند خطا در اعتبارسنجی وجود دارد.",
                            details = errors
                        }
                    });

                    result.ContentTypes.Add("application/json");
                    return result;
                };
            });

            return services;
        }
    }
}
