using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings
{
    public class ClienteMapping : EntityTypeConfiguration<Cliente>
    {
        public override void Map(EntityTypeBuilder<Cliente> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Nome)
                .HasColumnType("varchar(150)")
                .IsRequired();

            builder.Property(c => c.SaldoDevedor)
                .HasColumnType("decimal(10, 2)")
                .IsRequired();

            builder.Property(c => c.Telefone)
                .HasColumnType("varchar(20)")
                .IsRequired();

            builder.Property(c => c.Celular)
                .HasColumnType("varchar(20)")
                .IsRequired();

            builder.Property(c => c.Email)
                .HasColumnType("varchar(150)")
                .IsRequired();

            builder.Ignore(e => e.ValidationResult);

            builder.Ignore(e => e.CascadeMode);

            builder.HasOne(c => c.Endereco)
                .WithOne(e => e.Cliente)
                .HasForeignKey<Endereco>(e => e.ClienteId);

            builder.ToTable("Clientes");
        }
    }
}
