<template>
  <article>
    <header>
      <Form></Form>
    </header>

    <section>
      <Table
        :loading="packingOrderLoading"
        :columns="packingOrderHead"
        :data="packingOrderList"
        border>
        <template v-slot:action="{ row }">
          <Button type="error">删除</Button>
          <Button type="warning">弃件</Button>
          <Button type="primary">货物明细</Button>
        </template>
      </Table>
    </section>

    <footer>
      <Page
        :total="total"
        show-total>
      </Page>
    </footer>
  </article>
</template>

<script>
import {
  initPackingOrderAPI,
  searchPackingOrderAPI,
  getPackingOrderNosAPI,
  deletePackingOrderAPI,
  giveUpPackingOrderAPI,
  getSendGoodListAPI
} from '../../api/PackingOrder.js'

export default {
  data () {
    return {
      packingOrderForm: {
        page: 1,
        limit: 10,
        params: {
          orderNo: [],
          inStockBegin: '',
          inStockEnd: '',
          vipNo: '',
          siteId: ''
        }
      },

      packingOrderLoading: false,
      packingOrderHead: [
        { align: 'center', width: 60, type: 'selection' },
        { align: 'center', width: 150, title: '入库单号', key: 'packingOrderNo' },
        { align: 'center', width: 150, title: '订单单号', key: 'wharehouseOrderNo' },
        { align: 'center', width: 150, title: '快递单号', key: 'orderNo' },
        { align: 'center', width: 150, title: '快递件数', key: 'packingOrderNum' },
        { align: 'center', width: 150, title: '总数量', key: 'countNum' },
        { align: 'center', width: 150, title: '始发仓', key: 'packingCurrentSite' },
        { align: 'center', width: 170, title: '入库时间', key: 'packingInStockDatetime' },
        { align: 'center', width: 150, title: '货物品名', key: 'cargoGoodName' },
        { align: 'center', width: 150, title: '货物材质', key: 'packingOrderMaterialQualityName' },
        { align: 'center', width: 150, title: '货物类型', key: 'cargoName' },
        { align: 'center', width: 150, title: '体积(m³)', key: 'packingGoodAllVolume' },
        { align: 'center', width: 150, title: '实重(kg)', key: 'packingGoodAllWeight' },
        { align: 'center', width: 150, title: '垫付费', key: 'disbursementFee' },
        { align: 'center', width: 150, title: '会员id', key: 'vipNo' },
        { align: 'center', width: 150, title: '会员昵称', key: 'vipName' },
        { align: 'center', width: 150, title: '订单备注', key: 'packingOrderRemark' },
        { align: 'center', width: 150, title: '质检货物名', key: 'packingGoodName' },
        { align: 'center', width: 150, title: '质检结果', key: 'qualityCheckResultName' },
        { align: 'center', width: 150, title: '质检备注', key: 'qualityCheckResultRemark' },
        { align: 'center', width: 150, title: '是否弃件', key: 'isGiveUp' },
        { align: 'center', width: 150, title: '快递公司', key: 'expressCompanyName' },
        { align: 'center', width: 260, title: '操作', slot: 'action', fixed: 'right' }
      ],
      packingOrderList: [],

      total: 0
    }
  },
  created () {
    this.searchPackingOrder()
  },
  methods: {
    async searchPackingOrder () {
      this.packingOrderLoading = true

      await this.$utils.sleep(1000)
      const { data: res } = await searchPackingOrderAPI(this.packingOrderForm)
      console.log(res)
      if (res.success) {
        this.total = res.data.total
        this.packingOrderList = res.data.items
      }

      this.packingOrderLoading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
