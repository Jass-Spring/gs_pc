<template>
  <Layout class="home-container">
    <Header>
      <div class="title">新快运业务系统</div>
      <Button @click="logout">退出</Button>
    </Header>

    <Layout>
      <Sider hide-trigger width="auto">
        <Menu width="250px" theme="dark">
          <nav-item v-for='item in navlist' :key="item.id" :nav="item"></nav-item>
        </Menu>
      </Sider>

      <Content>
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import NavItem from '../components/NavItem.vue'

export default {
  data () {
    return {
      navlist: [
        {
          id: 'xky01',
          title: '订单管理',
          children: [
            { id: 'xky0101', title: '订单查询' },
            { id: 'xky0102', title: '集运管理' },
            { id: 'xky0103', title: '快运订单列表' },
            { id: 'xky0104', title: '集运订单列表' }
          ]
        },
        {
          id: 'xky02',
          title: '收货管理',
          children: [
            { id: 'xky0201', title: '收货入库' }
          ]
        },
        {
          id: 'xky03',
          title: '集运入库单管理',
          href: '/home/packing_order'
        },
        {
          id: 'xky04',
          title: '弃件货物管理',
          href: '/home/packing_give_up_order'
        },
        {
          id: 'xky05',
          title: '集运代客下单',
        },
        {
          id: 'xky06',
          title: '仓库管理',
          children: [
            { id: 'cky0601', title: '入库上架' },
            { id: 'cky0602', title: '拣货单' },
            { id: 'cky0603', title: '拣货下架' },
            { id: 'cky0604', title: '集包' },
            { id: 'cky0605', title: '发货出库' },
            { id: 'cky0606', title: '排柜单' },
            { id: 'cky0607', title: '装车' },
            { id: 'cky0608', title: '卸车' }
          ]
        },
        {
          id: 'xky07',
          title: '中转管理',
        },
        {
          id: 'xky08',
          title: '站点签出',
          children: [
            {
              id: 'xky0801',
              title: '自提管理',
              children: [
                { id: 'xky080101', title: '自提预约' },
                { id: 'xky080102', title: '自提出库' },
                { id: 'xky080103', title: '自提签收' }
              ]
            },
            {
              id: 'xky0802',
              title: '配送管理',
              children: [
                { id: 'xky080201', title: '配送预约' },
                { id: 'xky080202', title: '配送出库' },
                { id: 'xky080203', title: '配送签收' },
                { id: 'xky080204', title: '配送任务管理' }
              ]
            }
          ]
        },
        {
          id: 'xky09',
          title: '对账管理',
          children: [
            { id: 'xky0901', title: '站点对账单' },
            { id: 'xky0902', title: '总部对账单' }
          ]
        },
        {
          id: 'xky10',
          title: '数据维护',
          children: [
            {
              id: 'xky1001',
              title: '基础信息维护',
              children: [
                { id: 'xky100101', title: '快递公司', href: '' },
                { id: 'xky100102', title: '国家城市行政区维护', href: '' },
                { id: 'xky100103', title: '货物类型', href: '' },
                { id: 'xky100104', title: '发货时效', href: '' },
                { id: 'xky100105', title: '站点维护', href: '' },
                { id: 'xky100106', title: '质检结果', href: '' },
                { id: 'xky100107', title: '费用修改类型', href: '' },
                { id: 'xky100108', title: '币种换算规则', href: '' },
                { id: 'xky100109', title: '库区维护', href: '' },
                { id: 'xky100110', title: '库位维护', href: '' },
                { id: 'xky100111', title: '菜单维护', href: '' },
                { id: 'xky100112', title: '包装类型维护', href: '/home/packaging_type' },
                { id: 'xky100113', title: '承运商维护', href: '' },
                { id: 'xky100114', title: '货物材质维护', href: '/home/commodity_material' },
                { id: 'xky100115', title: '收货时间维护', href: '/home/receiving_time' },
                { id: 'xky100116', title: '线路时效维护', href: '' }
              ]
            },
            {
              id: 'xky1002',
              title: '基础规则'
            },
            {
              id: 'xky1003',
              title: '报价费率设置',
              children: [
                { id: 'xky100301', title: '运费设置' },
                { id: 'xky100302', title: '配送费设置' },
                { id: 'xky100303', title: '综合费率设置' }
              ]
            },
            {
              id: 'xky1004',
              title: '打印模板管理',
              children: [
                { id: 'xky100401', title: '订单标签模板' },
                { id: 'xky100402', title: '集运入库标签' },
                { id: 'xky100403', title: '集包号模板' }
              ]
            },
            {
              id: 'xky1005',
              title: '系统设置',
              children: [
                { id: 'xky100501', title: '配送失败签入理由' },
                { id: 'xky100502', title: '排柜规则' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  components: {
    'nav-item': NavItem
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  position: relative;

  .ivu-layout-header {
    color: #fff;
    background-color: #303133;
    display: flex;
    z-index: 999;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .ivu-layout-has-sider {
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 64px;
    position: absolute;
    
    .ivu-layout-sider {
      height: 100%;
      overflow: auto;
      background-color: #fff;
      flex: none;

      ul {
        min-height: 100%;
      }
    }
  }
}
</style>
