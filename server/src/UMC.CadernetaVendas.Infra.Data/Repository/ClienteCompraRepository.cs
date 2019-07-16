using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class ClienteCompraRepository : Repository<ClienteCompra>, IClienteCompraRepository
    {
        public ClienteCompraRepository(CadernetaVendasContext context) : base(context) { }
    }
}
