const maxBrandNameLength = 50
const maxBrandDescriptionLength = 120

export const validateBrandName = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El nombre del marca no puede estar vacío.'
  }
  if (value.length > maxBrandNameLength) {
    return `El nombre del marca no puede tener más de ${maxBrandNameLength} caracteres.`
  }
  return ''
}

export const validateBrandDescription = (value) => {
  if (!value || value.trim().length === 0) {
    return 'La descripción del marca no puede estar vacía.'
  }
  if (value.length > maxBrandDescriptionLength) {
    return `La descripción del marca no puede tener más de ${maxBrandDescriptionLength} caracteres.`
  }
  return ''
}
