<template>
  <article>
    <header>
      <Form :label-width="80" label-position="left" inline>
        <!-- <FormItem label="库区名称">
          <Input v-model="searchInfo.params.reservoirAreaName" size='large' placeholder="请输入库区名称" @on-search="getListByParams" search enter-button/>
        </FormItem> -->
        <input-item
          v-model="searchInfo.params.reservoirAreaName"
          label-text="库区名称"
          input-size="large"
          place-holder="请输入库区名称"
          :is-search="true"
          :show-enter="true">
        </input-item>

        <FormItem>
          <Button icon='md-add' type="success" size="large" @click="showEditModal()">新增</Button>
        </FormItem>
      </Form>
    </header>

    <section>
      <Table
        :loading="packagingTypeLoading"
        :columns="packagingTypeHead"
        :data="packagingTypeList"
        border>
        <template v-slot:action="{ row, index }">
          <Button type="primary" size="small">编辑</Button>
          <Button type="warning" size="small">{{ row.status == 1 ? '停用' : '启用' }}</Button>
        </template>
      </Table>
    </section>

    <footer>
      <Page :page-size="searchInfo.limit" :current="searchInfo.page" :total="total" show-total />
    </footer>

    <Modal v-model="editModalflag" :title="modalTitle" :closable="false" :mask-closable="false">
      <Form :model="packagingTypeForm" :rules="packagingTypeRules" :label-width="80" label-position="left" ref="packaging-type-form">
        <input-item
          v-model="packagingTypeForm.packagingTypeName"
          label-text="包装类型"
          validate-rule="packagingTypeName">
        </input-item>

        <radio-item
          v-model="packagingTypeForm.packagingTypeToCalculateType"
          :radio-list="calculateTypes"
          label-text="计费标准"
          validate-rule="packagingTypeToCalculateType">
        </radio-item>

        <input-item
          v-model="packagingTypeForm.packagingTypeToCalculate"
          label-text="计费公式"
          validate-rule="packagingTypeToCalculate">
        </input-item>

        <!-- <FormItem label="排序" prop="order" required>
          <InputNumber v-model="packagingTypeForm.order" :precision="0" :min="1"></InputNumber>
        </FormItem> -->
        <input-item
          v-model="packagingTypeForm.order"
          :is-number="true"
          label-text="排序"
          validate-rule="order">
        </input-item>

        <radio-item
          v-model="packagingTypeForm.status"
          :radio-list="status"
          label-text="状态"
          validate-rule="status">
        </radio-item>

        <input-item
          v-model="packagingTypeForm.packagingTypeRemark"
          label-text="备注"
          validate-rule="packagingTypeRemark">
        </input-item>
      </Form>

      <!-- <Spin size="large" fix v-if="editLaoding"></Spin> -->

      <template slot="footer">
        <Button type="default">取消</Button>
        <Button type="primary" @click="temp">确定</Button>
      </template>
    </Modal>
  </article>
</template>

<script>
import {
  searchPackagingTypeAPI,
  addPackagingTypeAPI,
  patchPackagingTypeAPI,
  deletePackagingTypeAPI,
  initPackagingTypeAPI
} from '../../api/PackagingType.js'
import InputItemVue from '../../components/InputItem.vue'
import RadioItemVue from '../../components/RadioItem.vue'

export default {
  data () {
    return {
      searchInfo: {
        page: 1,
        limit: 10,
        params: {
          name: ''
        }
      },
      
      packagingTypeLoading: false,
      packagingTypeHead: [
        { align: 'center', title: '包装类型', key: 'packagingTypeName' },
        { align: 'center', title: '排序', key: 'order' },
        { align: 'center', title: '状态', key: 'statusStr' },
        { align: 'center', title: '备注', key: 'packagingTypeRemark' },
        { align: 'center', width: 200, title: '操作', slot: 'action' }
      ],
      packagingTypeList: [],

      modalTitle: '',
      packagingTypeForm: {
        packagingTypeName: '',
        packagingTypeToCalculateType: null,
        packagingTypeToCalculate: '',
        order: null,
        status: null,
        packagingTypeRemark: ''
      },
      packagingTypeRules: {
        packagingTypeName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeToCalculateType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeToCalculate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '请输入一个整数' }
        ],
        status: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeRemark: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      calculateTypes: [
        { value: 1, text: '按件收费' },
        { value: 2, text: '按体积收费' }
      ],
      status: [
        { value: 1, text: '启用' },
        { value: 0, text: '停用' }
      ],

      total: 0,

      editModalflag: false
    }
  },
  created () {
    this.searchPackagingType()
  },
  methods: {
    async searchPackagingType () {
      this.packagingTypeLoading = true

      await this.$utils.sleep(1000)
      const { data: res } = await searchPackagingTypeAPI(this.searchInfo)
      // console.log(res)
      if (res.success) {
        this.total = res.data.total
        this.packagingTypeList = res.data.items
      }

      this.packagingTypeLoading = false
    },
    showEditModal(row, index) {
      this.editModalflag = true
      if (row) {
        
      } else {
        this.modalTitle = '新增'
      }
    },
    temp () {
      this.$refs['packaging-type-form'].validate(valid => {
        console.log(valid)
      })
    }
  },
  components: {
    'input-item': InputItemVue,
    'radio-item': RadioItemVue
  }
}
</script>

<style lang="less" scoped>
article {
  padding: 50px;

  header {
    .ivu-form {
      display: flex;
      justify-content: space-between;

      .ivu-form-item {
        &:nth-child(2) {
          margin-right: 0;
        }

        /deep/ .ivu-form-item-label {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
  }

  footer {
    padding-top: 24px;
    text-align: right;
  }
}
</style>
