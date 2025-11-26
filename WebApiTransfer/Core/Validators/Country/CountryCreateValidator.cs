using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Location;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Country
{
    public class CountryCreateValidator : AbstractValidator<CountryCreateModel>
    {
        public CountryCreateValidator(AppDbTransferContext context)
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Назва країни обовязкова")
                .MaximumLength(100).WithMessage("Назва не може перевищувати 100 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Name)
                        .MustAsync(async (name, cancellation) =>
                            !await context.Countries.AnyAsync(c => c.Name.ToLower() == name.ToLower().Trim(), cancellation))
                        .WithMessage("Країна з такою назвою вже існує");
                });

            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Код країни обовязковий")
                .MaximumLength(10).WithMessage("Код не може перевищувати  10 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Code)
                        .MustAsync(async (code, cancellation) =>
                            !await context.Countries.AnyAsync(c => c.Code.ToLower() == code.ToLower().Trim(), cancellation))
                        .WithMessage("Такий код країни вже існує");
                }); 
            RuleFor(x => x.Slug)
                .NotEmpty().WithMessage("Слаг обовязковий")
                .MaximumLength(100).WithMessage("Слаг не може перевищувати 100 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Slug)
                        .MustAsync(async (slug, cancellation) =>
                            !await context.Countries.AnyAsync(c => c.Slug.ToLower() == slug.ToLower().Trim(), cancellation))
                        .WithMessage("Такий слаг вже існує");
                });
            RuleFor(x => x.Image)
                .NotNull().WithMessage("Фото обовязкове");
        }
    }
}
