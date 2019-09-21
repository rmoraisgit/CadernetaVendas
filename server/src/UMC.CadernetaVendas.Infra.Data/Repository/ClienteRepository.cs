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
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(CadernetaVendasContext context) : base(context) { }

        public override async Task<IEnumerable<Cliente>> ObterTodos()
        {
            return await DbSet.Include(c => c.Endereco).ToListAsync();
        }

        public override async Task<Cliente> ObterPorId(Guid id)
        {
            return await DbSet.AsNoTracking()
                .Include(c => c.Endereco)
                .Include(c=>c.Pagamentos)
                .FirstOrDefaultAsync(c=> c.Id == id);
        }

        public async Task<IEnumerable<Pagamento>> ObterPagamentosPorCliente(Guid id)
        {
            var cliente = await ObterPorId(id);
            return cliente.Pagamentos;
        }
    }
}
