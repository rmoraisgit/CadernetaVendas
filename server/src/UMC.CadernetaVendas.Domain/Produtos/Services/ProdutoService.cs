using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Services;

namespace UMC.CadernetaVendas.Domain.Produtos.Services
{
    public class ProdutoService : BaseService, IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IUnitOfWork _UoW;

        public ProdutoService(IProdutoRepository produtoRepository,
                              IUnitOfWork uow,
                              INotificador notificador) : base(notificador)
        {
            _produtoRepository = produtoRepository;
            _UoW = uow;
        }

        public async Task Adicionar(Produto obj)
        {
            if (!obj.EhValido())
            {
                Notificar(obj.ValidationResult);
                return;
            }

            await _produtoRepository.Adicionar(obj);

            await _UoW.Commit();
        }

        public async Task Atualizar(Produto obj)
        {
            if (!obj.EhValido())
            {
                Notificar(obj.ValidationResult);
                return;
            }

            _produtoRepository.Atualizar(obj);
            await _UoW.Commit();
        }

        public Produto BuscaPorId(Guid id)
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
