using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Domain.Produtos.Repository;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProdutosController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProdutoService _produtoService;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IVendaProdutoRepository _vendaProdutoRepository;

        public ProdutosController(IMapper mapper,
                                  IProdutoService produtoService,
                                  IProdutoRepository produtoRepository,
                                  IVendaProdutoRepository vendaProdutoRepository,
                                  INotificador notificador) : base(notificador)
        {
            _mapper = mapper;
            _produtoService = produtoService;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProdutoViewModel>>> ObterTodos()
        {
            return Ok(_mapper.Map<IEnumerable<ProdutoViewModel>>(await _produtoRepository.ObterTodos()));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProdutoViewModel>> ObterPorId(Guid id)
        {
            var produto = await ObterProduto(id);

            if (produto == null) return NotFound();

            produto.vendasProduto.AddRange(_mapper.Map<IEnumerable<VendaProdutoViewModel>>(await _vendaProdutoRepository.ObterVendasProdutoPorId(id)));

            return Ok(produto);
        }

        [HttpPost("adicionar")]
        public async Task<ActionResult<ProdutoViewModel>> Adicionar(ProdutoViewModel produtoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var produto = _mapper.Map<Produto>(produtoViewModel);

            using (var memoryStream = new MemoryStream())
            {
                await produtoViewModel.FormFile.CopyToAsync(memoryStream);
                produto.Foto = memoryStream.ToArray();
            }

            await _produtoService.Adicionar(produto);

            return CustomResponse(produtoViewModel);
        }

        private async Task<ProdutoViewModel> ObterProduto(Guid id)
        {
            return _mapper.Map<ProdutoViewModel>(await _produtoRepository.ObterPorId(id));
        }
    }
}