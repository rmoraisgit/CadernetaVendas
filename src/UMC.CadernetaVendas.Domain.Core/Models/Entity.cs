using System;
using System.Collections.Generic;
using System.Text;

namespace UMC.CadernetaVendas.Domain.Core.Models
{
    public abstract class Entity
    {
        public Guid Id { get; protected set; }
    }
}
