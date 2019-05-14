using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovasColunasCompraProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ValorFinal",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ValorUnitario",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValorFinal",
                table: "ComprasProdutos");

            migrationBuilder.DropColumn(
                name: "ValorUnitario",
                table: "ComprasProdutos");
        }
    }
}
