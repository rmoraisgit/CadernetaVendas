using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Clientes
{
    public class Pagamento : Entity<Pagamento>
    {
        public Pagamento(decimal valorTotal)
        {
            ValorTotal = valorTotal;
        }

        protected Pagamento() { }

        public decimal ValorTotal { get; private set; }
        public decimal SaldoDevedorAntes { get; private set; }
        public decimal SaldoDevedorDepois { get; private set; }
        public DateTime DataCadastro { get; private set; }
        public Guid ClienteId { get; private set; }
        public Cliente Cliente { get; private set; }

        public override bool EhValido()
        {
            return true;
        }

        public void SetarSaldoDevedorAntes(decimal saldoDevedor)
        {
            SaldoDevedorAntes = saldoDevedor;
        }

        public void SetarSaldoDevedorDepois(decimal saldoDevedor)
        {
            SaldoDevedorDepois = saldoDevedor;
        }
    }
}
