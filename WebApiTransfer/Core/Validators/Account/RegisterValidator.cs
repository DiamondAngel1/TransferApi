using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Account;
using FluentValidation;

namespace Core.Validators.Account
{
    public class RegisterValidator : AbstractValidator<RegisterModel>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Ім'я обов'язкове");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Прізвище обов'язкове");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Емейл обов'язковий")
                .EmailAddress().WithMessage("Некоректний формат емейлу");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Пароль обов'язковий")
                .MinimumLength(6).WithMessage("Пароль має мати мінімум 6 символів");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Номер телефону обов'язковий");

            RuleFor(x => x.Image)
                .NotNull().WithMessage("Фото профілю обов'язкове");
        }
    }
}
