using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class VendaRepository : Repository<Venda>, IVendaRepository
    {
        public VendaRepository(CadernetaVendasContext context) : base(context) { }

        public override async Task<IEnumerable<Venda>> ObterTodos()
        {
            return await DbSet.Include(c => c.VendasProdutos).Include(c=>c.Cliente).ToListAsync();
        }
    }
}
