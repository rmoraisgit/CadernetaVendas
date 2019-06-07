using System;
using System.Collections.Generic;
using System.Text;

namespace UMC.CadernetaVendas.Domain.Core.Notificacoes
{
    public class Notificacao
    {
        public Notificacao(string mensagem)
        {
            NotificacaoId = Guid.NewGuid();
            Mensagem = mensagem;
        }

        public Guid NotificacaoId { get; private set; }
        public string Mensagem { get; private set; }

    }
}
