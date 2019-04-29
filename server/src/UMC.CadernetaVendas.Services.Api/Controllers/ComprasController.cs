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

        // GET: api/Compras/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Compras
        [HttpPost]
        [Route("adicionar")]
        public void Post([FromBody] CompraViewModel compraViewModel)
        {
            var a = 0;

            var compra = new Compra(compraViewModel.Fornecedor, compraViewModel.Total);
            compra.AtribuirIdsProdutos(compraViewModel.IdsProdutos);
       
            _compraService.Registrar(compra);
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
