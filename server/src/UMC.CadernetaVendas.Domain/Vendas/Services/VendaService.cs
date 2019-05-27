using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Vendas.Repository;

namespace UMC.CadernetaVendas.Domain.Vendas.Services
{
    public class VendaService : IVendaService
    {
        private readonly IVendaRepository _vendaRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IVendaProdutoRepository _vendaProdutoRepository;
        private readonly IUnitOfWork _UoW;

        public VendaService(IVendaRepository vendaRepository,
                             IProdutoRepository produtoRepository,
                             IVendaProdutoRepository vendaProdutoRepository,
                             IUnitOfWork uow)
        {
            _vendaRepository = vendaRepository;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
            _UoW = uow;
        }

        public Venda Registrar(Venda venda)
        {
            if (!venda.EhValido()) return venda;

            _vendaRepository.Adicionar(venda);

            foreach (var produto in venda.VendasProdutos)
            {
                _vendaProdutoRepository.Adicionar(produto);
            }

            _UoW.Commit();

            return venda;
        }

        public IEnumerable<Venda> BuscarTodas()
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
