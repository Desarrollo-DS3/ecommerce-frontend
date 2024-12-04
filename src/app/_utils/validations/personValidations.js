// ========= EMAIL
const maxEmailLength = 30
// ========= PASSWORD
const minPasswordLength = 10
const maxPasswordLength = 18
// ========= PERSONAL DOCUMENT
const minDocumentLength = 8
const maxDocumentLength = 11
// ========= PHONE
const phoneLength = 10
// ========= NAMES
const maxNameLength = 50

export const validateEmail = (value) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (value.length > maxEmailLength) {
    return `El correo electrónico no puede tener más de ${maxEmailLength} caracteres.`
  }
  return emailPattern.test(value) ? '' : 'Formato de correo inválido'
}

export const validatePassword = (value) => {
  if (value.length >= minPasswordLength && value.length <= maxPasswordLength) {
    return ''
  }
  return `La contraseña debe tener entre ${minPasswordLength} y ${maxPasswordLength} caracteres.`
}

export const validateDocument = (value) => {
  const documentPattern = /^\d+$/
  if (!documentPattern.test(value)) {
    return 'El documento de identidad solo puede contener números.'
  }
  if (value.length < minDocumentLength || value.length > maxDocumentLength) {
    return `El documento de identidad debe tener entre ${minDocumentLength} y ${maxDocumentLength} dígitos.`
  }
  return ''
}

export const validatePhone = (value) => {
  const phonePattern = /^\d+$/
  if (!phonePattern.test(value)) {
    return 'El número de celular solo puede contener números.'
  }
  if (value.length !== phoneLength) {
    return `El número de celular debe tener exactamente ${phoneLength} dígitos.`
  }
  return ''
}

export const validateName = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El nombre no puede estar vacío.'
  }
  if (value.length > maxNameLength) {
    return `El nombre no puede tener más de ${maxNameLength} caracteres.`
  }
  return ''
}

export const validateLastName = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El apellido no puede estar vacío.'
  }
  if (value.length > maxNameLength) {
    return `El apellido no puede tener más de ${maxNameLength} caracteres.`
  }
  return ''
}
