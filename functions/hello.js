exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Hee',
      age: '85'
    }) // 문자데이터만 할당이 가능, 객체를 넣기 위해 JSON.stringfy 사용
  }
}
