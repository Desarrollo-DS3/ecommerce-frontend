import { api } from '@/app/_utils/api'
import {
  transformCreateBrandResponse,
  transformCreateCategoryResponse,
  transformAddProductResponse,
  transformListBrandsResponse,
  transformListCategoriesResponse,
  transformListProductsResponse,
  transformSupplyProductResponse
} from '@/app/_utils/transformers/stockTransformers'

// Función de creación de marca
export const createBrand = async (data, token) => {
  const response = await api.post('/stock/brand/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformCreateBrandResponse(response.data)
}

// Función de creación de categoría
export const createCategory = async (data, token) => {
  const response = await api.post('/stock/category/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformCreateCategoryResponse(response.data)
}

// Función de agregar producto
export const addProduct = async (data, token) => {
  const response = await api.post('/stock/product/add', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformAddProductResponse(response.data)
}

// Función de listado de marcas
export const listBrands = async (token) => {
  const response = await api.get('/stock/brand/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListBrandsResponse(response.data)
}

// Función de carga de marcas (mock)
export const loadBrands = async () => {
  const module = await import('@/../public/mocks/brands.json')
  return transformListBrandsResponse(module.brands)
}

// Función de listado de categorías
export const listCategories = async (token) => {
  const response = await api.get('/stock/category/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListCategoriesResponse(response.data)
}

// Función de carga de categorías (mock)
export const loadCategories = async () => {
  const module = await import('@/../public/mocks/categories.json')
  return transformListCategoriesResponse(module.categories)
}

// Función de listado de productos
export const listProducts = async (token) => {
  const response = await api.get('/stock/product/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListProductsResponse(response.data)
}

// Función de carga de productos (mock)
export const loadProducts = async () => {
  const module = await import('@/../public/mocks/products.json')
  return transformListProductsResponse(module.products)
}

// Implementar del mock
export const loadProductById = async (id) => {
  const products = await loadProducts()
  const productId = Number(id)
  return products.find((product) => product.id === productId)
}

// Función de suministro de producto
export const supplyProduct = async (data, token) => {
  const response = await api.post('/stock/product/supply', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformSupplyProductResponse(response.data)
}
