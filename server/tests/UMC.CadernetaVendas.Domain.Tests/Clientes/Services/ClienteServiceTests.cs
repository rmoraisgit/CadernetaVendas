using System;
using System.Collections.Generic;
using System.Text;
using UMC.CadernetaVendas.Domain.Clientes;
using Xunit;

namespace UMC.CadernetaVendas.Domain.Tests.Clientes.Services
{
    public class ClienteServiceTests
    {
        [Fact]
        public void Cliente_NovoCliente_DeveEstarValido()
        {
            // Arrange
            var cliente = new Cliente(
                "Rafael",
                "42082688836",
                "1136879067",
                "11948309548",
                "rafamorais.br@live.com",
                true, 
                new Endereco(
                    "06290050",
                    "Rua Francisco Haro Alaminos",
                    "390",
                    "Vila Ayrosa",
                    "Osasco",
                    "São Paulo"));

            // Act
            var resultado = cliente.EhValido();

            // Assert
            Assert.True(resultado);
            Assert.Equal(0, cliente.ValidationResult.Errors.Count);
        }
    }
}
