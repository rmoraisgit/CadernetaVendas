using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
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
        private readonly IUnitOfWork _UoW;

        public VendaService(IVendaRepository vendaRepository,
                             IProdutoRepository produtoRepository,
                             IVendaProdutoRepository vendaProdutoRepository,
                             IUnitOfWork uow,
                             INotificador notificador) : base(notificador)
        {
            _vendaRepository = vendaRepository;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
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
    }
}
