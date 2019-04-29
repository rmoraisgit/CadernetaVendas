using System;
using System.Collections.Generic;
using System.Text;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        void Commit();
    }
}
