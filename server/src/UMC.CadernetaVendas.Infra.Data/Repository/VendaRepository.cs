using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class VendaRepository : Repository<Venda>, IVendaRepository
    {
        public VendaRepository(CadernetaVendasContext context) : base(context) { }

        public override IEnumerable<Venda> ObterTodos()
        {
            return DbSet.Include(c => c.VendasProdutos);
        }
    }
}
