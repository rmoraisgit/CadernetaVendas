using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UMC.CadernetaVendas.Infra.Data.Migrations
{
    public partial class NovoTeste : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(type: "varchar(150)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Compras",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Fornecedor = table.Column<string>(type: "varchar(150)", nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    Total = table.Column<decimal>(type: "decimal(10, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compras", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Enderecos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CEP = table.Column<string>(fixedLength: true, maxLength: 8, nullable: false),
                    Logradouro = table.Column<string>(maxLength: 150, nullable: false),
                    Numero = table.Column<string>(maxLength: 150, nullable: false),
                    Bairro = table.Column<string>(maxLength: 150, nullable: false),
                    Cidade = table.Column<string>(maxLength: 150, nullable: false),
                    Estado = table.Column<string>(maxLength: 150, nullable: false),
                    ClienteId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enderecos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(type: "varchar(150)", nullable: false),
                    CPF = table.Column<string>(type: "varchar(11)", nullable: false),
                    SaldoDevedor = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    Telefone = table.Column<string>(type: "varchar(20)", nullable: false),
                    Celular = table.Column<string>(type: "varchar(20)", nullable: false),
                    Email = table.Column<string>(type: "varchar(150)", nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    EnderecoId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clientes_Enderecos_EnderecoId",
                        column: x => x.EnderecoId,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vendas",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    Total = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    ClienteId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vendas_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Nome = table.Column<string>(type: "varchar(150)", nullable: false),
                    ValorCompra = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    ValorVenda = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    Peso = table.Column<decimal>(type: "numeric(5, 3)", nullable: false),
                    Altura = table.Column<decimal>(type: "decimal(5, 2)", nullable: true),
                    Largura = table.Column<decimal>(type: "decimal(5, 2)", nullable: true),
                    Capacidade = table.Column<decimal>(type: "numeric(5, 3)", nullable: true),
                    Dimensao = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(type: "varchar(300)", nullable: false),
                    Disponivel = table.Column<bool>(nullable: true),
                    Quantidade = table.Column<int>(nullable: true),
                    Foto = table.Column<byte[]>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    CategoriaId = table.Column<Guid>(nullable: false),
                    CompraId = table.Column<Guid>(nullable: true),
                    VendaId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Produtos_Categorias_CategoriaId",
                        column: x => x.CategoriaId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Produtos_Compras_CompraId",
                        column: x => x.CompraId,
                        principalTable: "Compras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Produtos_Vendas_VendaId",
                        column: x => x.VendaId,
                        principalTable: "Vendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ComprasProdutos",
                columns: table => new
                {
                    CompraId = table.Column<Guid>(nullable: false),
                    ProdutoId = table.Column<Guid>(nullable: false),
                    Quantidade = table.Column<int>(nullable: false),
                    ValorUnitario = table.Column<decimal>(nullable: false),
                    ValorFinal = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComprasProdutos", x => new { x.CompraId, x.ProdutoId });
                    table.ForeignKey(
                        name: "FK_ComprasProdutos_Compras_CompraId",
                        column: x => x.CompraId,
                        principalTable: "Compras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComprasProdutos_Produtos_ProdutoId",
                        column: x => x.ProdutoId,
                        principalTable: "Produtos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VendasProdutos",
                columns: table => new
                {
                    VendaId = table.Column<Guid>(nullable: false),
                    ProdutoId = table.Column<Guid>(nullable: false),
                    Quantidade = table.Column<int>(nullable: false),
                    ValorVenda = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    ValorSugerido = table.Column<decimal>(type: "decimal(10, 2)", nullable: false),
                    ValorFinal = table.Column<decimal>(type: "decimal(10, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendasProdutos", x => new { x.VendaId, x.ProdutoId });
                    table.ForeignKey(
                        name: "FK_VendasProdutos_Produtos_ProdutoId",
                        column: x => x.ProdutoId,
                        principalTable: "Produtos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VendasProdutos_Vendas_VendaId",
                        column: x => x.VendaId,
                        principalTable: "Vendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_EnderecoId",
                table: "Clientes",
                column: "EnderecoId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ComprasProdutos_ProdutoId",
                table: "ComprasProdutos",
                column: "ProdutoId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_CategoriaId",
                table: "Produtos",
                column: "CategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_CompraId",
                table: "Produtos",
                column: "CompraId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_VendaId",
                table: "Produtos",
                column: "VendaId");

            migrationBuilder.CreateIndex(
                name: "IX_Vendas_ClienteId",
                table: "Vendas",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_VendasProdutos_ProdutoId",
                table: "VendasProdutos",
                column: "ProdutoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ComprasProdutos");

            migrationBuilder.DropTable(
                name: "VendasProdutos");

            migrationBuilder.DropTable(
                name: "Produtos");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "Compras");

            migrationBuilder.DropTable(
                name: "Vendas");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Enderecos");
        }
    }
}
