using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Interfaces;

namespace UMC.CadernetaVendas.Domain.Compras.Repository
{
    public interface ICompraProdutoRepository : IRepository<CompraProduto>
    {
        Task<IEnumerable<CompraProduto>> ObterComprasProdutoPorId(Guid id);
    }
}
