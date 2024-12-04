import { api } from '@/app/_utils/api'

export const buyItems = async (token) => {
  const response = await api.post(
    '/transaction/buy',
    {},
    {
      headers: { Authorization: Bearer ${token} }
    }
  )
  return response.data
}

export const supplyStock = async (token) => {
  const response = await api.post(
    '/transaction/supply',
    {},
    {
      headers: { Authorization: Bearer ${token} }
    }
  )
  return response.data
}