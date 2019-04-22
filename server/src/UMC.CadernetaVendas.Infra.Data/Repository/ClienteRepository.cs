using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Repository
{
    public class ClienteRepository : Repository<Cliente>, IClienteRepository
    {
        public ClienteRepository(CadernetaVendasContext context) : base(context) { }

        public override IEnumerable<Cliente> ObterTodos()
        {
            return DbSet.Include(c => c.Endereco).ToList();
        }
    }
}
