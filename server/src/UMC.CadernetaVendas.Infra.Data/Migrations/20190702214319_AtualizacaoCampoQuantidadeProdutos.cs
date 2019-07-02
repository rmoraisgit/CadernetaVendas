using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class AtualizacaoCampoQuantidadeProdutos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Quantidade",
                table: "Produtos",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Quantidade",
                table: "Produtos",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
