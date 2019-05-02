using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Compras;
using UMC.CadernetaVendas.Domain.Compras.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;
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
                                  ICompraRepository compraRepository)
        {
            _mapper = mapper;
            _compraService = compraService;
            _compraRepository = compraRepository;
        }

        // GET: api/Compras
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        [Route("adicionar")]
        public IActionResult Post([FromBody] CompraViewModel compraViewModel)
        {
            if (!ModelState.IsValid)
            {
                compraViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(compraViewModel);
            }

            var compra = _mapper.Map<Compra>(compraViewModel);

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
