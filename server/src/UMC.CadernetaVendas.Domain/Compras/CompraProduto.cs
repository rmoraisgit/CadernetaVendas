using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Compras
{
    public class CompraProduto : Entity<CompraProduto>
    {
        public CompraProduto(Guid compraId, Guid produtoId, int quantidade, decimal valorUnitario, decimal valorFinal)
        {
            CompraId = compraId;
            ProdutoId = produtoId;
            Quantidade = quantidade;
            ValorUnitario = valorUnitario;
            ValorFinal = valorFinal;
        }

        protected CompraProduto() { }

        public Guid CompraId { get; private set; }
        public virtual Compra Compra { get; private set; }
        public Guid ProdutoId { get; private set; }
        public virtual Produto Produto { get; private set; }
        public int Quantidade { get; private set; }
        public decimal ValorUnitario { get; private set; }
        public decimal ValorFinal { get; private set; }

        public override bool EhValido()
        {
            ValidationResult = Validate(this);
            return true;
        }
    }
}
