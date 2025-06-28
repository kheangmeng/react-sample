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

export async function handleCreateCategory(category: Category): Promise<{ category: CategoryResponse, message: string }> {
  await delay(1000);
  if (category.name) {
    return {
      category: {
        id: Math.floor(Math.random() * 1000),
        name: category.name,
        parentCategoryId: category.parentCategoryId,
        description: category.description,
        isActive: category.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'Category created successfully',
    }
  }
  throw new Error('Something went wrong.');
}
