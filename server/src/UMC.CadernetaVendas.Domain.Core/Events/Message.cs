using System;
using System.Collections.Generic;
using System.Text;

namespace UMC.CadernetaVendas.Domain.Core.Events
{
    public abstract class Message
    {
        public Guid AggregateId { get; protected set; }
        public string MessageType { get; protected set; }

        protected Message()
        {
            MessageType = GetType().Name;
        }
    }
}
