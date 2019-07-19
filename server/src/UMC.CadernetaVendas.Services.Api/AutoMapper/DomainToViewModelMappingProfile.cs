using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Produto, ProdutoViewModel>();

            CreateMap<Cliente, ClienteViewModel>();
            CreateMap<ClienteCompra, ClienteCompraViewModel>();
            CreateMap<Endereco, EnderecoViewModel>();
            CreateMap<Pagamento, PagamentoViewModel>();

            CreateMap<Venda, VendaViewModel>();
            CreateMap<VendaProduto, VendaProdutoViewModel>();
            CreateMap<Compra, CompraViewModel>();
            CreateMap<CompraProduto, CompraProdutoViewModel>();

            // Kardex Produto
            CreateMap<VendaProduto, KardexProdutoViewModel>();
            CreateMap<CompraProduto, KardexProdutoViewModel>();
        }
    }
}
