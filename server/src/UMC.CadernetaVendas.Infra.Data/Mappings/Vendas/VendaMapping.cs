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

            builder.Property(c => c.Total)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Ignore(c => c.IdsProdutos);

            builder.Ignore(c => c.IdsClientes);

            builder.Ignore(c => c.ValidationResult);

            builder.Ignore(c => c.CascadeMode);

            builder.ToTable("Vendas");
        }
    }
}
