using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UMC.CadernetaVendas.Services.Api.ViewModels;

namespace UMC.CadernetaVendas.Services.Api.Controllers
{
    [Produces("application/json")]
    public abstract class BaseController : ControllerBase
    {
        protected new IActionResult Response<T>(T ViewModel = null) where T : BaseViewModel
        {
            if (ViewModel.Errors?.Count() > 0)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = ViewModel.Errors
                });
            }

            if (!ViewModel.ValidationResult.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = ViewModel.ValidationResult.Errors
                });
            }

            return Ok(new
            {
                success = true,
                data = ViewModel
            });
        }
    }
}