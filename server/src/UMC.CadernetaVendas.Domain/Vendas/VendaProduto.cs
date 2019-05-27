using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Vendas
{
    public class VendaProduto : Entity<VendaProduto>
    {
        public VendaProduto(Guid vendaId, Guid produtoId, int quantidade, decimal valorVenda, decimal valorSugerido, decimal valorFinal)
        {
            VendaId = vendaId;
            ProdutoId = produtoId;
            Quantidade = quantidade;
            ValorVenda = valorVenda;
            ValorSugerido = valorSugerido;
            ValorFinal = valorFinal;
        }

        protected VendaProduto() { }

        public Guid VendaId { get; private set; }
        public virtual Venda Venda { get; private set; }
        public Guid ProdutoId { get; private set; }
        public virtual Produto Produto { get; private set; }
        public int Quantidade { get; private set; }
        public decimal ValorVenda { get; private set; }
        public decimal ValorSugerido { get; private set; }
        public decimal ValorFinal { get; private set; }

        public override bool EhValido()
        {
            throw new NotImplementedException();
        }
    }
}
