using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings
{
    public class CompraMapping : EntityTypeConfiguration<Compra>
    {
        public override void Map(EntityTypeBuilder<Compra> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(c => c.Fornecedor)
                .HasColumnType("varchar(150)")
                .IsRequired();

            builder.Property(c => c.Total)
                .HasColumnName("decimal(10, 2)")
                .IsRequired();

            builder.Ignore(c => c.ValidationResult);

            builder.Ignore(c => c.CascadeMode);

            builder.ToTable("Compras");
        }
    }
}
