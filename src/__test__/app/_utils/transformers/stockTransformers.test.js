import {
  transformCreateBrandResponse,
  transformCreateCategoryResponse,
  transformAddProductResponse,
  transformListBrandsResponse,
  transformListCategoriesResponse,
  transformListProductsResponse,
  transformSupplyProductResponse
} from '../../../../app/_utils/transformers/stockTransformers'

describe('stockTransformers', () => {
  test('transformCreateBrandResponse: transforma correctamente la respuesta', () => {
    const response = { brand: { id: 1, name: 'Test Brand' }, message: 'Éxito' }
    const result = transformCreateBrandResponse(response)
    expect(result).toEqual({
      success: true,
      brand: { id: 1, name: 'Test Brand' },
      message: 'Éxito'
    })
  })

  test('transformCreateCategoryResponse: usa valores por defecto cuando faltan datos', () => {
    const response = {}
    const result = transformCreateCategoryResponse(response)
    expect(result).toEqual({
      success: true,
      category: null,
      message: 'Categoría creada exitosamente.'
    })
  })

  test('transformAddProductResponse: transforma correctamente la respuesta', () => {
    const response = { product: { id: 1, name: 'Product Test' } }
    const result = transformAddProductResponse(response)
    expect(result).toEqual({
      success: true,
      product: { id: 1, name: 'Product Test' },
      message: 'Producto agregado exitosamente.'
    })
  })

  test('transformListBrandsResponse: transforma correctamente la lista de marcas', () => {
    const brands = [
      { id: 1, name: 'Brand 1', description: 'Description 1' },
      { id: 2, name: 'Brand 2' }
    ]
    const result = transformListBrandsResponse(brands)
    expect(result).toEqual([
      { id: 1, name: 'Brand 1', description: 'Description 1' },
      { id: 2, name: 'Brand 2', description: '' }
    ])
  })

  test('transformListCategoriesResponse: transforma correctamente la lista de categorías', () => {
    const categories = [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2' }
    ]
    const result = transformListCategoriesResponse(categories)
    expect(result).toEqual([
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: '' }
    ])
  })

  test('transformListProductsResponse: transforma correctamente la lista de productos', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        categoryId: 101,
        brand_id: 201,
        price: 100.0,
        stock: 50,
        description: 'Description 1',
        thumbnail: 'thumb1.jpg',
        image: 'image1.jpg'
      }
    ]
    const result = transformListProductsResponse(products)
    expect(result).toEqual([
      {
        id: 1,
        name: 'Product 1',
        categoryId: 101,
        brandId: 201,
        price: 100.0,
        stock: 50,
        description: 'Description 1',
        thumbnail: 'thumb1.jpg',
        image: 'image1.jpg'
      }
    ])
  })

  test('transformSupplyProductResponse: transforma correctamente la respuesta', () => {
    const response = {
      product: { id: 1, stock: 100 },
      message: 'Stock actualizado'
    }
    const result = transformSupplyProductResponse(response)
    expect(result).toEqual({
      success: true,
      product: { id: 1, stock: 100 },
      message: 'Stock actualizado'
    })
  })
})
