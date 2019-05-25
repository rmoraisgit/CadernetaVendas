using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Vendas;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IVendaService : IDisposable
    {
        Venda Registrar(Venda compra);
        IEnumerable<Venda> BuscarTodas();
    }
}
