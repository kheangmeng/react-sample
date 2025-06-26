import type { Login, LoginResponse } from '../types'

export function handleLogin(login: Login) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login.email === 'vue.sample@gmail.com' && login.password === 'secret') {
        resolve({
          message: 'login success',
          token: 'token123',
        })
      } else {
        reject('Invalid email or password.')
      }
    }, 1000)
  })
}

export function mapResponse(data: unknown): LoginResponse {
  return {
    token: data?.token,
  }
}
