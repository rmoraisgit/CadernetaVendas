﻿using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class ProdutoViewModel : BaseViewModel
    {
        [Required(ErrorMessage = "O Nome é requerido")]
        [MinLength(2, ErrorMessage = "O tamanho minimo do Nome é {1} caracteres")]
        [MaxLength(150, ErrorMessage = "O tamanho máximo do Nome é {1} caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O valor é requerido")]
        [DisplayFormat(DataFormatString = "{0:C}")]
        [DataType(DataType.Currency, ErrorMessage = "Moeda em formato inválido")]
        public decimal Valor { get; set; }

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

        public Guid CategoriaId { get; set; }

        //public FluentValidation.Results.ValidationResult ValidationResult { get; set; }
    }
}
