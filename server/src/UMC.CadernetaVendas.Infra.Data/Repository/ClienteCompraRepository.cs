using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class ClienteCompraRepository : Repository<ClienteCompra>, IClienteCompraRepository
    {
        public ClienteCompraRepository(CadernetaVendasContext context) : base(context) { }

        public async Task<IEnumerable<ClienteCompra>> ObterComprasClientePorId(Guid id)
        {
            return await DbSet.Where(c => c.ClienteId == id).OrderByDescending(c=>c.DataCadastro).ToListAsync();
        }
    }
}