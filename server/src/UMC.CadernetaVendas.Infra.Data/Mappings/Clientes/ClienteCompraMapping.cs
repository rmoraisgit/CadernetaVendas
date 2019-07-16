using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings.Clientes
{
    public class ClienteCompraMapping : EntityTypeConfiguration<ClienteCompra>
    {
        public override void Map(EntityTypeBuilder<ClienteCompra> builder)
        {
            builder.HasKey(cc => new { cc.ClienteId, cc.CompraId });

            builder.HasOne(cc => cc.Cliente)
                .WithMany(c => c.ClientesCompras)
                .HasForeignKey(cc => cc.ClienteId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(cc => cc.Compra)
                .WithMany(c => c.ClientesCompras)
                .HasForeignKey(cc => cc.CompraId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(cc => cc.SaldoDevedorAntes)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Property(cc => cc.SaldoDevedorDepois)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Ignore(cp => cp.Id);

            builder.Ignore(c => c.ValidationResult);

            builder.Ignore(c => c.CascadeMode);

            builder.ToTable("ClientesCompras");
        }
    }
}
