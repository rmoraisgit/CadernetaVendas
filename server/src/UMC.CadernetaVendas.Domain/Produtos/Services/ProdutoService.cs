using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Core.Notifications;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;

namespace UMC.CadernetaVendas.Domain.Produtos.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IUnitOfWork _UoW;

        public ProdutoService(IProdutoRepository produtoRepository,
                              IUnitOfWork uow)
        {
            _produtoRepository = produtoRepository;
            _UoW = uow;
        }

        public Produto Adicionar(Produto obj)
        {
            if (!obj.EhValido()) return obj;

            obj = _produtoRepository.Adicionar(obj);

            _UoW.Commit();

            return obj;
        }

        public Produto Atualizar(Produto obj)
        {
            throw new NotImplementedException();
        }

        public Produto BuscaPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Produto>> BuscarTodos()
        {
            throw new NotImplementedException();
        }

        public void Remover(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _produtoRepository.Dispose();
        }
    }
}
