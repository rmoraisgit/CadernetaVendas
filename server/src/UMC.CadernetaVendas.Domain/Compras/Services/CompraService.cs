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

        public CompraService(ICompraRepository compraRepository)
        {
            _compraRepository = compraRepository;
        }

        public Compra Registrar(Compra compra)
        {
            if (!compra.EhValido()) return compra;

            var idsProdutos = new Collection<Guid>();

            foreach (var idProduto in compra.IdsProdutos)
            {
                idsProdutos.Add(idProduto);
            }

            //var compraProduto = new CompraProduto(compra, idsProdutos);

            return 

        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
