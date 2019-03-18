<template>
  <div class="dashboard-container">
    <h1>欢迎使用管理平台</h1>
    <p>请点击左侧菜单进行相关操作</p>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$light_blue: #5293B1;
.dashboard {
  /* 把两部分连接起来看 class=dashboard-container */
  &-container {
    margin: 30px;
    h1{
      width: 420px;
      color: $light_blue;
      font-size: 48px;
      margin: 30px auto;
      text-align: center;
      margin-top: 200px;
    }
    p{
      width: 420px;
      color: $light_blue;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
