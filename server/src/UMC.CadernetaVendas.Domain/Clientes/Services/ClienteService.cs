using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Services;
using UMC.CadernetaVendas.Domain.Validations;

namespace UMC.CadernetaVendas.Domain.Clientes.Services
{
    public class ClienteService : BaseService, IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IPagamentoRepository _pagamentoRepository;
        private readonly IUnitOfWork _UoW;
        private readonly IUser _user;

        public ClienteService(IClienteRepository clienteRepository,
                              IPagamentoRepository pagamentoRepository,
                              IUnitOfWork uow,
                              IUser user,
                              INotificador notificador) : base(notificador)
        {
            _clienteRepository = clienteRepository;
            _pagamentoRepository = pagamentoRepository;
            _UoW = uow;
            _user = user;
        }

        public async Task Adicionar(Cliente cliente)
        {
            if (!cliente.EhValido())
            {
                Notificar(cliente.ValidationResult);
                return;
            }

            if (!CPFValidation.Validar(cliente.CPF))
            {
                Notificar("Cliente com CPF inválido");
                return;
            }

            if (_clienteRepository.Buscar(c => c.CPF == cliente.CPF).Any())
            {
                Notificar("Já existe um cliente com este CPF informado.");
                return;
            }


            await _clienteRepository.Adicionar(cliente);
            await _UoW.Commit();

        }

        public async Task Atualizar(Cliente cliente)
        {
            if (!cliente.EhValido())
            {
                Notificar(cliente.ValidationResult);
                return;
            }

            if (!CPFValidation.Validar(cliente.CPF))
            {
                Notificar("Cliente com CPF inválido");
                return;
            }

            if (_clienteRepository.Buscar(c => c.CPF == cliente.CPF && c.Id != cliente.Id).Any())
            {
                Notificar("Já existe um cliente com este CPF informado.");
                return;
            }

            _clienteRepository.Atualizar(cliente);
            await _UoW.Commit();
        }

        public async Task Desativar(Cliente cliente)
        {
            if(cliente.SaldoDevedor != 0)
            {
                Notificar("Não é possível desativar um cliente com dívidas pendentes.");
                return;
            }

            cliente.Desativar();

            _clienteRepository.Atualizar(cliente);
            await _UoW.Commit();
        }

        public async Task RegistrarPagamento(Cliente cliente, Pagamento pagamento)
        {
            if (pagamento.ValorTotal < 20)
            {
                Notificar("O pagamento minímo é R$20,00");
                return;
            }

            if(pagamento.ValorTotal > cliente.SaldoDevedor)
            {
                Notificar("O valor do pagamento não pode ser maior que o valor da divida");
                return;
            }

            pagamento.SetarSaldoDevedorAntes(cliente.SaldoDevedor);
            cliente.EfetuarPagamento(pagamento.ValorTotal);
            pagamento.SetarSaldoDevedorDepois(cliente.SaldoDevedor);

            cliente.Pagamentos.Add(pagamento);

            await _pagamentoRepository.Adicionar(pagamento);
            _clienteRepository.Atualizar(cliente);

            await _UoW.Commit();
        }

        public void Dispose()
        {
            _clienteRepository.Dispose();
        }
    }
}
