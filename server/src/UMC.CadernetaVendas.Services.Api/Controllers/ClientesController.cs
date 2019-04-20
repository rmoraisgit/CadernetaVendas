using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Clientes;
using UMC.CadernetaVendas.Domain.Clientes.Repository;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IClienteService _clienteService;
        private readonly IClienteRepository _clienteRepository;

        public ClientesController(IMapper mapper,
                                  IClienteService clienteService,
                                  IClienteRepository clienteRepository)
        {
            _mapper = mapper;
            _clienteService = clienteService;
            _clienteRepository = clienteRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<ClienteViewModel> Get()
        {
            return _mapper.Map<IEnumerable<ClienteViewModel>>(_clienteRepository.ObterTodos());
        }

        [HttpPost]
        [Route("adicionar")]
        public IActionResult Post(ClienteViewModel clienteViewModel)
        {
            if (!ModelState.IsValid)
            {
                clienteViewModel.Errors = ModelState.Values.SelectMany(v => v.Errors);
                return Response(clienteViewModel);
            }

            var produto = _mapper.Map<Cliente>(clienteViewModel);

            clienteViewModel = _mapper.Map<ClienteViewModel>(_clienteService.Adicionar(produto));

            return Response(clienteViewModel);
        }

        // GET: api/Clientes/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Clientes
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Clientes/5
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
