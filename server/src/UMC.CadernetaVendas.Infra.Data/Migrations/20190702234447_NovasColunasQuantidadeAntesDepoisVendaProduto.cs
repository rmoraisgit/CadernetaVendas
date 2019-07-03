using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovasColunasQuantidadeAntesDepoisVendaProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantidadeAntes",
                table: "VendasProdutos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantidadeDepois",
                table: "VendasProdutos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantidadeAntes",
                table: "VendasProdutos");

            migrationBuilder.DropColumn(
                name: "QuantidadeDepois",
                table: "VendasProdutos");
        }
    }
}
