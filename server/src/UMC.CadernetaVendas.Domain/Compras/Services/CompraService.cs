using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;

namespace UMC.CadernetaVendas.Domain.Compras.Services
{
    public class CompraService : ICompraService
    {
        private readonly ICompraRepository _compraRepository;
        private readonly ICompraProdutoRepository _compraProdutoRepository;
        private readonly IUnitOfWork _UoW;

        public CompraService(ICompraRepository compraRepository,
                             ICompraProdutoRepository compraProdutoRepository,
                             IUnitOfWork uow)
        {
            _compraRepository = compraRepository;
            _compraProdutoRepository = compraProdutoRepository;
            _UoW = uow;
        }

        public Compra Registrar(Compra compra)
        {
            if (!compra.EhValido()) return compra;

            _compraRepository.Adicionar(compra);

            foreach (var idProduto in compra.IdsProdutos)
            {
                var compraProduto = new CompraProduto(compra.Id, idProduto);
                _compraProdutoRepository.Adicionar(compraProduto);
            }

            _UoW.Commit();

            return compra;
        }

        public void Dispose()
        {
            _compraRepository.Dispose();
        }
    }
}
