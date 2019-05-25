using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Infra.Data.Extensions;
using UMC.CadernetaVendas.Infra.Data.Mappings;
using UMC.CadernetaVendas.Infra.Data.Mappings.Vendas;

namespace UMC.CadernetaVendas.Infra.Data.Context
{
    public class CadernetaVendasContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }

        public DbSet<Venda> Venda { get; set; }
        public DbSet<VendaProduto> VendasProdutos { get; set; }

        public DbSet<Compra> Compras { get; set; }
        public DbSet<CompraProduto> ComprasProdutos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddConfiguration(new ProdutoMapping());
            modelBuilder.AddConfiguration(new CategoriaMapping());

            modelBuilder.AddConfiguration(new ClienteMapping());
            modelBuilder.AddConfiguration(new EnderecoMapping());

            modelBuilder.AddConfiguration(new VendaMapping());
            modelBuilder.AddConfiguration(new VendaProdutoMapping());

            modelBuilder.AddConfiguration(new CompraMapping());
            modelBuilder.AddConfiguration(new CompraProdutoMapping());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(e => e.Entity.GetType().GetProperty("DataCadastro") != null))
            {
                if (entry.State == EntityState.Added)
                    entry.Property("DataCadastro").CurrentValue = DateTime.Now;

                if (entry.State == EntityState.Modified)
                    entry.Property("DataCadastro").IsModified = false;
            }

            return base.SaveChanges();
        }
    }
}
