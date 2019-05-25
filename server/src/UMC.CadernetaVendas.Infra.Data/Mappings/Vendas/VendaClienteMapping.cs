using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings.Vendas
{
    public class VendaClienteMapping : EntityTypeConfiguration<VendaCliente>
    {
        public override void Map(EntityTypeBuilder<VendaCliente> builder)
        {
            builder.HasKey(vc => new { vc.VendaId, vc.ClienteId });

            builder.HasOne(vc => vc.Venda)
                .WithMany(v => v.VendasClientes)
                .HasForeignKey(vc => vc.VendaId);

            builder.HasOne(vc => vc.Cliente)
                .WithMany(p => p.VendasClientes)
                .HasForeignKey(vc => vc.ClienteId);

            builder.Ignore(vc => vc.Id);

            builder.Ignore(c => c.ValidationResult);

            builder.Ignore(c => c.CascadeMode);

            builder.ToTable("VendasClientes");
        }
    }
}
