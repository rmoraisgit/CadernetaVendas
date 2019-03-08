using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class ProdutoViewModel
    {
        public ProdutoViewModel()
        {
            Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public double Peso { get; set; }
        public double? Altura { get; set; }
        public double? Largura { get; set; }
        public double? Capacidade { get; set; }
        public string Dimensao { get; set; }
        public string Descricao { get; set; }
        public bool? Disponivel { get; set; }
        public int? Quantidade { get; set; }
        public Guid CategoriaId { get; set; }
    }
}
