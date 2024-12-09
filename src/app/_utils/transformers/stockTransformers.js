import { images as img } from '@/app/_config/assets.json'

// src/app/_utils/stockTransformers.js

const DEFAULT_IMAGE = img.unknownPackage
const DEFAULT_THUMBNAIL = img.unknownPackage

// Transformar respuesta de creación de marca
export const transformCreateBrandResponse = (responseData) => {
  return {
    success: true,
    brand: responseData.brand || null,
    message: responseData.message || 'Marca creada exitosamente.'
  }
}

// Transformar respuesta de creación de categoría
export const transformCreateCategoryResponse = (responseData) => {
  return {
    success: true,
    category: responseData.category || null,
    message: responseData.message || 'Categoría creada exitosamente.'
  }
}

// Transformar respuesta de agregar producto
export const transformAddProductResponse = (responseData) => {
  return {
    success: true,
    product: responseData.product
      ? {
          ...responseData.product,
          thumbnail: responseData.product.thumbnail || DEFAULT_THUMBNAIL,
          image: responseData.product.image || DEFAULT_IMAGE
        }
      : null,
    message: responseData.message || 'Producto agregado exitosamente.'
  }
}

// Transformar respuesta de listado de marcas
export const transformListBrandsResponse = (brandsData) => {
  return brandsData.map((brand) => ({
    id: brand.id,
    name: brand.name,
    description: brand.description || ''
  }))
}

// Transformar respuesta de listado de categorías
export const transformListCategoriesResponse = (categoriesData) => {
  return categoriesData.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description || ''
  }))
}

export const transformListProductsResponse = (productsData) => {
  return productsData.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description || 'Descripción no disponible.',
    price: product.price || 0,
    stock: product.stock || 0,
    brand: product.brand
      ? {
          id: product.brand.id,
          name: product.brand.name || 'Marca no especificada',
          description: product.brand.description || ''
        }
      : null,
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name || 'Categoría no especificada',
          description: product.category.description || ''
        }
      : null,
    thumbnail: product.thumbnail || DEFAULT_THUMBNAIL,
    image: product.image || DEFAULT_IMAGE
  }))
}

// Transformar respuesta de suministro de producto
export const transformSupplyProductResponse = (responseData) => {
  return {
    success: true,
    product: responseData.product
      ? {
          ...responseData.product,
          thumbnail: responseData.product.thumbnail || DEFAULT_THUMBNAIL,
          image: responseData.product.image || DEFAULT_IMAGE
        }
      : null,
    message: responseData.message || 'Producto suministrado exitosamente.'
  }
}
