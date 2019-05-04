export const validationMessagesCompra = {
    fornecedor: {
      required: 'O nome do fornecedor é requerido',
      minlength: 'O nome do fornecedor precisa ter no mínimo 2 caracteres',
      maxlength: 'O nome do fornecedor precisa ter no máximo 150 caracteres'
    },
    // valor: {
    //   required: 'O preço é requerido',
    //   maxValorMoeda: 'O valor máximo de um novo produto é de R$50.000,00'
    // },
    peso: {
      required: 'O peso é requerido',
      minlength: 'A descrição precisa ter no mínimo 10 caracteres',
      maxlength: 'A descrição precisa ter no mínimo 300 caracteres'
    },
    descricao: {
      required: 'A descrição é requerida',
      minlength: 'A descrição precisa ter no mínimo 10 caracteres',
      maxlength: 'A descrição precisa ter no mínimo 300 caracteres'
    }
  }