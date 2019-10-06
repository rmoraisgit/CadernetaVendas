using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;
using UMC.CadernetaVendas.Domain.Vendas;

namespace UMC.CadernetaVendas.Domain.Clientes
{
    public class Cliente : Entity<Cliente>
    {
        public Cliente(string nome, string cpf, string telefone, string celular, string email, bool ativo, Endereco endereco)
        {
            Nome = nome;
            CPF = cpf;
            Telefone = telefone;
            Celular = celular;
            Email = email;
            Endereco = endereco;
            Ativo = Ativo;
            SaldoDevedor = 0;
        }

        public string Nome { get; private set; }
        public string CPF { get; private set; }
        public decimal SaldoDevedor { get; private set; }
        public string Telefone { get; private set; }
        public string Celular { get; private set; }
        public string Email { get; private set; }
        public bool Ativo { get; private set; }
        public DateTime DataCadastro { get; private set; }
        public Guid EnderecoId { get; private set; }
        public virtual Endereco Endereco { get; private set; }
        public virtual ICollection<Venda> Vendas { get; private set; }
        public virtual ICollection<ClienteCompra> ClientesCompras { get; private set; }
        public virtual ICollection<Pagamento> Pagamentos { get; private set; }

        // EF Core - Construtor Vázio
        protected Cliente() { }

        public override bool EhValido()
        {
            Validar();
            return ValidationResult.IsValid;
        }

        private void Validar()
        {
            ValidarNome();
            ValidarNumeroCelular();

            ValidationResult = Validate(this);
        }

        public void AtribuirEndereco(Endereco endereco)
        {
            Endereco = endereco;
        }

        public void IncrementarSaldoDevedor(decimal valorCompra)
        {
            SaldoDevedor += valorCompra;
        }

        public void EfetuarPagamento(decimal valorPagamento)
        {
            SaldoDevedor -= valorPagamento;
        }

        private void ValidarNome()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O nome do cliente precisa ser informado")
                .Length(2, 150).WithMessage("O nome do cliente precisa ter entre 2 e 150 caracteres");
        }

        private void ValidarNumeroCelular()
        {
            RuleFor(c => c.Celular)
                .NotEmpty().WithMessage("O numero do celular do cliente precisa ser informado")
                .Length(11).WithMessage("O numero do celular do cliente precisa ter entre 11 caracteres");
        }
    }
}