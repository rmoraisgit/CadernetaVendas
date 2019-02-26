using System;
using System.Collections.Generic;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Produtos
{
    public class Categoria : Entity<Categoria>
    {
        public Categoria(string nome)
        {
            Id = Guid.NewGuid();
            Nome = nome;
        }    

        // EF Core - Construtor Vázio
        protected Categoria() { }

        public string Nome { get; private set; }

        // EF Propriedade de Navegação
        public virtual ICollection<Produto> Produtos { get; set; }

        public override bool EhValido()
        {
            return true;
        }
    }
}