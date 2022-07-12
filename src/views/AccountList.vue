<template>
  <div class="inner">
    <h4>계좌목록</h4>   
    <div
      v-for="bank in banklist"
      :key="bank.code"
      class="banklist">
      {{ bank.name }} / ({{ bank.code }})
      <span
        v-if="bank.disabled"
        class="success">연결완료</span>
      <RouterLink
        v-else
        :to="{name: 'AddAccount',
              query: {bankname: bank.name,
                      bankcode: bank.code,
                      bankdigits: bank.digits,
              }
        }">
        <button>
          {{ bank.name }}연결
        </button> 
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
  ...mapState('bank', [
    'banklist',
    ])
  },
  created() {
    this.accountList()
  },
  methods: {
  ...mapActions('bank', [
      'accountList',
    ]),
  },
  
}
</script>

<style lang="scss" scoped>
.banklist {
  color: $color-font;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}
  .success {
    color: $color-primary;
  }
</style>
