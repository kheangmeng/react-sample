import type { Category } from './index'

export interface Product {
  name: string
  description?: string
  categoryId: number | null
  brand?: string
  supplierId?: number | null
  tags?: string[]
  isActive: boolean
  isSellable: boolean
  imageUrl?: string
  taxExempt: boolean
  basePrice?: number
  sku?: string
  barcode?: string
  stockQuantity?: number
  lowStockThreshold?: number
  createdAt: string
  updatedAt: string
}

export interface ProductResponse {
  id: number
  name: string
  description?: string
  category: Category
  brand?: string
  supplierId?: number
  tags?: string[]
  isActive: boolean
  isSellable: boolean
  imageUrl?: string
  taxExempt: boolean
  basePrice?: number
  sku?: string
  barcode?: string
  stockQuantity?: number
  lowStockThreshold?: number
  createdAt: string
  updatedAt: string
}
