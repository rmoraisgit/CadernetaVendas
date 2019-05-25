using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class CorrecaoDeRelacionamentoVendaClientes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clientes_Vendas_VendaId",
                table: "Clientes");

            migrationBuilder.DropTable(
                name: "VendasClientes");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_VendaId",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "VendaId",
                table: "Clientes");

            migrationBuilder.AddColumn<Guid>(
                name: "ClienteId",
                table: "Vendas",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Vendas_ClienteId",
                table: "Vendas",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Clientes_ClienteId",
                table: "Vendas",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Clientes_ClienteId",
                table: "Vendas");

            migrationBuilder.DropIndex(
                name: "IX_Vendas_ClienteId",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Vendas");

            migrationBuilder.AddColumn<Guid>(
                name: "VendaId",
                table: "Clientes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "VendasClientes",
                columns: table => new
                {
                    VendaId = table.Column<Guid>(nullable: false),
                    ClienteId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendasClientes", x => new { x.VendaId, x.ClienteId });
                    table.ForeignKey(
                        name: "FK_VendasClientes_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VendasClientes_Vendas_VendaId",
                        column: x => x.VendaId,
                        principalTable: "Vendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_VendaId",
                table: "Clientes",
                column: "VendaId");

            migrationBuilder.CreateIndex(
                name: "IX_VendasClientes_ClienteId",
                table: "VendasClientes",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clientes_Vendas_VendaId",
                table: "Clientes",
                column: "VendaId",
                principalTable: "Vendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
