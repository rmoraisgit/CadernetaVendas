using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Vendas;

namespace UMC.CadernetaVendas.Domain.Clientes
{
    public class ClienteCompra : Entity<ClienteCompra>
    {
        public ClienteCompra(Guid clienteId, Guid compraId)
        {
            ClienteId = clienteId;
            CompraId = compraId;
        }

        protected ClienteCompra() { }

        public Guid ClienteId { get; private set; }
        public Cliente Cliente { get; private set; }
        public Guid CompraId { get; private set; }
        public Venda Compra { get; private set; }
        public decimal SaldoDevedorAntes { get; private set; }
        public decimal SaldoDevedorDepois { get; private set; }
        public DateTime DataCadastro { get; private set; }

        public override bool EhValido()
        {
            return true;
        }

        public void SetarSaldoDevedorAntes(decimal saldoDevedorAntes)
        {
            SaldoDevedorAntes = saldoDevedorAntes;
        }

        public void SetarSaldoDevedorDepois(decimal saldoDevedorDepois)
        {
            SaldoDevedorDepois = saldoDevedorDepois;
        }
    }
}
