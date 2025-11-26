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
    public class CountryUpdateValidator : AbstractValidator<CountryUpdateModel>
    {
        public CountryUpdateValidator(AppDbTransferContext context)
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Назва країни обовязкова")
                .MaximumLength(100).WithMessage("Назва не може перевищувати 100 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Name)
                        .MustAsync(async (model, name, cancellation) =>
                    !await context.Countries
                        .AnyAsync(c => c.Id != model.Id && c.Name.ToLower() == name.ToLower().Trim(), cancellation))
                .WithMessage("Країна з такою назвою вже існує");
                });

            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Код країни обовязковий")
                .MaximumLength(10).WithMessage("Код не може перевищувати 10 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Code)
                        .MustAsync(async (model, code, cancellation) =>
                    !await context.Countries
                        .AnyAsync(c => c.Id != model.Id && c.Code.ToLower() == code.ToLower().Trim(), cancellation))

                .WithMessage("Такий код країни вже існує");
                });

            RuleFor(x => x.Slug)
                     .NotEmpty().WithMessage("Слаг обовязковий")
                .MaximumLength(100).WithMessage("Слаг не може перевищувати 100 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Slug)
                        .MustAsync(async (model, slug, cancellation) =>
                    !await context.Countries
                        .AnyAsync(c => c.Id != model.Id && c.Slug.ToLower() == slug.ToLower().Trim(), cancellation))
                .WithMessage("Такий слаг вже існує");
                });
                

            // При редагуванні фото може бути необов’язковим
            RuleFor(x => x.Image)
                .Must(file => file == null || file.Length > 0)
                .WithMessage("Фото некоректне");
        }
    }
}
