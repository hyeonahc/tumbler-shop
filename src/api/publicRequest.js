// 공용 요청
// Public Request function
export async function publicRequest(options) {
  const accessToken = window.localStorage.getItem('token')
  const { url = '', method, body } = options
  
  // 도메인/.netlify/functions/publicRequest.js // 여기서 도메인 부분은 생략 가능
  const res = await fetch('.netlify/functions/publicRequest.js', {
    method: 'POST', // 서버로 날리는 요청이므로 `POST`로 날려야 `body`가 들어간다! 서버로 전송하는 코드는 `POST`
    body: JSON.stringify({
      url,
      method,
      accessToken,
      data: body
    })
  })
  return res.json()
}
