using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class VendaViewModel : BaseViewModel
    {
        [Required(ErrorMessage = "O cliente é requerido")]
        public Guid ClienteId { get; set; }

        [Required(ErrorMessage = "O Total da venda é requerido")]
        public decimal Total { get; set; }

        [Required(ErrorMessage = "Os produtos são requeridos")]
        //public ICollection<ProdutoViewModel> Produtos { get; set; }
        public ICollection<VendaProdutoViewModel> ProdutosVenda { get; set; }
    }
}
