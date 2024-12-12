import { api } from '@/app/_utils/api'
import {
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
  return response.data
}

// Función de creación de categoría
export const createCategory = async (data, token) => {
  console.log('Making request to create category using token:', token)
  const response = await api.post('/stock/category/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Función de agregar producto
export const addProduct = async (data, token) => {
  console.log('Making request to add product using token:', token)
  const response = await api.post('/stock/product/add', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformAddProductResponse(response.data)
}

// Función de listado de marcas
export const listBrands = async (token) => {
  console.log('Making request to list brands using token:', token)
  const response = await api.get('/stock/brand/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListBrandsResponse(response.data)
}

// Función de listado de categorías
export const listCategories = async (token) => {
  const response = await api.get('/stock/category/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListCategoriesResponse(response.data)
}

// Función de listado de productos
export const listProducts = async (token) => {
  const response = await api.get('/stock/product/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return transformListProductsResponse(response.data)
}

// Use listProducts() and get a product by id, if doesn't exist, return null
export const getProductById = async (id, token) => {
  const products = await listProducts(token)
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
