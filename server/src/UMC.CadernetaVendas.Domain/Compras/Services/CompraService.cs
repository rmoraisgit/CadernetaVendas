using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Services;

namespace UMC.CadernetaVendas.Domain.Compras.Services
{
    public class CompraService : BaseService, ICompraService
    {
        private readonly ICompraRepository _compraRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly ICompraProdutoRepository _compraProdutoRepository;
        private readonly IUnitOfWork _UoW;

        public CompraService(ICompraRepository compraRepository,
                             IProdutoRepository produtoRepository,
                             ICompraProdutoRepository compraProdutoRepository,
                             IUnitOfWork uow,
                             INotificador notificador) : base(notificador)
        {
            _compraRepository = compraRepository;
            _produtoRepository = produtoRepository;
            _compraProdutoRepository = compraProdutoRepository;
            _UoW = uow;
        }

        public async Task Registrar(Compra compra)
        {
            if (!compra.EhValido())
            {
                Notificar(compra.ValidationResult);
                return;
            }

            await _compraRepository.Adicionar(compra);

            foreach (var produto in compra.ComprasProdutos)
            {
                await _compraProdutoRepository.Adicionar(produto);

                ValidarPrecoProduto(produto);
            }

            await _UoW.Commit();
        }

        public async Task<IEnumerable<Compra>> BuscarTodas()
        {
            return await _compraRepository.ObterTodos();
        }

        public void Dispose()
        {
            _compraRepository.Dispose();
            _compraProdutoRepository.Dispose();
        }

        private void ValidarPrecoProduto(CompraProduto produto)
        {
            var produtoAtual = _produtoRepository.ObterPorId(produto.ProdutoId);

            if (produtoAtual.ValorCompra > produto.ValorUnitario) return;

            produtoAtual.AtualizarValorCompra(produto.ValorUnitario);

            _produtoRepository.Atualizar(produtoAtual);
        }
    }
}
