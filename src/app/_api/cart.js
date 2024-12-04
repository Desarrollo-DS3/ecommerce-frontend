import { api } from '@/app/_utils/api'

export const addItemToCart = async (data, token) => {
  const response = await api.post('/cart/add', data, {
    headers: { Authorization: Bearer ${token} }
  })
  return response.data
}

export const removeItemFromCart = async (data, token) => {
  const response = await api.post('/cart/remove', data, {
    headers: { Authorization: Bearer ${token} }
  })
  return response.data
}

export const listCartItems = async (token) => {
  const response = await api.get('/cart/list', {
    headers: { Authorization: Bearer ${token} }
  })
  return response.data
}