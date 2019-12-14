<template>
  <FormItem :label="labelText" :label-width="labelWidth" :prop="validateRule">
    <Input v-model="value" :type="inputType" :prefix="leftIcon" :icon="rightIcon" :placeholder="placeHolder"></Input>
  </FormItem>
</template>

<script>
export default {
  props: ['label-text', 'label-width', 'validate-rule', 'input-type', 'place-holder', 'left-icon', 'right-icon', 'model'],
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
