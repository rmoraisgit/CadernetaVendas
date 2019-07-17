using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class CorrecaoNomeColunaTabelaClientesCompras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "valorTotalCompra",
                table: "ClientesCompras",
                newName: "ValorTotalCompra");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ValorTotalCompra",
                table: "ClientesCompras",
                newName: "valorTotalCompra");
        }
    }
}
