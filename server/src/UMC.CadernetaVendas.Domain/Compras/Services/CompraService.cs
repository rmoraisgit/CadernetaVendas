using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;

namespace UMC.CadernetaVendas.Domain.Compras.Services
{
    public class CompraService : ICompraService
    {
        private readonly ICompraRepository _compraRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly ICompraProdutoRepository _compraProdutoRepository;
        private readonly IUnitOfWork _UoW;

        public CompraService(ICompraRepository compraRepository,
                             IProdutoRepository produtoRepository,
                             ICompraProdutoRepository compraProdutoRepository,
                             IUnitOfWork uow)
        {
            _compraRepository = compraRepository;
            _produtoRepository = produtoRepository;
            _compraProdutoRepository = compraProdutoRepository;
            _UoW = uow;
        }

        public Compra Registrar(Compra compra)
        {
            if (!compra.EhValido()) return compra;

            _compraRepository.Adicionar(compra);

            foreach (var produto in compra.Produtos)
            {
                var compraProduto = new CompraProduto(compra.Id, produto.Id);
                _compraProdutoRepository.Adicionar(compraProduto);

                ValidarPrecoProduto(produto);
            }

            _UoW.Commit();

            return compra;
        }

        public void Dispose()
        {
            _compraRepository.Dispose();
        }

        private void ValidarPrecoProduto(Produto produto)
        {
            var produtoAtual = _produtoRepository.ObterPorId(produto.Id);

            if (produtoAtual.ValorCompra > produto.ValorCompra) return;

            produtoAtual.AtualizarValorCompra(produto.ValorCompra);

            _produtoRepository.Atualizar(produtoAtual);
        }
    }
}
