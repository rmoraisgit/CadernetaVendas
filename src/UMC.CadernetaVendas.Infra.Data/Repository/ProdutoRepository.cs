using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(CadernetaVendasContext context) : base(context) { }
    }
}
