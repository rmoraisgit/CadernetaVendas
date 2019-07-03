using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Services.Api.Extensions;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    [ModelBinder(typeof(JsonWithFilesFormDataModelBinder), Name = "produto")]
    public class ProdutoViewModel : BaseViewModel
    {
        public ProdutoViewModel()
        {
            kardex = new List<KardexProdutoViewModel>();
        }

        [Required(ErrorMessage = "O Nome é requerido")]
        [MinLength(2, ErrorMessage = "O tamanho minimo do Nome é {1} caracteres")]
        [MaxLength(150, ErrorMessage = "O tamanho máximo do Nome é {1} caracteres")]
        public string Nome { get; set; }

        //[Required(ErrorMessage = "O valor é requerido")]
        //[DisplayFormat(DataFormatString = "{0:C}")]
        //[DataType(DataType.Currency, ErrorMessage = "Moeda em formato inválido")]
        //public decimal Valor { get; set; }

        public decimal ValorCompra { get; set; }

        public decimal ValorVenda { get; set; }

        [Required(ErrorMessage = "O peso é requerido")]
        public double Peso { get; set; }

        public double? Altura { get; set; }

        public double? Largura { get; set; }

        public double? Capacidade { get; set; }

        public string Dimensao { get; set; }

        [Required(ErrorMessage = "O Nome é requerido")]
        [MinLength(10, ErrorMessage = "O tamanho minimo da Descrição é {1} caracteres")]
        [MaxLength(300, ErrorMessage = "O tamanho máximo do Nome é {1} caracteres")]
        public string Descricao { get; set; }

        public bool? Disponivel { get; set; }

        public int? Quantidade { get; set; }

        public byte[] Foto { get; set; }

        public IFormFile FormFile { get; set; }

        public IEnumerable<VendaProdutoViewModel> vendasProduto { get; set; }

        public IEnumerable<VendaProdutoViewModel> comprasProduto { get; set; }

        public List<KardexProdutoViewModel> kardex { get; set; }

        public Guid CategoriaId { get; set; }
    }
}
