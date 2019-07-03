using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class CompraProdutoRepository : Repository<CompraProduto>, ICompraProdutoRepository
    {
        public CompraProdutoRepository(CadernetaVendasContext context) : base(context) { }

        public async Task<IEnumerable<CompraProduto>> ObterComprasProdutoPorId(Guid id)
        {
            return await DbSet.Where(v => v.ProdutoId == id).ToListAsync();
        }
    }
}
