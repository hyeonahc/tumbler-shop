export async function request(options) {
  const {url = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      masterKey: true,
    },
    body: JSON.stringify(body)
  })
    return await res.json()
}
