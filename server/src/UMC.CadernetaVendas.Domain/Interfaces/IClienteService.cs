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
        Task Atualizar(Cliente cliente);
        void Remover(Guid id);
        Task RegistrarPagamento(Cliente cliente, Pagamento pagamento);
    }
}
