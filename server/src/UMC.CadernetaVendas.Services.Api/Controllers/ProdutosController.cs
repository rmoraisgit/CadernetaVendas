using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Compras.Repository;
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
        private readonly ICompraProdutoRepository _compraProdutoRepository;

        public ProdutosController(IMapper mapper,
                                  IProdutoService produtoService,
                                  IProdutoRepository produtoRepository,
                                  IVendaProdutoRepository vendaProdutoRepository,
                                  ICompraProdutoRepository compraProdutoRepository,
                                  INotificador notificador) : base(notificador)
        {
            _mapper = mapper;
            _produtoService = produtoService;
            _produtoRepository = produtoRepository;
            _vendaProdutoRepository = vendaProdutoRepository;
            _compraProdutoRepository = compraProdutoRepository;
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

            produto.kardex.AddRange(_mapper.Map<IEnumerable<KardexProdutoViewModel>>(await _vendaProdutoRepository.ObterVendasProdutoPorId(id)));
            produto.kardex.AddRange(_mapper.Map<IEnumerable<KardexProdutoViewModel>>(await _compraProdutoRepository.ObterComprasProdutoPorId(id)));

            produto.kardex = produto.kardex.OrderByDescending(k => k.DataCadastro).ToList();

            return Ok(produto);
        }

        [HttpPost("adicionar")]
        public async Task<ActionResult<ProdutoViewModel>> Adicionar(ProdutoViewModel produtoViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var produto = _mapper.Map<Produto>(produtoViewModel);

            if(!await UploadArquivo(produtoViewModel.FormFile, produto))
            {
                return CustomResponse(ModelState);
            }

            await _produtoService.Adicionar(produto);

            return CustomResponse(produtoViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ProdutoViewModel>> Atualizar(Guid id, ProdutoViewModel produtoViewModel)
        {
            if (id != produtoViewModel.Id)
            {
                NotificarErro("O id informado não é o mesmo que foi passado na query");
                return CustomResponse(produtoViewModel);

            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _produtoService.Atualizar(_mapper.Map<Produto>(produtoViewModel));

            return CustomResponse(produtoViewModel);
        }

        private async Task<ProdutoViewModel> ObterProduto(Guid id)
        {
            return _mapper.Map<ProdutoViewModel>(await _produtoRepository.ObterPorId(id));
        }

        private async Task<bool> UploadArquivo(IFormFile file, Produto produto)
        {
            if (file == null || file.Length == 0)
            {
                NotificarErro("Forneça uma imagem para este produto!");
                return false;
            }

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                produto.Foto = memoryStream.ToArray();
            }

            return true;
        }
    }
}