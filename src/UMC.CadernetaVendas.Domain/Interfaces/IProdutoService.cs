using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IProdutoService : IDisposable
    {
        Produto Adicionar(Produto obj);
        Produto Atualizar(Produto obj);
        void Remover(Guid id);
        Produto BuscaPorId(Guid id);
        IEnumerable<Produto> BuscarTodos();
    }
}
