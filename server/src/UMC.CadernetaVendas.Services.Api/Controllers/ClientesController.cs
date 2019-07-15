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
using UMC.CadernetaVendas.Domain.Core.Notificacoes;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Services.Api.Extensions;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ClientesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IClienteService _clienteService;
        private readonly IClienteRepository _clienteRepository;

        public ClientesController(IMapper mapper,
                                  IClienteService clienteService,
                                  IClienteRepository clienteRepository,
                                  INotificador notificador) : base(notificador)
        {
            _mapper = mapper;
            _clienteService = clienteService;
            _clienteRepository = clienteRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteViewModel>>> ObterTodos()
        {
            return Ok(_mapper.Map<IEnumerable<ClienteViewModel>>(await _clienteRepository.ObterTodos()));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ClienteViewModel>> ObterPorId(Guid id)
        {
            var cliente = await ObterClienteEndereco(id);

            if (cliente == null) return NotFound();

            return Ok(cliente);
        }

        [HttpPost("adicionar")]
        public async Task<ActionResult<ClienteViewModel>> Post([FromBody]ClienteViewModel clienteViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var cliente = _mapper.Map<Cliente>(clienteViewModel);
            cliente.AtribuirEndereco(_mapper.Map<Endereco>(clienteViewModel.Endereco));

            await _clienteService.Adicionar(cliente);

            return CustomResponse(clienteViewModel);
        }

        [ClaimsAuthorize("Cliente", "Atualizar")]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ClienteViewModel>> Atualizar(Guid id, [FromBody]ClienteViewModel clienteViewModel)
        {
            if (id != clienteViewModel.Id)
            {
                NotificarErro("O id informado não é o mesmo que foi passado na query");
                return CustomResponse(clienteViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _clienteService.Atualizar(_mapper.Map<Cliente>(clienteViewModel));

            return CustomResponse(clienteViewModel);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private async Task<ClienteViewModel> ObterClienteEndereco(Guid id)
        {
            return _mapper.Map<ClienteViewModel>(await _clienteRepository.ObterPorId(id));
        }
    }
}
