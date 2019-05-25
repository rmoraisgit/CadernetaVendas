using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings.Vendas
{
    class VendaMapping : EntityTypeConfiguration<Venda>
    {
        public override void Map(EntityTypeBuilder<Venda> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(v => v.Total)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Ignore(v => v.IdsProdutos);

            builder.Ignore(v => v.ValidationResult);

            builder.Ignore(v => v.CascadeMode);

            builder.HasOne(v => v.Cliente)
               .WithMany(c => c.Vendas)
               .HasForeignKey(v => v.ClienteId);

            builder.ToTable("Vendas");
        }
    }
}
