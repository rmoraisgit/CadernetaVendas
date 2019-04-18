using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IClienteService : IDisposable
    {
        Cliente Adicionar(Cliente obj);
        Cliente Atualizar(Cliente obj);
        void Remover(Guid id);
        Cliente BuscaPorId(Guid id);
        IEnumerable<Cliente> BuscarTodos();
    }
}
