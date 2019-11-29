<template>
  <div id="app" class="app">
    <div class="app-container">
      <keep-alive
        :exclude="aliveExclude"
      >
        <router-view>

        </router-view>
      </keep-alive>
    </div>
    <b-loading></b-loading>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';
import BLoading from '@/components/form/BLoading';

export default {
  name: 'App',
  components: {
    BLoading
  },
  computed: mapState([
    'aliveExclude',
  ])
};
</script>
<style lang="scss">
  @import 'assets/css/base';
</style>
<style>
  @import 'assets/font/iconfont.css';
</style>

<style lang="scss">
  @import 'assets/css/common';
</style>
<style>
  .md-toast-text {
    white-space: normal !important;
  }
</style>
