<template>
  <FormItem :label="labelText" :label-width="labelWidth" :prop="validateRule">
    <Input
      v-model="value"
      :type="inputType"
      :size="inputSize"
      :placeholder="placeHolder"
      :prefix="leftIcon"
      :icon="rightIcon"
      :search="isSearch"
      :enter-button="showEnter"
      :number="isNumber"
      @on-search="$emit('search')" />
  </FormItem>
</template>

<script>
export default {
  props: ['label-text', 'label-width', 'validate-rule', 'input-type', 'input-size', 'place-holder', 'left-icon', 'right-icon', 'is-search', 'show-enter', 'is-number', 'model'],
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
