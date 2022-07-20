import { publicRequest } from '~/api/publicRequest'

export async function validateTokenUser() {
  const res = await publicRequest({
    url: 'auth/me',
    method: 'POST'
  })
  return res
}
