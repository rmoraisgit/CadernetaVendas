﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovoCampoDataCadastroParaComprasEVendas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataCadastro",
                table: "VendasProdutos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCadastro",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "VendasProdutos");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "ComprasProdutos");
        }
    }
}
