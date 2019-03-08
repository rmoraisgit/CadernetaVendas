using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Domain.Produtos;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        //private readonly IMapper _mapper;

        //public ProdutosController(IMapper mapper)
        //{
        //    _mapper = mapper;
        //}

        [HttpGet]
        [AllowAnonymous]
        public ProdutoViewModel Get()
        {
            var produto = new Produto("RAFAEL", 10, 10, 10, 10, 10, "AAAAAA", Guid.NewGuid());
            var teste = new ProdutoViewModel { Nome = produto.Nome, Descricao = produto.Descricao };
            return teste;
        }
    }
}