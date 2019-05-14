using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class CompraProdutoRepository : Repository<CompraProduto>, ICompraProdutoRepository
    {
        public CompraProdutoRepository(CadernetaVendasContext context) : base(context) { }
    }
}
