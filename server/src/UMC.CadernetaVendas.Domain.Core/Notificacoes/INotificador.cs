using System;
using System.Collections.Generic;
using System.Text;
using static UMC.CadernetaVendas.Domain.Core.Notificacoes.Notificador;

namespace UMC.CadernetaVendas.Domain.Core.Notificacoes
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
