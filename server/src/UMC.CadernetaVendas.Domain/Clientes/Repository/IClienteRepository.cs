﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Interfaces;

namespace UMC.CadernetaVendas.Domain.Clientes.Repository
{
    public interface IClienteRepository : IRepository<Cliente>
    {
        Task<IEnumerable<Pagamento>> ObterPagamentosPorCliente(Guid id);
    }
}
