using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IClienteService : IDisposable
    {
        Task Adicionar(Cliente cliente);
        Cliente Atualizar(Cliente cliente);
        void Remover(Guid id);
        Cliente BuscaPorId(Guid id);
        Task<IEnumerable<Cliente>> BuscarTodos();
    }
}
