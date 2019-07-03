using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Vendas;

namespace UMC.CadernetaVendas.Domain.Produtos
{
    public class Produto : Entity<Produto>
    {
        public Produto(
            string nome,
            double peso,
            double altura,
            double largura,
            double capacidade,
            string descricao,
            Guid categoriaId
            )
        {
            Id = Guid.NewGuid();
            Nome = nome;
            //Valor = valor;
            Peso = peso;
            Altura = altura;
            Largura = largura;
            Capacidade = capacidade;
            Descricao = descricao;
            CategoriaId = categoriaId;
        }

        // EF Core - Construtor Vázio
        protected Produto() { }

        public string Nome { get; private set; }
        public decimal ValorCompra { get; private set; }
        public decimal ValorVenda { get; private set; }
        public double Peso { get; private set; }
        public double? Altura { get; private set; }
        public double? Largura { get; private set; }
        public double? Capacidade { get; private set; }
        public string Dimensao { get; private set; }
        public string Descricao { get; private set; }
        public bool? Disponivel { get; private set; }
        public int Quantidade { get; private set; }
        public byte[] Foto { get; set; }
        public DateTime DataCadastro { get; private set; }
        public Guid CategoriaId { get; private set; }
        public virtual Categoria Categoria { get; private set; }
        public virtual ICollection<VendaProduto> VendasProdutos { get; private set; }
        public virtual ICollection<CompraProduto> ComprasProdutos { get; private set; }

        public override bool EhValido()
        {
            Validar();
            return ValidationResult.IsValid;
        }

        private void Validar()
        {
            ValidarNome();
            ValidarDescricao();
            ValidarPeso();
            ValidarCapacidade();
            ValidarAltura();
            ValidarLargura();

            ValidationResult = Validate(this);
        }

        #region Validações

        private void ValidarNome()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O nome do produto precisa ser fornecido")
                .Length(2, 150).WithMessage("O nome do produto precisa ter entre 2 e 150 caracteres");
        }

        //private void ValidarValor()
        //{
        //    RuleFor(c => c.Valor)
        //        .NotEmpty().WithMessage("O valor do produto precisa ser fornecido")
        //        .ExclusiveBetween(1, 50001).WithMessage("O valor deve estar entre R$1.00 e R$50.000");
        //}

        private void ValidarDescricao()
        {
            RuleFor(c => c.Descricao)
                .NotEmpty().WithMessage("A descrição do produto precisa ser fornecida")
                .Length(9, 301).WithMessage("A descrição do produto precisa ter entre 10 e 300 caracteres");
        }

        private void ValidarPeso()
        {
            RuleFor(c => c.Peso)
                .NotEmpty().WithMessage("O peso do produto precisa ser fornecido")
                .ExclusiveBetween(0.199, 101).WithMessage("O peso deve estar entre 200 gramas e 100 kilos");
        }

        private void ValidarAltura()
        {
            // Id da categoria Cozinha
            if (CategoriaId.ToString() == "57b328e4-a8e3-4c61-ac95-59e110d2edd8") return;

            RuleFor(c => c.Altura)
                .NotEmpty().WithMessage("A altura do produto precisa ser fornecido")
                .ExclusiveBetween(0.10, 20).WithMessage("A altura do produto deve estar entre 10 centimetros e 20 metros");
        }

        private void ValidarLargura()
        {
            // Id da categoria Cozinha
            if (CategoriaId.ToString() == "57b328e4-a8e3-4c61-ac95-59e110d2edd8") return;

            RuleFor(c => c.Altura)
                .NotEmpty().WithMessage("A largura do produto precisa ser fornecido")
                .ExclusiveBetween(0.10, 20).WithMessage("A largura do produto deve estar entre 10 centimetros e 20 metros");
        }

        private void ValidarCapacidade()
        {
            // Id da categoria Cozinha
            if (CategoriaId.ToString() != "57b328e4-a8e3-4c61-ac95-59e110d2edd8") return;

            RuleFor(c => c.Capacidade)
                .NotEmpty().WithMessage("A capacidade do produto em litros precisa ser fornecida")
                .ExclusiveBetween(0.99, 101).WithMessage("A capacidade do produto em litros deve estar entre 200 mililitros e 100 litros");
        }

        #endregion

        public void AtualizarValorCompra(decimal novoValor)
        {
            ValorCompra = novoValor;
            AtualizarValorVenda(ValorCompra);
        }

        private void AtualizarValorVenda(decimal valorCompra)
        {
            ValorVenda = valorCompra + ((valorCompra * 20) / 100);
        }

        public void IncrementarEstoque(int quantidade)
        {
            Quantidade += quantidade;
        }

        public void DecrementarEstoque(int quantidade)
        {
            Quantidade =- quantidade;
        }
    }
}
