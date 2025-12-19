using FluentValidation;
using static IGS.Ticketing.Service.Common.Enums.Enums;

namespace IGS.Ticketing.Service.Common.WebServiceDtos
{
    public class RegisterDto
    {
        /// <summary>
        /// نام
        /// </summary>
        public string usrNameStr { get; set; } = string.Empty;
        /// <summary>
        /// نام خانوادگی
        /// </summary>
        public string usrFamilyStr { get; set; } = string.Empty;
        /// <summary>
        /// کد ملی
        /// </summary>
        public string usrNationalCodeStr { get; set; } = string.Empty;
        /// <summary>
        /// شماره همراه
        /// </summary>
        public string usrPhoneNumberStr { get; set; } = string.Empty;
        /// <summary>
        /// جنسیت
        /// </summary>
        public int usrGenderTny { get; set; }
        /// <summary>
        /// وضعیت
        /// </summary>
        public int usrStatusTny { get; set; }
        /// <summary>
        /// نقش
        /// </summary>
        public int usrRoleTny { get; set; }
        /// <summary>
        /// رمز عبور
        /// </summary>
        public string password { get; set; } = string.Empty;
    }
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        public RegisterValidator()
        {
            //RuleFor(x => x.Username)
            //    .NotEmpty().WithMessage("نام کاربری را وارد نمایید")
            //    .Length(3, 50).WithMessage("نام کاربری باید بین 3 و 50 حرف باشد");
            //    //.MustAsync(async (username, ct) =>
            //    //{
            //    //    return true;
            //    //});

            RuleFor(x => x.password)
                .NotEmpty().WithMessage("رمز عبور را وارد نمایید")
                .MinimumLength(4).WithMessage("رمز عبور باید بیشتر از 4 حرف باشد");
        }
    }
}
