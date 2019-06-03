using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Vendas;
using UMC.CadernetaVendas.Domain.Vendas.Repository;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendasController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IVendaService _vendaService;
        private readonly IVendaRepository _vendaRepository;

        public VendasController(IMapper mapper,
                                IVendaService vendaService,
                                IVendaRepository vendaRepository)
        {
            _mapper = mapper;
            _vendaService = vendaService;
            _vendaRepository = vendaRepository;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendaViewModel>>> Get()
        {
            return Ok(_mapper.Map<IEnumerable<VendaViewModel>>(await _vendaRepository.ObterTodos()));
        }

        [HttpPost("registrar")]
        public IActionResult Post([FromBody] VendaViewModel vendaViewModel)
        {
            if (!ModelState.IsValid)
            {
                vendaViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(vendaViewModel);
            }

            var venda = _mapper.Map<Venda>(vendaViewModel);

            venda.AdicionarProdutos(_mapper.Map<List<VendaProduto>>(vendaViewModel.ProdutosVenda));

            vendaViewModel = _mapper.Map<VendaViewModel>(_vendaService.Registrar(venda));

            return Response(vendaViewModel);
        }
    }
}