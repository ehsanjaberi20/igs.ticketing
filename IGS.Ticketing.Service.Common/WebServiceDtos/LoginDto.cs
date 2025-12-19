using FluentValidation;

namespace IGS.Ticketing.Service.Common.WebServiceDtos
{
    public class LoginDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("نام کاربری را وارد نمایید")
                .Length(3, 50).WithMessage("نام کاربری باید بین 3 و 50 حرف باشد");
                //.MustAsync(async (username, ct) =>
                //{
                //    return true;
                //});

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("رمز عبور را وارد نمایید")
                .MinimumLength(4).WithMessage("رمز عبور باید بیشتر از 4 حرف باشد");
        }
    }
}
