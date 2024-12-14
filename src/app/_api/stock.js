import { api } from '@/app/_utils/api'
import {
  transformAddProductResponse,
  transformListBrandsResponse,
  transformListCategoriesResponse,
  transformListProductsResponse,
  transformGetProductByIdResponse,
  transformSupplyProductResponse
} from '@/app/_utils/transformers/stockTransformers'

// Función de creación de marca
export const createBrand = async (data, token) => {
  const response = await api.post('/stock/brand/create', data, {
    headers: { Authorization: `${token}` }
  })
  return response.data
}

// Función de creación de categoría
export const createCategory = async (data, token) => {
  const response = await api.post('/stock/category/create', data, {
    headers: { Authorization: `${token}` }
  })
  return response.data
}

// Función de agregar producto
export const addProduct = async (data, token) => {
  const response = await api.post('/stock/product/add', data, {
    headers: { Authorization: `${token}` }
  })
  return transformAddProductResponse(response.data)
}

// Función de listado de marcas
export const listBrands = async (token) => {
  const response = await api.get('/stock/brand/list', {
    headers: { Authorization: `${token}` }
  })
  return transformListBrandsResponse(response.data)
}

// Función de listado de categorías
export const listCategories = async (token) => {
  const response = await api.get('/stock/category/list', {
    headers: { Authorization: `${token}` }
  })
  return transformListCategoriesResponse(response.data)
}

// Función de listado de productos
export const listProducts = async (token) => {
  const response = await api.get('/stock/product/list', {
    headers: { Authorization: `${token}` }
  })
  return transformListProductsResponse(response.data)
}

export const getProductById = async (id, token) => {
  const response = await api.get(`/stock/product/get/${id}`, {
    headers: { Authorization: `${token}` }
  })
  return transformGetProductByIdResponse(response.data)
}

// Función de suministro de producto
export const supplyProduct = async (data, token) => {
  const response = await api.post('/stock/product/supply', data, {
    headers: { Authorization: `${token}` }
  })
  return response.data
}

// Función de comprar producto
export const buyProduct = async (data, token) => {
  try {
    const response = await api.post('/stock/product/buy', data, {
      headers: { Authorization: `${token}` }
    })
    return response.data
  } catch (error) {
    console.log('Error response:', error.response.data.detail)
  }
}
