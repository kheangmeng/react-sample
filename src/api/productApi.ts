import dummyData from '../assets/dummy-data.json'
import type { Product, ProductList, Pagination } from '../types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function handleFetchProducts(pagination: Pagination): Promise<{ products: ProductList[]; message: string }> {
  await delay(1000);
  console.log('pagination:', pagination);
  return {
    products: dummyData.products,
    message: 'Products fetched successfully',
  }
}

export async function handleCreateProduct(product: Product): Promise<{ message: string }> {
  await delay(1000);
  if (product.name && product.categoryId) {
    return {
      message: 'Product created successfully',
    }
  }
  throw new Error('Something went wrong.');
}
