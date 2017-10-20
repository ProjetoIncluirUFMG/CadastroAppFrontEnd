export const cpf = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 3) {
    return somenteNumeros
  }
  if (somenteNumeros.length <= 7) {
    return `${somenteNumeros.slice(0, 3)}.${somenteNumeros.slice(3)}`
  }
  if (somenteNumeros.length <= 9) {
    return `${somenteNumeros.slice(0, 3)}.${somenteNumeros.slice(3, 6)}.${somenteNumeros.slice(6, 9)}`
  }
  if (somenteNumeros.length <= 11) {
    return `${somenteNumeros.slice(0, 3)}.${somenteNumeros.slice(3, 6)}.${somenteNumeros.slice(6, 9)}-${somenteNumeros.slice(9, 11)}`
  }
}

export const cep = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 5) {
    return somenteNumeros
  }
  if (somenteNumeros.length > 5 && somenteNumeros.length <= 8) {
    return `${somenteNumeros.slice(0, 5)}-${somenteNumeros.slice(5, 8)}`
  }
}

export const telefoneFixo = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 3) {
    return `(${somenteNumeros})`;
  }
  if (somenteNumeros.length <= 7) {
    return `(${somenteNumeros.slice(0, 3)}) ${somenteNumeros.slice(3, 7)}`
  }
  if (somenteNumeros.length <= 11) {
    return `(${somenteNumeros.slice(0, 3)}) ${somenteNumeros.slice(3, 7)}-${somenteNumeros.slice(7, 11)}`
  }
}

export const telefoneCelular = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 3) {
    return `(${somenteNumeros})`;
  }
  if (somenteNumeros.length <= 8) {
    return `(${somenteNumeros.slice(0, 3)}) ${somenteNumeros.slice(3, 8)}`
  }
  if (somenteNumeros.length <= 12) {
    return `(${somenteNumeros.slice(0, 3)}) ${somenteNumeros.slice(3, 8)}-${somenteNumeros.slice(8, 12)}`
  }
}

export const numero = value => {
  if (!value) {
    return value
  }

  return value.replace(/\D/g,'');
}
