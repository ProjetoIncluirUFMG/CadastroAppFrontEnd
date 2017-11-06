import moment from 'moment';

export const obrigatorio = valorDoCampo => valorDoCampo ? undefined : 'Este campo é obrigatório';
export const valorMaximoDeCaracteres = max => valorDoCampo => {
	return valorDoCampo && valorDoCampo.length > max ? `Este campo deve conter no máximo ${max} caracteres ou menos` : undefined;
};
export const valorMinimoDeCaracteres = min => valorDoCampo => {
	return valorDoCampo && valorDoCampo.length < min ? `Este campo deve ter no mínimo ${min} caracteres` : undefined;
};

export const numero = valorDoCampo => valorDoCampo && isNaN(Number(valorDoCampo)) ? 'Este campo deve ser um número' : undefined;

export const telefoneFixo = valorDoCampo => {
    return valorDoCampo && valorDoCampo.length < 14 ? `Telefone fixo incompleto` : undefined;
};

export const telefoneCelular = valorDoCampo => {
    return valorDoCampo && valorDoCampo.length < 15 ? `Telefone celular incompleto` : undefined;
};

export const sexo = (sexo, componente) => {
    return true ? `Telefone celular incompleto` : undefined;
};

export const email = valorDoCampo => {
	return valorDoCampo && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valorDoCampo) ?
  'Endereço de email inválido' : undefined;
};
export const confirmacaoDeSenha = (senha, componente) =>
  componente.senha !== componente.confirmarSenha ? 'Senha de confirmação inválida' : undefined;

export const dataDeNascimento = valorDoCampo => {
    return valorDoCampo && (valorDoCampo.length < 10 || moment() < moment(valorDoCampo, 'DD/MM/YYYY')) ? `Data de nascimento inválida` : undefined;
};

export const cpf = valorDoCampo => !CPFValido(valorDoCampo) ? 'CPF inválido' : undefined;

export const cep = valorDoCampo => !CEPValido(valorDoCampo) ? 'CEP inválido' : undefined;

// Verifica se CPF é válido
// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
const CPFValido = (strCPF) => {

    // Verifica se campo cep possui valor informado.
    if (strCPF === "" || strCPF === null || strCPF === undefined) return false;

    strCPF = strCPF.replace(/\./g, '').replace(/-/g, '');

    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF === '' || strCPF === undefined || strCPF === null) return false;

	if (strCPF === "00000000000") return false;

	for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i), 10) * (11 - i);
	Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10), 10) ) return false;

	Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11) , 10)) return false;
    return true;
}

// Verifica se CEP é válido
const CEPValido = (strCEP) => {

    // Verifica se campo cep possui valor informado.
    if (strCEP === "" || strCEP === null || strCEP === undefined) return false;

    // Nova variável "cep" somente com dígitos.
    var cep = strCEP.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep === "" || cep === null || cep === undefined) return false;

    // Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    // Valida o formato do CEP.
    return validacep.test(cep);
}
