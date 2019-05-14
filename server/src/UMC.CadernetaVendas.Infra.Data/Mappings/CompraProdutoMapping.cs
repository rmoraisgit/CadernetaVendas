using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings
{
    public class CompraProdutoMapping : EntityTypeConfiguration<CompraProduto>
    {
        public override void Map(EntityTypeBuilder<CompraProduto> builder)
        {
            builder.HasKey(cp => new { cp.CompraId, cp.ProdutoId });

            builder.HasOne(cp => cp.Compra)
                .WithMany(c => c.ComprasProdutos)
                .HasForeignKey(cp => cp.CompraId);

            builder.HasOne(cp => cp.Produto)
                .WithMany(p => p.ComprasProdutos)
                .HasForeignKey(cp => cp.ProdutoId);

            builder.Ignore(cp => cp.Id);

            builder.Ignore(c => c.ValidationResult);

            builder.Ignore(c => c.CascadeMode);

            builder.ToTable("ComprasProdutos");
        }
    }
}
