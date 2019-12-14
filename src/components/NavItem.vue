<template>
  <Submenu v-if="nav.children" :name="nav.id">
    <template slot="title">
        <Icon type="ios-paper" />
        {{ nav.title }}
    </template>

    <nav-item v-for='item in nav.children' :key="item.id" :nav="item"></nav-item>
  </Submenu>
  
  <MenuItem v-else :name="nav.id" :to="nav.href">
    <Icon type="ios-paper" />
    {{ nav.title }}
  </MenuItem>
</template>

<script>
export default {
  name: 'nav-item',
  props: ['nav']
}
</script>

<style scoped lang="less">

</style>
