using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class CampoValorTotalMaisSemantico : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Valor",
                table: "Pagamentos",
                newName: "ValorTotal");

            migrationBuilder.RenameColumn(
                name: "ValorTotalCompra",
                table: "ClientesCompras",
                newName: "ValorTotal");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ValorTotal",
                table: "Pagamentos",
                newName: "Valor");

            migrationBuilder.RenameColumn(
                name: "ValorTotal",
                table: "ClientesCompras",
                newName: "ValorTotalCompra");
        }
    }
}
