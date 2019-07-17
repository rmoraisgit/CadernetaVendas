using System;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public class ClienteCompraViewModel : BaseViewModel
    {
        public Guid ClienteId { get; private set; }
        public Guid CompraId { get; private set; }
        public decimal SaldoDevedorAntes { get; set; }
        public decimal SaldoDevedorDepois { get; set; }
        public decimal valorTotalCompra { get; set; }
    }
}