using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class CompraViewModel : BaseViewModel
    {
        [Required(ErrorMessage = "O Fornecedor é requerido")]
        public string Fornecedor { get; set; }

        [Required(ErrorMessage = "O Total é requerido")]
        public decimal Total { get; set; }

        [Required(ErrorMessage = "Os IdsProdutos é requerido")]
        public ICollection<Guid> IdsProdutos { get; set; }
        //public virtual ICollection<Produto> Produtos { get; private set; }
        //public virtual ICollection<CompraProduto> ComprasProdutos { get; private set; }
    }
}
