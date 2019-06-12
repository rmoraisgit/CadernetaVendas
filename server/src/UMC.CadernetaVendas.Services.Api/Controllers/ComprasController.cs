using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
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

        public ComprasController(IMapper mapper,
                                  ICompraService compraService,
                                  ICompraRepository compraRepository,
                                  INotificador notificador) : base(notificador)
        {
            _mapper = mapper;
            _compraService = compraService;
            _compraRepository = compraRepository;
        }

        // GET: api/Compras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompraViewModel>>> Get()
        {
            return Ok(_mapper.Map<IEnumerable<CompraViewModel>>(await _compraRepository.ObterTodos()));
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<CompraViewModel>> Registrar([FromBody] CompraViewModel compraViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var compra = _mapper.Map<Compra>(compraViewModel);

            compra.AdicionarProdutos(_mapper.Map<List<CompraProduto>>(compraViewModel.ProdutosCompra));

            await _compraService.Registrar(compra);

            return CustomResponse(compraViewModel);
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
