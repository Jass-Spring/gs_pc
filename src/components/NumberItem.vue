<template>
  <FormItem :label="labelText" :label-width="labelWidth" :prop="validateRule">
    <InputNumber
      v-model="value"
      :precision="precision"
      :min="min"
      :max="max" />
  </FormItem>
</template>

<script>
export default {
  props: ['label-text', 'label-width', 'validate-rule', "precision", 'min', 'max', 'model'],
  model: {
    prop: 'model',
    event: 'input'
  },
  data () {
    return {
      value: this.model
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.$emit('input', newVal)
    },
    model (newVal, oldVal) {
      this.value = this.model
    }
  }
}
</script>

<style lang="less" scoped>

</style>
