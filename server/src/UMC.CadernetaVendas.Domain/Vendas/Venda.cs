using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Vendas
{
    public class Venda : Entity<Venda>
    {
        public Venda(decimal total)
        {
            Total = total;
        }

        protected Venda() { }

        public DateTime DataCadastro { get; private set; }
        public decimal Total { get; private set; }

        /* Cliente */
        public Guid ClienteId { get; set; }
        public virtual Cliente Cliente { get; private set; }

        /* Produtos */
        public virtual ICollection<Guid> IdsProdutos { get; private set; }
        public virtual ICollection<Produto> Produtos { get; private set; }
        public virtual ICollection<VendaProduto> VendasProdutos { get; private set; }

        public override bool EhValido()
        {
            ValidationResult = Validate(this);
            return true;
        }

        public void AdicionarProdutos(List<VendaProduto> vendasProdutos)
        {
            VendasProdutos = vendasProdutos;
        }
    }
}
