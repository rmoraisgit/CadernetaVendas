using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class PagamentoViewModel : BaseViewModel
    {
        public decimal ValorTotal { get; set; }
        public decimal SaldoDevedorAntes { get; set; }
        public decimal SaldoDevedorDepois { get; set; }
        public Guid ClienteId { get; set; }
    }
}
