using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProdutosController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProdutoService _produtoService;

        public ProdutosController(IMapper mapper,
                                  IProdutoService produtoService)
        {
            _mapper = mapper;
            _produtoService = produtoService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ProdutoViewModel Get()
        {
            var produto = new Produto("RAFAEL", 10, 10, 10, 10, 10, "AAAAAA", Guid.NewGuid());
            var teste = _mapper.Map<ProdutoViewModel>(produto);

            return teste;
        }

        [HttpPost]
        //public IActionResult Post([FromBody]ProdutoViewModel produtoViewModel)
        public IActionResult Post()
        {
            var produtoViewModel = new ProdutoViewModel()
            {
                Nome = Request.Form["nome"],
                Valor = Convert.ToDecimal(Request.Form["valor"]),
                Peso = Convert.ToDouble(Request.Form["peso"]),
                Altura = Convert.ToDouble(Request.Form["altura"]),
                Largura = Convert.ToDouble(Request.Form["largura"]),
                Capacidade = Convert.ToDouble(Request.Form["capacidade"]),
                CategoriaId = Guid.Parse(Request.Form["categoriaId"]),
                FormFile = Request.Form.Files[0]
            };

            if (!ModelState.IsValid)
            {
                produtoViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(produtoViewModel);
            }

            var produto = _mapper.Map<Produto>(produtoViewModel);

            produtoViewModel = _mapper.Map<ProdutoViewModel>(_produtoService.Adicionar(produto));

            return Response(produtoViewModel);
        }
    }
}