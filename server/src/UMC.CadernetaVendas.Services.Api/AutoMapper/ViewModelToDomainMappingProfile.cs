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
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ProdutoViewModel, Produto>();
            CreateMap<ClienteViewModel, Cliente>();
            CreateMap<ClienteCompraViewModel, ClienteCompra>();
            CreateMap<EnderecoViewModel, Endereco>();
            CreateMap<VendaViewModel, Venda>();
            CreateMap<VendaProdutoViewModel, VendaProduto>();
            CreateMap<CompraViewModel, Compra>();
            CreateMap<CompraProdutoViewModel, CompraProduto>();
        }
    }
}
