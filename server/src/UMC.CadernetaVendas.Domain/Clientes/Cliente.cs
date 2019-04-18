﻿using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Clientes
{
    public class Cliente : Entity<Cliente>
    {
        public Cliente(string nome, string telefone, string celular, string email, Endereco endereco)
        {
            Nome = nome;
            Telefone = telefone;
            Celular = celular;
            Email = email;
            Endereco = endereco;
            SaldoDevedor = 0;
        }

        public string Nome { get; private set; }
        public decimal SaldoDevedor { get; private set; }
        public string Telefone { get; private set; }
        public string Celular { get; private set; }
        public string Email { get; private set; }
        public Guid EnderecoId { get; private set; }
        public virtual Endereco Endereco { get; private set; }
      
        // EF Core - Construtor Vázio
        protected Cliente() { }

        public override bool EhValido()
        {
            //throw new NotImplementedException();
            return true;
        }
    }
}