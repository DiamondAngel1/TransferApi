using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class LoginValidator : AbstractValidator<LoginModel>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Емейл обов'язковий")
                .EmailAddress().WithMessage("Некоректний формат емейлу");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль обов'язковий");

        }
    }
}
