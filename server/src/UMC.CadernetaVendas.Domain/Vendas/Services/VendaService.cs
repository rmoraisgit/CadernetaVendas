using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Services;
using UMC.CadernetaVendas.Domain.Vendas.Repository;

namespace UMC.CadernetaVendas.Domain.Vendas.Services
{
    public class VendaService : BaseService, IVendaService
    {
        private readonly IVendaRepository _vendaRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IVendaProdutoRepository _vendaProdutoRepository;
        private readonly IUnitOfWork _UoW;

        public VendaService(IVendaRepository vendaRepository,
                             IProdutoRepository produtoRepository,
                             IVendaProdutoRepository vendaProdutoRepository,
                             IUnitOfWork uow,
                             INotificador notificador) : base(notificador)
        {
            _vendaRepository = vendaRepository;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
            _UoW = uow;
        }

        public async Task Registrar(Venda venda)
        {
            if (!venda.EhValido())
            {
                Notificar(venda.ValidationResult);
                return;
            }

            await _vendaRepository.Adicionar(venda);

            foreach (var produto in venda.VendasProdutos)
            {
                await _vendaProdutoRepository.Adicionar(produto);
            }

            await _UoW.Commit();
                    }

        public async Task<IEnumerable<Venda>> BuscarTodas()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _vendaRepository.Dispose();
            _vendaProdutoRepository.Dispose();
        }
    }
}
