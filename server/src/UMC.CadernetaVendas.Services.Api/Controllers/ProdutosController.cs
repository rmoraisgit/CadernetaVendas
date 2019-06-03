﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProdutosController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProdutoService _produtoService;
        private readonly IProdutoRepository _produtoRepository;

        public ProdutosController(IMapper mapper,
                                  IProdutoService produtoService,
                                  IProdutoRepository produtoRepository)
        {
            _mapper = mapper;
            _produtoService = produtoService;
            _produtoRepository = produtoRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProdutoViewModel>>> Get()
        {
            return Ok(_mapper.Map<IEnumerable<ProdutoViewModel>>(await _produtoRepository.ObterTodos()));
        }

        [HttpPost("adicionar")]
        public ActionResult<ProdutoViewModel> Adicionar()
        {
            var produtoViewModel = new ProdutoViewModel()
            {
                Nome = Request.Form["nome"],
                //Valor = Convert.ToDecimal(Request.Form["valor"]),
                Peso = Convert.ToDouble(Request.Form["peso"]),
                Altura = Convert.ToDouble(Request.Form["altura"]),
                Largura = Convert.ToDouble(Request.Form["largura"]),
                Capacidade = Convert.ToDouble(Request.Form["capacidade"]),
                Descricao = Request.Form["descricao"],
                CategoriaId = Guid.Parse(Request.Form["categoriaId"]),
                FormFile = Request.Form.Files[0]
            };

            if (!ModelState.IsValid)
            {
                produtoViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(produtoViewModel);
            }

            var produto = _mapper.Map<Produto>(produtoViewModel);

            using (var memoryStream = new MemoryStream())
            {
                produtoViewModel.FormFile.CopyToAsync(memoryStream);
                produto.Foto = memoryStream.ToArray();
            }

            produtoViewModel = _mapper.Map<ProdutoViewModel>(_produtoService.Adicionar(produto));

            return Response(produtoViewModel);
        }
    }
}