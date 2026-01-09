using Core.Models.Transportations;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Transportation
{
    public class TransportationCreateValidator : AbstractValidator<TransportationCreateModel>
    {
        public TransportationCreateValidator(AppDbTransferContext context)
        {
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("Код рейсу обов'язковий")
                .MaximumLength(50).WithMessage("Код не може перевищувати 50 символів")
                .DependentRules(() =>
                {
                    RuleFor(x => x.Code)
                        .MustAsync(async (code, cancellation) =>
                            !await context.Transportations.AnyAsync(t => t.Code.ToLower() == code.ToLower().Trim(), cancellation))
                        .WithMessage("Рейс з таким кодом вже існує");
                });

            RuleFor(x => x.FromCityId)
                .NotEmpty().WithMessage("Місто відправлення обов'язкове")
                .GreaterThan(0).WithMessage("Id міста відправлення має бути більшим за 0");

            RuleFor(x => x.ToCityId)
                .NotEmpty().WithMessage("Місто прибуття обов'язкове")
                .GreaterThan(0).WithMessage("Id міста прибуття має бути більшим за 0");

            RuleFor(x => x.DepartureTime)
                .NotEmpty().WithMessage("Час відправлення обов'язковий");

            RuleFor(x => x.ArrivalTime)
                .NotEmpty().WithMessage("Час прибуття обов'язковий")
                .Must((model, arrivalTime) => arrivalTime > model.DepartureTime)
                .WithMessage("Час прибуття має бути пізніше за час відправлення");

            RuleFor(x => x.SeatsTotal)
                .NotEmpty().WithMessage("Кількість місць обов'язкова")
                .GreaterThan(0).WithMessage("Кількість місць має бути більшою за 0");

            RuleFor(x => x.SeatsAvailable)
                .NotEmpty().WithMessage("Доступні місця обов'язкові")
                .GreaterThanOrEqualTo(0).WithMessage("Доступні місця не можуть бути від'ємними")
                .LessThanOrEqualTo(x => x.SeatsTotal).WithMessage("Доступні місця не можуть перевищувати загальну кількість");

            RuleFor(x => x.StatusId)
                .NotEmpty().WithMessage("Статус обов'язковий")
                .GreaterThan(0).WithMessage("Id статусу має бути більшим за 0");

            RuleFor(x => x.Price)
                .NotEmpty().WithMessage("Ціна обов'язкова")
                .GreaterThan(0).WithMessage("Ціна має бути більшою за 0");
        }
    }
}
