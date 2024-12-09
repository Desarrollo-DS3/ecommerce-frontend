import {
  transformCreateBrandResponse,
  transformCreateCategoryResponse,
  transformAddProductResponse,
  transformListBrandsResponse,
  transformListCategoriesResponse,
  transformListProductsResponse,
  transformSupplyProductResponse
} from '@/app/_utils/transformers/stockTransformers'

describe('stockTransformers', () => {
  test('transformCreateBrandResponse: siempre devuelve un objeto válido', () => {
    const response = { brand: { id: 1, name: 'Test Brand' }, message: 'Éxito' }
    const result = transformCreateBrandResponse(response)
    expect(result.success).toBe(true)
    expect(result.brand).toBeTruthy()
  })

  test('transformCreateCategoryResponse: maneja datos faltantes', () => {
    const response = {}
    const result = transformCreateCategoryResponse(response)
    expect(result.success).toBe(true)
    expect(result.category).toBeNull()
  })

  test('transformAddProductResponse: procesa correctamente datos mínimos', () => {
    const response = { product: { id: 1, name: 'Product Test' } }
    const result = transformAddProductResponse(response)
    expect(result.success).toBe(true)
    expect(result.product).toHaveProperty('id')
    expect(result.product).toHaveProperty('name')
  })

  test('transformListBrandsResponse: lista marcas con datos básicos', () => {
    const brands = [
      { id: 1, name: 'Brand 1', description: 'Description 1' },
      { id: 2, name: 'Brand 2' }
    ]
    const result = transformListBrandsResponse(brands)
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('id', 1)
    expect(result[1]).toHaveProperty('description')
  })

  test('transformListCategoriesResponse: lista categorías correctamente', () => {
    const categories = [{ id: 1, name: 'Category 1' }]
    const result = transformListCategoriesResponse(categories)
    expect(result[0]).toHaveProperty('id', 1)
    expect(result[0]).toHaveProperty('description')
  })

  test('transformListProductsResponse: procesa una lista básica de productos', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 100.0,
        stock: 50,
        description: 'Description 1',
        thumbnail: 'thumb1.jpg'
      }
    ]
    const result = transformListProductsResponse(products)
    expect(result[0]).toHaveProperty('id', 1)
    expect(result[0]).toHaveProperty('price', 100.0)
  })

  test('transformSupplyProductResponse: siempre devuelve datos válidos', () => {
    const response = { product: { id: 1, stock: 100 } }
    const result = transformSupplyProductResponse(response)
    expect(result.success).toBe(true)
    expect(result.product).toHaveProperty('stock', 100)
  })
})
