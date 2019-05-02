using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Compras
{
    public class Compra : Entity<Compra>
    {
        public Compra(string fornecedor, decimal total)
        {
            Fornecedor = fornecedor;
            Total = total;
        }

        public string Fornecedor { get; private set; }
        public DateTime DataCadastro { get; private set; }
        public decimal Total { get; private set; }

        public ICollection<Guid> IdsProdutos { get; private set; }
        public virtual ICollection<Produto> Produtos { get; private set; }
        public virtual ICollection<CompraProduto> ComprasProdutos { get; private set; }

        // EF Core - Construtor Vázio
        protected Compra() { }

        public override bool EhValido()
        {
            ValidationResult = Validate(this);
            return true;
        }

        public void AtribuirIdsProdutos(ICollection<Guid> idsProdutos)
        {
            IdsProdutos = idsProdutos;
        }
    }
}
