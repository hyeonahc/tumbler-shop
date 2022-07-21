// 공용 요청 원래 버전
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
      'Authorization': `Bearer ${accessToken}`,
      masterKey: true,
    },
    body: JSON.stringify(body)
  })
  return res.json()
}

// 공용 요청 서버리스 버전
// Public Request function
// export async function publicRequest(options) {
//   const accessToken = window.localStorage.getItem('token')
//   const { url, method, body: data } = options
//   // 도메인/.netlify/functions/publicRequest // 여기서 도메인 부분은 생략 가능
//   const res = await fetch('.netlify/functions/publicRequest', {
//     method: 'POST', // 서버로 날리는 요청이므로 `POST`로 날려야 `body`가 들어간다! 서버로 전송하는 코드는 `POST`
//     body: JSON.stringify({
//       url,
//       method,
//       accessToken,
//       data
//     })
//   })
//   return res.json()
// }
