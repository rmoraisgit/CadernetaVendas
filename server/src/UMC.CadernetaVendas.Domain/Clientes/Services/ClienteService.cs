using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Services;

namespace UMC.CadernetaVendas.Domain.Clientes.Services
{
    public class ClienteService : BaseService, IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IUnitOfWork _UoW;

        public ClienteService(IClienteRepository clienteRepository,
                              IUnitOfWork uow,
                              INotificador notificador) : base(notificador)
        {
            _clienteRepository = clienteRepository;
            _UoW = uow;
        }

        public async Task Adicionar(Cliente cliente)
        {
            if (!cliente.EhValido())
            {
                Notificar(cliente.ValidationResult);
                return;
            }

            await _clienteRepository.Adicionar(cliente);

            await _UoW.Commit();

        }

        public Cliente Atualizar(Cliente cliente)
        {
            throw new NotImplementedException();
        }

        public Cliente BuscaPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Cliente>> BuscarTodos()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _clienteRepository.Dispose();
        }

        public void Remover(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
