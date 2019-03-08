using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Services.Api.ViewModels
{
    public abstract class BaseViewModel
    {
        protected BaseViewModel()
        {
            Id = Guid.NewGuid();
        }
        
        [Key]
        public Guid Id { get; set; }
        public FluentValidation.Results.ValidationResult ValidationResult { get; set; }
        public IEnumerable<ModelError> Erros { get; set; }
    }
}
