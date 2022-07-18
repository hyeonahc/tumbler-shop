<template>
  <tr>
    <td>
      <div>
        {{ sales.length }}
      </div>
    </td>
    <td>
      <div>{{ sales.product.title }}</div>
    </td>
    <td>
      <div>
        {{ sales.user.displayName }}
      </div>
    </td>
    <td>
      <div>
        {{ orderDate }}
      </div>
    </td>
    <td>
      <div>
        <div v-if="sales.isCanceled">
          구매취소
        </div>
        <div v-if="sales.done">
          구매성공
        </div>
        <div v-else-if="!sales.isCanceled && !sales.done">
          구매신청
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { request } from '../api/adminProductApi'
import dayjs from 'dayjs'
export default {
  props: {
    sales: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    orderDate() {
      return dayjs(this.sales.timePaid).format('YYYY년 MM월 DD일 HH시 mm분')
    }
  },
  methods: {
    async transactionDetails() {
      const res = await request ({
        url: `transactions/${this.sales.detailId}`,
        method: 'PUT'
      })
      console.log(res)
    }
  }
}
</script>

<style>

</style>
