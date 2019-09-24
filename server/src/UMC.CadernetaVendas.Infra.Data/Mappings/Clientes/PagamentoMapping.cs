using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings.Clientes
{
    public class PagamentoMapping : EntityTypeConfiguration<Pagamento>
    {
        public override void Map(EntityTypeBuilder<Pagamento> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.ValorTotal)
              .HasColumnType("decimal(10, 2)")
              .IsRequired();

            builder.Property(p => p.SaldoDevedorAntes)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Property(p => p.SaldoDevedorDepois)
               .HasColumnType("decimal(10, 2)")
               .IsRequired();

            builder.Ignore(e => e.ValidationResult);

            builder.Ignore(e => e.CascadeMode);

            builder.HasOne(p => p.Cliente)
                .WithMany(c => c.Pagamentos)
                .HasForeignKey(p => p.ClienteId);

            builder.ToTable("Pagamentos");
        }

    }
}
