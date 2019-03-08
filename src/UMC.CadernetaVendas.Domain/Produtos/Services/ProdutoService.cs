﻿using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Core.Notifications;
using UMC.CadernetaVendas.Domain.Interfaces;
using UMC.CadernetaVendas.Domain.Produtos.Repository;

namespace UMC.CadernetaVendas.Domain.Produtos.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IDomainNotificationHandler<DomainNotification> _notifications;
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoService(IDomainNotificationHandler<DomainNotification> notifications,
                              IProdutoRepository produtoRepository)
        {
            _notifications = notifications;
            _produtoRepository = produtoRepository;
        }

        public Produto Adicionar(Produto obj)
        {
            throw new NotImplementedException();
        }

        public Produto Atualizar(Produto obj)
        {
            throw new NotImplementedException();
        }

        public Produto BuscaPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Produto> BuscarTodos()
        {
            throw new NotImplementedException();
        }

        public void Remover(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
