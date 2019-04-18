using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Models;

namespace UMC.CadernetaVendas.Domain.Clientes
{
    public class Endereco : Entity<Endereco>
    {
        public string CEP { get; private set; }
        public string Logradouro { get; private set; }
        public string Numero{ get; private set; }
        public string Bairro { get; private set; }
        public string Cidade { get; private set; }
        public string Estado { get; private set; }
        public Guid ClienteId { get; private set; }
        public virtual Cliente Cliente { get; private set; }

        // EF Core - Construtor Vázio
        protected Endereco() { }

        public override bool EhValido()
        {
            //throw new NotImplementedException();
            return true;
        }
    }
}
