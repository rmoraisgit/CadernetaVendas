﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    [DbContext(typeof(CadernetaVendasContext))]
    [Migration("20190717004323_NovoCampoValorTotalCompraNaTabelaClientesCompras")]
    partial class NovoCampoValorTotalCompraNaTabelaClientesCompras
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Clientes.Cliente", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Ativo")
                        .HasColumnType("bit");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("varchar(11)");

                    b.Property<string>("Celular")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<Guid>("EnderecoId");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<decimal>("SaldoDevedor")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.HasIndex("EnderecoId")
                        .IsUnique();

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Clientes.ClienteCompra", b =>
                {
                    b.Property<Guid>("ClienteId");

                    b.Property<Guid>("CompraId");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<decimal>("SaldoDevedorAntes")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<decimal>("SaldoDevedorDepois")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<decimal>("valorTotalCompra")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("ClienteId", "CompraId");

                    b.HasIndex("CompraId");

                    b.ToTable("ClientesCompras");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Clientes.Endereco", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("CEP")
                        .IsRequired()
                        .IsFixedLength(true)
                        .HasMaxLength(8);

                    b.Property<string>("Cidade")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<Guid>("ClienteId");

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("Logradouro")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasMaxLength(150);

                    b.HasKey("Id");

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Compras.Compra", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Fornecedor")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("Id");

                    b.ToTable("Compras");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Compras.CompraProduto", b =>
                {
                    b.Property<Guid>("CompraId");

                    b.Property<Guid>("ProdutoId");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<int>("Quantidade");

                    b.Property<int>("QuantidadeAntes");

                    b.Property<int>("QuantidadeDepois");

                    b.Property<decimal>("ValorFinal");

                    b.Property<decimal>("ValorUnitario");

                    b.HasKey("CompraId", "ProdutoId");

                    b.HasIndex("ProdutoId");

                    b.ToTable("ComprasProdutos");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Produtos.Categoria", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.HasKey("Id");

                    b.ToTable("Categorias");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Produtos.Produto", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal?>("Altura")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("decimal(5, 2)");

                    b.Property<decimal?>("Capacidade")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("numeric(5, 3)");

                    b.Property<Guid>("CategoriaId");

                    b.Property<Guid?>("CompraId");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("varchar(300)");

                    b.Property<string>("Dimensao");

                    b.Property<bool?>("Disponivel");

                    b.Property<byte[]>("Foto");

                    b.Property<decimal?>("Largura")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("decimal(5, 2)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.Property<decimal>("Peso")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("numeric(5, 3)");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.Property<decimal>("ValorCompra")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<decimal>("ValorVenda")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<Guid?>("VendaId");

                    b.HasKey("Id");

                    b.HasIndex("CategoriaId");

                    b.HasIndex("CompraId");

                    b.HasIndex("VendaId");

                    b.ToTable("Produtos");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Vendas.Venda", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ClienteId");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Vendas");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Vendas.VendaProduto", b =>
                {
                    b.Property<Guid>("VendaId");

                    b.Property<Guid>("ProdutoId");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<int>("Quantidade");

                    b.Property<int>("QuantidadeAntes");

                    b.Property<int>("QuantidadeDepois");

                    b.Property<decimal>("ValorFinal")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<decimal>("ValorSugerido")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<decimal>("ValorVenda")
                        .HasColumnType("decimal(10, 2)");

                    b.HasKey("VendaId", "ProdutoId");

                    b.HasIndex("ProdutoId");

                    b.ToTable("VendasProdutos");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Clientes.Cliente", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Clientes.Endereco", "Endereco")
                        .WithOne("Cliente")
                        .HasForeignKey("UMC.CadernetaVendas.Domain.Clientes.Cliente", "EnderecoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Clientes.ClienteCompra", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Clientes.Cliente", "Cliente")
                        .WithMany("ClientesCompras")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("UMC.CadernetaVendas.Domain.Vendas.Venda", "Compra")
                        .WithMany("ClientesCompras")
                        .HasForeignKey("CompraId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Compras.CompraProduto", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Compras.Compra", "Compra")
                        .WithMany("ComprasProdutos")
                        .HasForeignKey("CompraId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UMC.CadernetaVendas.Domain.Produtos.Produto", "Produto")
                        .WithMany("ComprasProdutos")
                        .HasForeignKey("ProdutoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Produtos.Produto", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Produtos.Categoria", "Categoria")
                        .WithMany("Produtos")
                        .HasForeignKey("CategoriaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UMC.CadernetaVendas.Domain.Compras.Compra")
                        .WithMany("Produtos")
                        .HasForeignKey("CompraId");

                    b.HasOne("UMC.CadernetaVendas.Domain.Vendas.Venda")
                        .WithMany("Produtos")
                        .HasForeignKey("VendaId");
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Vendas.Venda", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Clientes.Cliente", "Cliente")
                        .WithMany("Vendas")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UMC.CadernetaVendas.Domain.Vendas.VendaProduto", b =>
                {
                    b.HasOne("UMC.CadernetaVendas.Domain.Produtos.Produto", "Produto")
                        .WithMany("VendasProdutos")
                        .HasForeignKey("ProdutoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UMC.CadernetaVendas.Domain.Vendas.Venda", "Venda")
                        .WithMany("VendasProdutos")
                        .HasForeignKey("VendaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}