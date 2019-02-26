using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UMC.CadernetaVendas.Domain.Produtos;

namespace UMC.CadernetaVendas.Infra.Data.Context
{
    public class CadernetaVendasContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder<Produto>()
            modelBuilder.Entity<Produto>().Ignore(c => c.ValidationResult);
            modelBuilder.Entity<Produto>().Ignore(c => c.CascadeMode);

            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Categoria)
                .WithMany(c => c.Produtos)
                .HasForeignKey(p => p.CategoriaId);

            modelBuilder.Entity<Produto>().ToTable("Produtos");



            modelBuilder.Entity<Categoria>().Ignore(c => c.ValidationResult);
            modelBuilder.Entity<Categoria>().Ignore(c => c.CascadeMode);

            modelBuilder.Entity<Categoria>().ToTable("Categorias");

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        }
    }
}
