using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Produtos
{
    public class Produto : Entity<Produto>
    {
        public Produto(string nome,
                       decimal valor,
                       double peso,
                       double altura,
                       double largura,
                       double capacidade,
                       string descricao,
                       Guid categoriaId,
                       Guid corId)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Valor = valor;
            Peso = peso;
            Altura = altura;
            Largura = largura;
            Capacidade = capacidade;
            Descricao = descricao;
        }

        // EF Core - Construtor Vázio
        protected Produto() { }

        public string Nome { get; private set; }
        public decimal Valor { get; private set; }
        public double Peso { get; private set; }
        public double Altura { get; private set; }
        public double Largura { get; private set; }
        public double Capacidade { get; private set; }
        public string Dimensao { get; private set; }
        public string Descricao { get; private set; }
        public bool Disponivel { get; private set; }
        public int Quantidade { get; private set; }
        public Guid CategoriaId { get; private set; }
        //public Guid CorId { get; private set; }

        // EF Core - Propriedades de Navegação
        public virtual Categoria Categoria { get; private set; }
        // public virtual Cor Cor { get; private set; }
        // public virtual Compra Compra { get; private set; }

        public override bool EhValido()
        {
            Validar();
            return ValidationResult.IsValid;
        }

        private void Validar()
        {
            ValidarNome();
            ValidarValor();

            ValidationResult = Validate(this);
        }


        #region Validações

        private void ValidarNome()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O nome do produto precisa ser fornecido")
                .Length(2, 150).WithMessage("O nome do produto precisa ter entre 2 e 150 caracteres");
        }

        private void ValidarValor()
        {
            RuleFor(c => c.Valor)
                .NotEmpty().WithMessage("O valor do produto precisa ser fornecido")
                .ExclusiveBetween(1, 50000).WithMessage("O valor deve estar entre R$1.00 e R$50.000");
        }

        private void ValidarCapacidade()
        {

        }

        //private void ValidarPeso()
        //{
        //    RuleFor(c => c.Peso)
        //        .NotEmpty().WithMessage("O peso do produto precisa ser fornecido")
        //        .ExclusiveBetween(0.200, 100).WithMessage("O peso deve estar entre 200 gramas e 100 kilos");
        //}

        #endregion
    }
}
