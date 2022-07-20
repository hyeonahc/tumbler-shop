const axios = require('axios')

exports.handler = async function handler(event) {
  console.log(event.body)
  console.log('들어옴')
  const { url = '', method = '', accessToken = '', data = '' } = JSON.parse(event.body) // `event.body`는 문자이므로 `JSON.parse` 를 해준다

  try {
    const { data: returnValue } = await axios({
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
    if (returnValue.Error) {
      return {
        statusCode: 400,
        body: returnValue.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(returnValue)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}
