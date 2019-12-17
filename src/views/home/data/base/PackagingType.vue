<template>
  <article>
    <header>
      <!-- <Form :label-width="80" label-position="left" inline> -->
      <Form class="data-header">
        <!-- <input-item
          v-model="searchInfo.params.name"
          label-text="库区名称"
          input-size="large"
          place-holder="请输入库区名称"
          :is-search="true"
          :show-enter="true"
          @search="searchByName" >
        </input-item> -->
        <FormItem>
          <Button type="primary" size='large' icon="md-sync" @click="init()"></Button>
        </FormItem>

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
        <template v-slot:action="{ row }">
          <Button type="primary" size="small" @click="showEditModal(row)">编辑</Button>
          <Button type="warning" size="small" @click="switchPackagingType(row)">{{ row.status == 1 ? '停用' : '启用' }}</Button>
        </template>
      </Table>
    </section>

    <footer>
      <Page :page-size="searchInfo.limit" :current="searchInfo.page" :total="total" @on-change="changePage" show-total />
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

        <number-item
         v-model="packagingTypeForm.order"
         :precision="0"
         :min="1"
         label-text="排序"
         validate-rule="order">
        </number-item>

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

      <Spin size="large" fix v-if="editLaoding"></Spin>

      <template slot="footer">
        <Button type="default" @click="hideEditModal">取消</Button>
        <Button type="primary" @click="certainEdit">确定</Button>
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
} from '../../../../api/PackagingType.js'
import InputItemVue from '../../../../components/InputItem.vue'
import RadioItemVue from '../../../../components/RadioItem.vue'
import NumberItemVue from '../../../../components/NumberItem.vue'

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
        { align: 'center', width: 150, title: '操作', slot: 'action' }
      ],
      packagingTypeList: [],

      modalTitle: '',
      packagingTypeId: '',
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
          { required: true, type: 'string', message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeToCalculateType: [
          { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeToCalculate: [
          { required: true, type: 'string', message: '不能为空', trigger: 'blur' }
        ],
        order: [
          { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        packagingTypeRemark: [
          { required: true, type: 'string', message: '不能为空', trigger: 'blur' }
        ]
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

      editModalflag: false,
      editLaoding: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.searchInfo.page = 1
      this.searchInfo.limit = 10
      this.searchInfo.params.name = ''
      this.searchPackagingType()
    },
    changePage (page) {
      this.searchInfo.page = page
      this.searchInfo.limit = 10
      this.searchPackagingType()
    },
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
    showEditModal (row, index) {
      this.editModalflag = true
      if (row) {
        this.modalTitle = '编辑'
        this.packagingTypeId = row.packagingTypeId
        this.packagingTypeForm.packagingTypeName = row.packagingTypeName
        this.packagingTypeForm.packagingTypeToCalculateType = row.packagingTypeToCalculateType
        this.packagingTypeForm.packagingTypeToCalculate = row.packagingTypeToCalculate
        this.packagingTypeForm.order = row.order
        this.packagingTypeForm.status = row.status
        this.packagingTypeForm.packagingTypeRemark = row.packagingTypeRemark
      } else {
        this.modalTitle = '新增'
      }
    },
    hideEditModal () {
      this.$refs['packaging-type-form'].resetFields()
      this.editModalflag = false
      this.packagingTypeId = ''
    },
    certainEdit () {
      this.$refs['packaging-type-form'].validate(async valid => {
        if (valid) {
          if (this.packagingTypeId) {
            this.patchPackagingType()
          } else {
            this.addPackagingType()
          }
        } else {
          this.$message.error('请输入正确信息')
        }
      })
    },
    async addPackagingType () {
      this.editLaoding = true

      await this.$utils.sleep(1000)
      const { data: res } = await addPackagingTypeAPI(this.packagingTypeForm)
      // console.log(res)
      if (res.success) {
        this.hideEditModal()
        this.init()
      }

      this.editLaoding = false
    },
    async patchPackagingType () {
      this.editLaoding = true

      await this.$utils.sleep(1000)
      const { data: res } = await patchPackagingTypeAPI(Object.assign(this.packagingTypeForm, { packagingTypeId: this.packagingTypeId }))
      // console.log(res)
      if (res.success) {
        this.hideEditModal()
        this.init()
      }

      this.editLaoding = false
    },
    async switchPackagingType (row) {
      const obj = {}
      Object.assign(obj, row)
      obj.status = obj.status == 1 ? 0 : 1

      this.packagingTypeLoading = true

      await this.$utils.sleep(1000)
      const { data: res } = await patchPackagingTypeAPI(obj)
      // console.log(res)
      if (res.success) {
        this.hideEditModal()
        this.init()
      }
    }
  },
  components: {
    'input-item': InputItemVue,
    'radio-item': RadioItemVue,
    'number-item': NumberItemVue
  }
}
</script>

<style lang="less" scoped>

</style>
