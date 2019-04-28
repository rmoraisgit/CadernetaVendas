using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Compras
{
    public class CompraProduto
    {
        public Guid CompraId { get; private set; }
        public virtual Compra Compra { get; private set; }
        public Guid ProdutoId { get; private set; }
        public virtual Produto Produto { get; private set; }
    }
}
