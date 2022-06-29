export async function validataTokenUser() {
  const accessToken = window.localStorage.getItem('token')
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      'masterkey': true,
      'Authorization': `Bearer ${accessToken}`
    }, 
  })
  return await res.json()
}
