import axios from 'axios'

const handler = async event => {
  const { url = '', method, accessToken = '', data } = JSON.parse(event.body) // `event.body`는 문자이므로 `JSON.parse` 를 해준다
  await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/${url}`,
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      'Authorization': `Bearer ${accessToken}`,
      masterKey: true,
    },
    data
  })
}
export { handler }
