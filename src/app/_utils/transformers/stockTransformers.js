// src/app/_utils/stockTransformers.js

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
    product: responseData.product || null,
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

// Transformar respuesta de listado de productos
export const transformListProductsResponse = (productsData) => {
  return productsData.map((product) => ({
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    brandId: product.brand_id,
    price: product.price,
    stock: product.stock,
    description: product.description,
    thumbnail: product.thumbnail,
    image: product.image
  }))
}

// Transformar respuesta de suministro de producto
export const transformSupplyProductResponse = (responseData) => {
  return {
    success: true,
    product: responseData.product || null,
    message: responseData.message || 'Producto suministrado exitosamente.'
  }
}
