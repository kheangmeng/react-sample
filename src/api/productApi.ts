import dummyData from '../assets/dummy-data.json'
import type { Product } from '../types'

export function handleCreate(product: Product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product.name && product.categoryId) {
        resolve({
          message: 'Product created successfully',
          status: 'success',
          code: 201,
        })
      } else {
        reject('Something went wrong.')
      }
    }, 1000)
  })
}

export function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: dummyData.products,
        status: 'success',
        code: 200,
      })
    }, 1000)
  })
}
