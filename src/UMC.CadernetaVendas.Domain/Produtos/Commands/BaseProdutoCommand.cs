using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Commands;

namespace UMC.CadernetaVendas.Domain.Produtos.Commands
{
    public abstract class BaseProdutoCommand : Command
    {
        public string Nome { get; protected set; }
        public decimal Valor { get; protected set; }
        public double Peso { get; protected set; }
        public double Altura { get; protected set; }
        public double Largura { get; protected set; }
        public double Capacidade { get; protected set; }
        public string Dimensao { get; protected set; }
        public string Descricao { get; protected set; }
        public bool Disponivel { get; protected set; }
        public int Quantidade { get; protected set; }
        public Guid CategoriaId { get; protected set; }
    }
}
