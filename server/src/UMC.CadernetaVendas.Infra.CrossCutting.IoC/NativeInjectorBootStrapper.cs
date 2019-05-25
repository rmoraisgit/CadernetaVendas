using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Clientes.Services;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Compras.Services;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Produtos.Services;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Domain.Vendas.Services;
using UMC.CadernetaVendas.Infra.Data.Context;
using UMC.CadernetaVendas.Infra.Data.Repository;
using UMC.CadernetaVendas.Infra.Data.UoW;

namespace UMC.CadernetaVendas.Infra.CrossCutting.IoC
{
    public static class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // Domain - Services
            services.AddScoped<IProdutoService, ProdutoService>();
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IVendaService, VendaService>();
            services.AddScoped<ICompraService, CompraService>();

            // Infra - Data
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IVendaRepository, VendaRepository>();
            services.AddScoped<IVendaProdutoRepository, VendaProdutoRepository>();
            services.AddScoped<ICompraRepository, CompraRepository>();
            services.AddScoped<ICompraProdutoRepository, CompraProdutoRepository>();
            services.AddScoped<CadernetaVendasContext>();

            // Infra - UoW
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}
