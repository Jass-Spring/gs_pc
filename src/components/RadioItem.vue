<template>
  <FormItem :label="labelText" :label-width="labelWidth" :prop="validateRule">
    <RadioGroup
      v-model="value">
      <Radio
        v-for="item in radioList"
        :label="item.value"
        :key="item.value">
        {{ item.text }}
      </Radio>
    </RadioGroup>
  </FormItem>
</template>

<script>
export default {
  props: ['label-text', 'label-width', 'validate-rule', 'radio-list', 'model'],
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
