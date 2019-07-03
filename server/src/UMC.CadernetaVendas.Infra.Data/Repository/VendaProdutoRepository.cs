using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class VendaProdutoRepository : Repository<VendaProduto>, IVendaProdutoRepository
    {
        public VendaProdutoRepository(CadernetaVendasContext context) : base(context) { }

        public async Task<IEnumerable<VendaProduto>> ObterVendasProdutoPorId(Guid id)
        {
            return await DbSet.Where(v => v.ProdutoId == id).ToListAsync();
        }
    }
}