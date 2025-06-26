import dummyData from '../assets/dummy-data.json'
import type { Category } from '../types'

export function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: dummyData.categories,
        status: 'success',
        code: 200,
      })
    }, 1000)
  })
}

export function handleCreate(category: Category) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (category.name) {
        resolve({
          message: 'Category created successfully',
          status: 'success',
          code: 201,
        })
      } else {
        reject('Something went wrong.')
      }
    }, 1000)
  })
}
