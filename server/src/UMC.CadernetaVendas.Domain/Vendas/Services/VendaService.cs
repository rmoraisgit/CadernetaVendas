using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Services;
using UMC.CadernetaVendas.Domain.Vendas.Repository;

namespace UMC.CadernetaVendas.Domain.Vendas.Services
{
    public class VendaService : BaseService, IVendaService
    {
        private readonly IVendaRepository _vendaRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IVendaProdutoRepository _vendaProdutoRepository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IClienteCompraRepository _clienteCompraRepository;
        private readonly IUnitOfWork _UoW;

        public VendaService(IVendaRepository vendaRepository,
                            IProdutoRepository produtoRepository,
                            IVendaProdutoRepository vendaProdutoRepository,
                            IClienteRepository clienteRepository,
                            IClienteCompraRepository clienteCompraRepository,
                            IUnitOfWork uow,
                            INotificador notificador) : base(notificador)
        {
            _vendaRepository = vendaRepository;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
            _clienteRepository = clienteRepository;
            _clienteCompraRepository = clienteCompraRepository;
            _UoW = uow;
        }

        public async Task Registrar(Venda venda)
        {
            if (!venda.EhValido())
            {
                Notificar(venda.ValidationResult);
                return;
            }

            await _vendaRepository.Adicionar(venda);

            foreach (var produtoVenda in venda.VendasProdutos)
            {
                var produto = await ObterProduto(produtoVenda);

                if (!QuantidadeSuficienteNoEstoque(produtoVenda, produto))
                {
                    Notificar("Não há itens suficientes em estoque para concluir essa operação.");
                    return;
                }

                produtoVenda.GerarKardex(produto.Quantidade, produtoVenda.Quantidade);
                produto.DecrementarEstoque(produtoVenda.Quantidade);

                _produtoRepository.Atualizar(produto);
                await _vendaProdutoRepository.Adicionar(produtoVenda);
            }

            var cliente = await ObterClientePorId(venda.ClienteId);
            await GerarRegistroClienteCompra(cliente, venda);

            await _UoW.Commit();
        }

        public void Dispose()
        {
            _vendaRepository.Dispose();
            _vendaProdutoRepository.Dispose();
        }

        private bool QuantidadeSuficienteNoEstoque(VendaProduto vendaProduto, Produto produto)
        {
            return produto.Quantidade - vendaProduto.Quantidade >= 0;
        }

        private async Task<Produto> ObterProduto(VendaProduto vendaProduto)
        {
            return await _produtoRepository.ObterPorId(vendaProduto.ProdutoId);
        }

        private void IncrementarSaldoDevedorCliente(Cliente cliente, decimal valorTotalVenda)
        {
            cliente.IncrementarSaldoDevedor(valorTotalVenda);
            _clienteRepository.Atualizar(cliente);
        }

        private async Task<Cliente> ObterClientePorId(Guid clienteId)
        {
            return await _clienteRepository.ObterPorId(clienteId);
        }

        private async Task GerarRegistroClienteCompra(Cliente cliente, Venda venda)
        {
            var registroCompraCliente = new ClienteCompra(cliente.Id, venda.Id, venda.Total);

            registroCompraCliente.SetarSaldoDevedorAntes(cliente.SaldoDevedor);
            IncrementarSaldoDevedorCliente(cliente, venda.Total);
            registroCompraCliente.SetarSaldoDevedorDepois(cliente.SaldoDevedor);
            await _clienteCompraRepository.Adicionar(registroCompraCliente);
        }
    }
}
