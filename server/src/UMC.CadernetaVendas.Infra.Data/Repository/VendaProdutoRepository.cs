using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class VendaProdutoRepository : Repository<VendaProduto>, IVendaProdutoRepository
    {
        public VendaProdutoRepository(CadernetaVendasContext context) : base(context) { }
    }
}
