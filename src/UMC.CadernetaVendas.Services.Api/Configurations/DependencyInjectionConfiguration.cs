using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Infra.CrossCutting.IoC;
using UMC.CadernetaVendas.Services.Api.AutoMapper;

namespace UMC.CadernetaVendas.Services.Api.Configurations
{
    public static class DependencyInjectionConfiguration
    {
        public static void AddDIConfiguration(this IServiceCollection services)
        {
            // AutoMapper
            var config = AutoMapperConfiguration.RegisterMappings();
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            NativeInjectorBootStrapper.RegisterServices(services);
        }
    }
}
