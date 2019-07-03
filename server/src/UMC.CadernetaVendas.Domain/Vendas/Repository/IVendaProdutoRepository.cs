using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Interfaces;

namespace UMC.CadernetaVendas.Domain.Vendas.Repository
{
    public interface IVendaProdutoRepository : IRepository<VendaProduto>
    {
        Task<IEnumerable<VendaProduto>> ObterVendasProdutoPorId(Guid id);
    }
}