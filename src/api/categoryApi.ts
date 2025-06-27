import dummyData from '../assets/dummy-data.json'
import type { Category, CategoryResponse, Pagination } from '../types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function handleFetchCategories(pagination: Pagination): Promise<{ categories: CategoryResponse[]; message: string }> {
  await delay(1000);
  console.log('pagination:', pagination);
  return {
    categories: dummyData.categories,
    message: 'Categories fetched successfully',
  }
}

export async function handleCreateCategory(category: Category): Promise<{ message: string }> {
  await delay(1000);
  if (category.name) {
    return {
      message: 'Category created successfully',
    }
  }
  throw new Error('Something went wrong.');
}
