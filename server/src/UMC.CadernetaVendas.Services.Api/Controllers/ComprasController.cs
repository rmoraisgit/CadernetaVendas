﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ICompraService _compraService;
        private readonly ICompraRepository _compraRepository;
        private readonly IProdutoRepository _produtoRepository;

        public ComprasController(IMapper mapper,
                                  ICompraService compraService,
                                  ICompraRepository compraRepository,
                                  IProdutoRepository produtoRepository)
        {
            _mapper = mapper;
            _compraService = compraService;
            _compraRepository = compraRepository;
            _produtoRepository = produtoRepository;
        }

        // GET: api/Compras
        [HttpGet]
        public IEnumerable<CompraViewModel> Get()
        {
            return _mapper.Map<IEnumerable<CompraViewModel>>(_compraRepository.ObterTodos());
        }

        [HttpPost]
        [Route("registrar")]
        public IActionResult Post([FromBody] CompraViewModel compraViewModel)
        {
            if (!ModelState.IsValid)
            {
                compraViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(compraViewModel);
            }

            var compra = _mapper.Map<Compra>(compraViewModel);

            compra.AdicionarProdutos(_mapper.Map<List<CompraProduto>>(compraViewModel.ProdutosCompra));

            compraViewModel = _mapper.Map<CompraViewModel>(_compraService.Registrar(compra));

            return Response(compraViewModel);
        }

        // PUT: api/Compras/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
