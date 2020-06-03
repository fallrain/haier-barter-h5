<template>
  <div>
    <b-search-input
      v-model="searchVal"
      @search="search"
      placeholder="通过员工姓名或员工ID查询随行参与人"
    >
    </b-search-input>
       <div class="list-item" @click="onItemClick(item)" v-for="(item, index) in searchData" :key="index">
        <div class="img-style">
          <img src="@/assets/images/houseServicer/head.png" alt="">
        </div>
        <div class="right-content">
            <div class="item-name">
              {{item.username}}
            </div>
             <div class="item-name">
              {{item.mobile}}
            </div>
        </div>
      </div>
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
      searchData: {
        username: '',
        hmcId: ''
      },
      // 点击的数据
      currentClickItemData: {},
      searchList: []
    };
  },

  // eslint-disable-next-line no-dupe-keys
  created() {
    this.search();
  },
  methods: {
    search() {
      const param = {};
      param.hmcIdOrUsername = this.searchVal;
      /* 搜索随行参与人 */
      this.basicService.queryAccompanier(param).then((res) => {
        if (res.code === 1) {
          if (res.data.length > 0) {
            this.searchData = res.data;
          } else {
            Toast.failed('随行参与人:无');
            this.searchVal = '';
            this.searchData = {
              username: '',
              hmcId: ''
            };
          }
        }
      });
    },
    onItemClick(item) {
      this.searchVal = '';
      // this.$emit('chooseJoinUser', item.username);  //给父路由传值，让父路由重新请求数据
      localStorage.setItem('chooseJoinUser', item.username);

      this.$router.go(-1);
    },

  },
  beforeRouteLeave(to, from, next) {
    debugger;
    if (to.name === 'Houseservice.AddServiceUser') {
      to.params.accompanyingData = this.searchData;
    }
    // this.$destroy();
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
   .list-item{
    display: flex;
    background: #fff;
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;
    .img-style{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display:inline;
      img{
        /*width: 100%;*/
        height: 100%;
      }
    }
   }
</style>
