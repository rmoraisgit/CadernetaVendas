using System;
using System.Collections.Generic;
using System.Text;

namespace UMC.CadernetaVendas.Domain.Produtos.Commands
{
    public class RegistrarProdutoCommand : BaseProdutoCommand
    {
        public RegistrarProdutoCommand(
            string nome,
            decimal valor,
            double peso,
            double altura,
            double largura,
            double capacidade,
            string descricao,
            Guid categoriaId
            )
        {
            Nome = nome;
            Valor = valor;
            Peso = peso;
            Altura = altura;
            Largura = largura;
            Capacidade = capacidade;
            Descricao = descricao;
            CategoriaId = categoriaId;
        }
    }
}
