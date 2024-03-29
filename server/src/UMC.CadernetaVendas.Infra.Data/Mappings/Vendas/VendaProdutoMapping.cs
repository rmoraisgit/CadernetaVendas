﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings.Vendas
{
    public class VendaProdutoMapping : EntityTypeConfiguration<VendaProduto>
    {
        public override void Map(EntityTypeBuilder<VendaProduto> builder)
        {
            builder.HasKey(vp => new { vp.VendaId, vp.ProdutoId });

            builder.HasOne(vp => vp.Venda)
                .WithMany(v => v.VendasProdutos)
                .HasForeignKey(vp => vp.VendaId);

            builder.HasOne(vp => vp.Produto)
                .WithMany(p => p.VendasProdutos)
                .HasForeignKey(vp => vp.ProdutoId);

            builder.Property(p => p.ValorVenda)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Property(p => p.ValorSugerido)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Property(p => p.ValorFinal)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Ignore(vp => vp.Id);

            builder.Ignore(v => v.ValidationResult);

            builder.Ignore(v => v.CascadeMode);

            builder.ToTable("VendasProdutos");
        }
    }
}
