using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class ExtratoPagamentosComprasClienteViewModel : BaseViewModel
    {
        public Guid ClienteId { get; set; }
        public Guid CompraId { get; set; }

        public decimal SaldoDevedorAntes { get; set; }
        public decimal SaldoDevedorDepois { get; set; }
        public decimal ValorTotal { get; set; }
    }
}
