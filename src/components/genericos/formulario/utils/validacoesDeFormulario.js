export const obrigatorio = valorDoCampo => valorDoCampo ? undefined : 'Este campo é obrigatório';
export const valorMaximoDeCaracteres = max => valorDoCampo => {
	return valorDoCampo && valorDoCampo.length > max ? `Este campo deve conter no máximo ${max} caracteres ou menos` : undefined;
};
export const valorMinimoDeCaracteres = min => valorDoCampo => { 
	return valorDoCampo && valorDoCampo.length < min ? `Este campo deve ter no mínimo ${min} caracteres` : undefined;
};

export const numero = valorDoCampo => valorDoCampo && isNaN(Number(valorDoCampo)) ? 'Este campo deve ser um número' : undefined;

export const email = valorDoCampo => {
	return valorDoCampo && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valorDoCampo) ?
  'Endereço de email inválido' : undefined
};
export const confirmacaoDeSenha = (senha, componente) => 
  componente.senha !== componente.confirmarSenha ? 'Senha de confirmação inválida' : undefined;

export const cpf = valorDoCampo => !CPFValido(valorDoCampo) ? 'CPF inválido' : undefined;

// Verifica se CPF é válido
// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
const CPFValido = (strCPF) => {
    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF === '' || strCPF === undefined || strCPF === null) return false;

	if (strCPF == "00000000000") return false;
    
	for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	
	Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}
