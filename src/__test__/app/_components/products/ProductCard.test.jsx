import { render, screen } from '@testing-library/react'
import ProductCard from '@/app/_components/products/ProductCard'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    thumbnail: '/test-thumbnail.jpg',
    category: { name: 'Category 1' },
    price: 100
  }

  test('debería renderizar correctamente la información del producto', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()

    const img = screen.getByAltText('Test Product')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-thumbnail.jpg')
  })

  test('debería contener el enlace al producto', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link', { name: /Test Product/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/product/1')
  })
})
