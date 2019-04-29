using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Compras
{
    public class CompraProduto : Entity<CompraProduto>
    {
        public CompraProduto(Guid compraId, Guid produtoId)
        {
            CompraId = compraId;
            ProdutoId = produtoId;
        }

        public Guid CompraId { get; private set; }
        public virtual Compra Compra { get; private set; }
        public Guid ProdutoId { get; private set; }
        public virtual Produto Produto { get; private set; }

        public override bool EhValido()
        {
            return true;
        }
    }
}
