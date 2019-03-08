using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ProdutoViewModel, Produto>();
        }
    }
}
