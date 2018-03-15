
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Mvc;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ServicosHidrauTurbo.Controllers
{
    [System.Web.Mvc.Route("api/email")]
    public class EmailController : Controller
    {
        static string[] Scopes = { GmailService.Scope.GmailReadonly };
        static string ApplicationName = "Gmail API .NET Quickstart";

        public string Enviar(string nome, string de, string assunto, string mensagem)
        {
            Response.AppendHeader("Access-Control-Allow-Origin", "*");

            UserCredential credential;
            
            var caminho = @"D:\Desenvolvimento\ServicosHidrauTurbo\ServicosHidrauTurbo\Credenciais\";
            
            var fileName = string.Concat(caminho, "client_secret.json");
            
            using (var stream =
               new FileStream(string.Concat(caminho, "client_secret.json"), FileMode.Open, FileAccess.Read))
            {


                var credPath = Path.Combine(caminho, ".credentials/gmail-dotnet-quickstart.json");

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                
            }

            // Create Gmail API service.
            var service = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            MailMessage mailmessage = new MailMessage();
            var message = new Message();

            var strMensagem = new StringBuilder();
            strMensagem.AppendLine(string.Concat("Nome:", nome));
            strMensagem.AppendLine(mensagem);

            var msg = new AE.Net.Mail.MailMessage
            {
                Subject = assunto,                
                Body = strMensagem.ToString(),
                From = new MailAddress(de)
            };
            msg.To.Add(new MailAddress("maycon.aguiar@gmail.com"));
            msg.ReplyTo.Add(msg.From); // Bounces without this!!
            var msgStr = new StringWriter();
            msg.Save(msgStr);


            message.Raw = Base64UrlEncode(msgStr.ToString());

            service.Users.Messages.Send(message, "maycon.aguiar@gmail.com").Execute();

            return "email enviado com sucesso";

        }


        private string Base64UrlEncode(string input)
        {
            var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            // Special "url-safe" base64 encode.
            return Convert.ToBase64String(inputBytes)
              .Replace('+', '-')
              .Replace('/', '_')
              .Replace("=", "");
        }
    }
}
