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
