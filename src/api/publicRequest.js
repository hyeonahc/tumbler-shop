// 공용 요청
// Public Request function
export async function publicRequest(options) {
  const accessToken = window.localStorage.getItem('token')
  const {url = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
