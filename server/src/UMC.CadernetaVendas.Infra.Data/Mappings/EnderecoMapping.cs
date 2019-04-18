using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings
{
    public class EnderecoMapping : EntityTypeConfiguration<Endereco>
    {
        public override void Map(EntityTypeBuilder<Endereco> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.CEP)
                .HasMaxLength(8)
                .IsFixedLength()
                .IsRequired();

            builder.Property(e => e.Logradouro)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(e => e.Numero)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(e => e.Bairro)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(e => e.Cidade)
               .HasMaxLength(150)
               .IsRequired();

            builder.Property(e => e.Estado)
               .HasMaxLength(150)
               .IsRequired();

            builder.Ignore(e => e.ValidationResult);

            builder.Ignore(e => e.CascadeMode);

            builder.HasOne(e => e.Cliente)
                .WithOne(c => c.Endereco)
                .HasForeignKey<Cliente>(c => c.EnderecoId);

            builder.ToTable("Enderecos");
        }
    }
}
