using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Vendas;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IVendaService : IDisposable
    {
        Task Registrar(Venda venda);
        Task<IEnumerable<Venda>> BuscarTodas();
    }
}
