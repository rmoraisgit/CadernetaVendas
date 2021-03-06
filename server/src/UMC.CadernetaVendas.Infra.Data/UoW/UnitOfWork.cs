﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Infra.Data.Context;

namespace UMC.CadernetaVendas.Infra.Data.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CadernetaVendasContext _context;
        private bool _disposable;

        public UnitOfWork(CadernetaVendasContext context)
        {
            _context = context;
            _disposable = false;
        }

        public async Task<int> Commit()
        {
            return await _context.SaveChangesAsync();
        }

        public virtual void Dispose(bool disposed)
        {
            if (!_disposable)
            {
                if (disposed)
                {
                    _context.Dispose();
                }
            }
            _disposable = false;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
