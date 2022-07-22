import { publicRequest } from '~/api/publicRequest'

export async function validateTokenUser() {
  return new Promise(resolve => {
    publicRequest({
      url: 'auth/me',
      method: 'POST'
    })
      .then(res => resolve(res))
      .catch(() => resolve(null))
  })
  
}
