export interface Category {
  name: string
  parentCategoryId?: number
  description?: string
  isActive: boolean
}
export interface CategoryResponse {
  id: number
  name: string
  parentCategoryId?: number
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryState {
  category: Category | null;
  categories: CategoryResponse[];
  isLoading: boolean;
  error: string | null;
  statusMessage: string | null;
}
