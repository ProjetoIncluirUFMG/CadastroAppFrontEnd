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

export const telefoneFixo = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 2) {
    return `(${somenteNumeros})`;
  }
  if (somenteNumeros.length <= 6) {
    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 6)}`
  }
  if (somenteNumeros.length <= 10) {
    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 6)}-${somenteNumeros.slice(6, 10)}`
  }
}

export const telefoneCelular = value => {
  if (!value) {
    return value
  }

  const somenteNumeros = value.replace(/[^\d]/g, '');

  if (somenteNumeros.length <= 2) {
    return `(${somenteNumeros})`;
  }
  if (somenteNumeros.length <= 7) {
    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 7)}`
  }
  if (somenteNumeros.length <= 11) {
    return `(${somenteNumeros.slice(0, 2)}) ${somenteNumeros.slice(2, 7)}-${somenteNumeros.slice(7, 11)}`
  }
}