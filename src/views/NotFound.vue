<template>
  <div class="not-found">
    <div class="status">
      404
    </div>
    <div class="message">
      <h1>Page Not Found!</h1><br />
      <h2>서비스 이용에 불편을 드려 죄송합니다.</h2>
      <h3>요청한 웹페이지의 이름이 바뀌었거나 현재 사용할 수 없거나 삭제되었습니다.</h3>
      <h3>입력하신 주소가 정확한지 다시 한번 확인해보시기 바랍니다</h3>
    </div><br />
    <button @click="$router.push({name: 'mainpage'})">
      메인 페이지로 이동
    </button>
  </div>
</template>


<style lang="scss" scoped>
.not-found {
  line-height: 1.2;
  text-align: center;
  padding: 8rem 2rem;
  .status {
    font-size: 16rem;
    color: $color-warning;
  }
  .message {
    font-size: 5rem;
  }
  button {
    height: 3rem;
    background-color: $color-warning;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
