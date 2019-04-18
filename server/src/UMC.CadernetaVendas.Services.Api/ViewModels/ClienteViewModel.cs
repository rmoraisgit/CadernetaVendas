using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class ClienteViewModel : BaseViewModel
    {
        [Required(ErrorMessage = "O Nome é requerido")]
        [MinLength(2, ErrorMessage = "O tamanho minimo do Nome é {1} caracteres")]
        [MaxLength(150, ErrorMessage = "O tamanho máximo do Nome é {1} caracteres")]
        public string Nome { get;  set; }

        [Required(ErrorMessage = "O valor é requerido")]
        [DisplayFormat(DataFormatString = "{0:C}")]
        [DataType(DataType.Currency, ErrorMessage = "Moeda em formato inválido")]
        public decimal SaldoDevedor { get; set; }

        [Required(ErrorMessage = "O valor é requerido")]
        public string Telefone { get;  set; }

        [Required(ErrorMessage = "O valor é requerido")]
        public string Celular { get;  set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(50, ErrorMessage = "Máximo {0} caracteres")]
        [EmailAddress(ErrorMessage = "Preencha um E-mail válido")]
        public string Email { get;  set; }
        
        public virtual ICollection<EnderecoViewModel> Enderecos { get;  set; }
    }
}
