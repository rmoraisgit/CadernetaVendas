using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Produtos
{
    public class Produto : Entity
    {
        public Produto(string nome,
                       decimal preco,
                       double peso,
                       double altura,
                       double largura,
                       Guid categoriaId,
                       Guid corId)
        {
            Nome = nome;
            Preco = preco;
            Peso = peso;
            Altura = altura;
            Largura = largura;
        }

        // EF Core - Construtor Vázio
        protected Produto() { }

        public string Nome { get; private set; }
        public decimal Preco { get; private set; }
        public double Peso { get; private set; }
        public double Altura { get; private set; }
        public double Largura { get; private set; }
        public bool Disponivel { get; private set; }
        public int Quantidade { get; private set; }
        public Guid CategoriaId { get; private set; }
        public Guid CorId { get; private set; }

        // EF Core - Propriedades de Navegação
        public virtual Categoria Categoria { get; private set; }
        public virtual Cor Cor { get; private set; }
        //public virtual Compra Compra { get; private set; }
    }
}
