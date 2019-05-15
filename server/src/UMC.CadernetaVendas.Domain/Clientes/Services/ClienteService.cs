using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;

namespace UMC.CadernetaVendas.Domain.Clientes.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IUnitOfWork _UoW;

        public ClienteService(IClienteRepository clienteRepository,
                              IUnitOfWork uow)
        {
            _clienteRepository = clienteRepository;
            _UoW = uow;
        }

        public Cliente Adicionar(Cliente obj)
        {
            if (!obj.EhValido()) return obj;

            obj = _clienteRepository.Adicionar(obj);

            _UoW.Commit();

            return obj;
        }

        public Cliente Atualizar(Cliente obj)
        {
            throw new NotImplementedException();
        }

        public Cliente BuscaPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Cliente> BuscarTodos()
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
