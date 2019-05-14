using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class RemocaoPKUnicaComprasProdutos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "ComprasProdutos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
