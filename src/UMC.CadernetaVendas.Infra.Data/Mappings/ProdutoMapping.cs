using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Infra.Data.Extensions;

namespace UMC.CadernetaVendas.Infra.Data.Mappings
{
    public class ProdutoMapping : EntityTypeConfiguration<Produto>
    {
        public override void Map(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .HasColumnType("varchar(150)")
                .IsRequired();

            builder.Property(p => p.Valor)
                .HasColumnType("decimal(5, 2)")
                .IsRequired();

            builder.Property(p => p.Peso)
                .HasColumnType("numeric(5, 3)")
                .IsRequired();

            builder.Property(p => p.Altura)
                .HasColumnType("decimal(5, 2)")
                .IsRequired(false);

            builder.Property(p => p.Largura)
                .HasColumnType("decimal(5, 2)")
                .IsRequired(false);

            builder.Property(p => p.Capacidade)
                .HasColumnType("numeric(5, 3)")
                .IsRequired(false);

            builder.Property(p => p.Descricao)
                .HasColumnType("varchar(300)")
                .IsRequired();

            builder.Property(p => p.Disponivel)
                .IsRequired(false);

            builder.Property(p => p.Quantidade)
                .IsRequired(false);

            builder.Ignore(e => e.ValidationResult);

            builder.Ignore(e => e.CascadeMode);

            builder.HasOne(p => p.Categoria)
                .WithMany(c => c.Produtos)
                .HasForeignKey(p => p.CategoriaId);

            builder.ToTable("Produtos");
        }
    }
}
