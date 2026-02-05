using FluentValidation;
using static IGS.Ticketing.Service.Common.Enums.Enums;

namespace IGS.Ticketing.Service.Common.WebServiceDtos
{
    public class Users_FillGridDto
    {
        /// <summary>
        /// شماره صفحه
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// اندازه صفحه
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// مرتب سازی بر اساس
        /// </summary>
        public string SortBy { get; set; } = string.Empty;
        /// <summary>
        /// جستجو
        /// </summary>
        public string Search { get; set; } = string.Empty;
    }
    public class USers_FillGridValidator : AbstractValidator<Users_FillGridDto>
    {
        public USers_FillGridValidator()
        {
            //RuleFor(x => x.Username)
            //    .NotEmpty().WithMessage("نام کاربری را وارد نمایید")
            //    .Length(3, 50).WithMessage("نام کاربری باید بین 3 و 50 حرف باشد");
            //    //.MustAsync(async (username, ct) =>
            //    //{
            //    //    return true;
            //    //});

            //RuleFor(x => x.password)
            //    .NotEmpty().WithMessage("رمز عبور را وارد نمایید")
            //    .MinimumLength(4).WithMessage("رمز عبور باید بیشتر از 4 حرف باشد");
        }
    }
}
