using Microsoft.AspNetCore.Http;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Infra.CrossCutting.IoC;
using UMC.CadernetaVendas.Services.Api.AutoMapper;
using UMC.CadernetaVendas.Services.Api.Extensions;


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

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUser, AspNetUser>();

            NativeInjectorBootStrapper.RegisterServices(services);
        }
    }
}
