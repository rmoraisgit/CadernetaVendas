using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace UMC.CadernetaVendas.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> Commit();
    }
}
