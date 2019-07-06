using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class KardexProdutoViewModel : BaseViewModel
    {
        public Guid CompraId { get; set; }
        public Guid ProdutoId { get; set; }
        public string Nome { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal ValorFinal { get; set; }
        public int Quantidade { get; set; }
        public int QuantidadeAntes { get; set; }
        public int QuantidadeDepois { get; set; }

    }
}
