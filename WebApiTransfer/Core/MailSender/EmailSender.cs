using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Core.MailSernder
{
    public class EmailSender(IConfiguration config) : IEmailSender
    {
        public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
        {
            var apiKey = config["SendGrid:ApiKey"];
            var client = new SendGridClient(apiKey);

            var from = new EmailAddress(config["SendGrid:FromEmail"], config["SendGrid:FromName"]);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: null, htmlContent: htmlBody);

            await client.SendEmailAsync(msg);
        }
    }
}
