using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UMC.CadernetaVendas.Services.Api.AutoMapper;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Services;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Infra.Data.Repository;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Services.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            #region Configurações AutoMapper

            var config = AutoMapperConfiguration.RegisterMappings();
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            #endregion

            services.AddScoped<IProdutoService, ProdutoService>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<CadernetaVendasContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
