using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class addmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "decimal(10, 2)",
                table: "Compras",
                newName: "Total");

            migrationBuilder.AddColumn<Guid>(
                name: "CompraId",
                table: "Produtos",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<decimal>(
                name: "Total",
                table: "Compras",
                type: "decimal(10, 2)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_CompraId",
                table: "Produtos",
                column: "CompraId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Compras_CompraId",
                table: "Produtos",
                column: "CompraId",
                principalTable: "Compras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Compras_CompraId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_CompraId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "CompraId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ComprasProdutos");

            migrationBuilder.RenameColumn(
                name: "Total",
                table: "Compras",
                newName: "decimal(10, 2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "decimal(10, 2)",
                table: "Compras",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10, 2)");
        }
    }
}
