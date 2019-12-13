<template>
  <div class="BTitle-par">
    <p class="BTitle">{{cnt}}</p>
  </div>
</template>

<script>
  export default {
    name: 'BTitle',
    props: {
      //标题的内容
      cnt: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .BTitle-par {
    display: flex;
    padding-left: 24px;
  }

  .BTitle {
    color: #333;
    font-size: 32px;
    line-height: 40px;
    border-left: 6px solid #4A90E2;
    padding-left: 16px;
  }
</style>
