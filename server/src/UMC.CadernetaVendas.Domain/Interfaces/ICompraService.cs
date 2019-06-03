using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Compras;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface ICompraService : IDisposable
    {
        Compra Registrar(Compra compra);
        Task<IEnumerable<Compra>> BuscarTodas();
    }
}
