using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class CompraRepository : Repository<Compra>, ICompraRepository
    {
        public CompraRepository(CadernetaVendasContext context) : base(context) { }
    }
}
