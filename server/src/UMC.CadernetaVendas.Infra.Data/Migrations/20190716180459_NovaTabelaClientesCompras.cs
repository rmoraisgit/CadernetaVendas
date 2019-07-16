using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovaTabelaClientesCompras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientesCompras",
                columns: table => new
                {
                    ClienteId = table.Column<Guid>(nullable: false),
                    CompraId = table.Column<Guid>(nullable: false),
                    SaldoDevedorAntes = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    SaldoDevedorDepois = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientesCompras", x => new { x.ClienteId, x.CompraId });
                    table.ForeignKey(
                        name: "FK_ClientesCompras_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientesCompras_Vendas_CompraId",
                        column: x => x.CompraId,
                        principalTable: "Vendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientesCompras_CompraId",
                table: "ClientesCompras",
                column: "CompraId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientesCompras");
        }
    }
}
