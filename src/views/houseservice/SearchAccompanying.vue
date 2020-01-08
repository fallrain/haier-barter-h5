<template>
  <div>
<!--    <b-notice-bar-->
<!--      :show.sync="noticeShow"-->
<!--      content="温馨提示：点击下方的【扫描】，可扫产品能效贴自动带入产品型号。"-->
<!--    >-->
<!--    </b-notice-bar>-->
    <b-search-input
      v-model="searchVal"
      @search="search"
      placeholder="通过员工姓名或员工ID查询随行参与人"
    >
    </b-search-input>
    <ul
      class="searchProduct-history"
      v-if="searchData.username"
    >
      <li
        class="searchProduct-history-item"
        @click="onItemClick()"
      >{{searchData.username}}
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';
import {
  BNoticeBar
} from '@/components/form';

import {
  BSearchInput
} from '@/components/business';

export default {
  name: 'SearchProduct',
  components: {
    BNoticeBar,
    BSearchInput,
    Toast
  },
  created() {
  },
  data() {
    return {
      searchVal: '',
      searchData: '',
      // 点击的数据
      currentClickItemData: {},
      searchList: []
    };
  },
  methods: {
    search() {
      const param = {};
      param.hmcIdOrUsername = this.searchVal;
      /* 搜索随行参与人 */
      this.basicService.queryAccompanier(param).then((res) => {
        if (res.code === 1) {
          this.searchData = res.data;
          if (res.data === null) {
            Toast.failed('暂无信息，请重新搜索');
            this.searchVal = '';
            this.searchData = '';
          }
        }
      });
    },
    array_contain(array, obj) {
      return !!array.find(v => v.productCode === obj.productCode);
    },
    onItemClick() {
      this.searchVal = '';
      this.$router.go(-1);
    },

  },
  beforeRouteLeave(to, from, next) {
    debugger;
    if (to.name === 'Houseservice.AddServiceUser') {
      to.params.accompanyingData = this.searchData;
    }
    this.$destroy();
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">
  .searchProduct-notice-bar-title {
    color: #E89748;
  }

  .searchProduct-history {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 4px;
    background: #fff;
  }

  .searchProduct-history-item {
    padding-left: 30px;
    padding-right: 30px;
    height: 78px;
    line-height: 78px;
    color: #666;
    font-size: 28px;
  }

  .searchProduct-secret {
    padding: 24px;

    strong {
      color: #1969C6;
    }
  }

  .searchProduct-secret-title {
    font-size: 28px;
    color: #666;
    margin-bottom: 20px;
  }

  .searchProduct-secret-warn {
    color: #F5A623;
  }

  .searchProduct-secret-con {
    color: #333;
    font-size: 24px;
    line-height: 40px;
  }

  .searchProduct-scan-wrap {
    display: flex;
    align-items: center;
    color: #1969C6;

    .icon-saomiao {
      font-size: 40px;
    }
  }

  .searchProduct-scan-inf {
    line-height: 1;
    margin-left: 12px;
    font-size: 10px;
    writing-mode: vertical-lr;
  }
</style>
