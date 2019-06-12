using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IProdutoService : IDisposable
    {
        Task Adicionar(Produto obj);
        Produto Atualizar(Produto obj);
        void Remover(Guid id);
        Produto BuscaPorId(Guid id);
        Task<IEnumerable<Produto>> BuscarTodos();
    }
}
