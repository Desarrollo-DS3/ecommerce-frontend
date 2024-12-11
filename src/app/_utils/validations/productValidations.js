const maxNameLength = 50
const maxDescriptionLength = 120
const maxPriceDigitsLength = 3
const maxStockDigitsLength = 3

export const validateProductName = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El nombre del producto no puede estar vacío.'
  }
  if (value.length > maxNameLength) {
    return `El nombre del producto no puede tener más de ${maxNameLength} caracteres.`
  }
  return ''
}

export const validateProductDescription = (value) => {
  if (!value || value.trim().length === 0) {
    return 'La descripción del producto no puede estar vacía.'
  }
  if (value.length > maxDescriptionLength) {
    return `La descripción del producto no puede tener más de ${maxDescriptionLength} caracteres.`
  }
  return ''
}

export const validateProductPrice = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El precio del producto no puede estar vacío.'
  }
  if (value.length > maxPriceDigitsLength) {
    return `El precio del producto no puede tener más de ${maxPriceDigitsLength} caracteres.`
  }
  return ''
}

export const validateProductStock = (value) => {
  if (!value || value.trim().length === 0) {
    return 'El stock del producto no puede estar vacío.'
  }
  if (value.length > maxStockDigitsLength) {
    return `El stock del producto no puede tener más de ${maxStockDigitsLength} caracteres.`
  }
  return ''
}
