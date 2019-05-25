using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Vendas
{
    public class VendaCliente : Entity<VendaCliente>
    {
        public Guid VendaId { get; private set; }
        public virtual Venda Venda { get; private set; }
        public Guid ClienteId { get; private set; }
        public virtual Cliente Cliente { get; private set; }

        public override bool EhValido()
        {
            throw new NotImplementedException();
        }
    }
}
