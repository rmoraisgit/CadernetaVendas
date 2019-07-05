using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovasColunasQuantidadeAntesDpoisComprasProduto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantidadeAntes",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantidadeDepois",
                table: "ComprasProdutos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantidadeAntes",
                table: "ComprasProdutos");

            migrationBuilder.DropColumn(
                name: "QuantidadeDepois",
                table: "ComprasProdutos");
        }
    }
}
