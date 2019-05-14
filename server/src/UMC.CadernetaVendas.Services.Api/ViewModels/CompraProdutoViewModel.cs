using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class CompraProdutoViewModel : BaseViewModel
    {
        public Guid CompraId { get; set; }
        public Guid ProdutoId { get; set; }
        public string Nome { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal ValorFinal { get; set; }
        public int Quantidade { get; set; }
    }
}
