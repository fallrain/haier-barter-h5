<template>
  <div>
    <b-notice-bar
      :show.sync="noticeShow"
      content="温馨提示：点击下方的【扫描】，可扫产品能效贴自动带入产品型号。"
    >
    </b-notice-bar>
    <b-search-input
      v-model="searchVal"
      @search="search"
      placeholder="点击搜索型号"
    >
      <div class="searchProduct-scan-wrap">
        <i class="iconfont icon-saomiao"></i>
        <span class="searchProduct-scan-inf">扫描</span>
      </div>
    </b-search-input>
    <ul
      class="searchProduct-history"
    >
      <li
        class="searchProduct-history-item"
        v-for="(item,index) in searchList"
        :key="index"
        @click="onItemClick(item)"
      >{{item.productCode}}{{item.productBrandName}}
      </li>
    </ul>
    <div class="searchProduct-secret">
      <div class="searchProduct-secret-title">搜索型号小秘诀</div>
      <div class="searchProduct-secret-con">
        尽量输入各型号相似度较小的特有字符串，例如： 若要搜索冰箱BCD-460WDGZ，可以在搜索框输入
        <strong class="strong">460W</strong>
        ，而不要输入BCD，因为冰箱都是BCD开头；
      </div>
      <div class="searchProduct-secret-con">
        若要搜索空调KFR-72LW/18SNA21AU1，可以在搜索框输入
        <strong>18SN</strong>
        ，而不要输入KFR，因为空调都是KFR开头；
      </div>
      <div class="searchProduct-secret-con">
        若要搜索洗衣机XQG60-QHZB1287，可以在搜索框输入
        <strong>ZB1287</strong>
        ，而不要输入XQG，因为洗衣机都是XQG开头；
      </div>
      <div class="searchProduct-secret-con">
        若要搜索热水器JSQ24-Q2(12T)，可以在搜索框输入
        <strong>24-Q2</strong>
        ，中间横杠-可以省略
      </div>
      <div class="searchProduct-secret-title  searchProduct-secret-warn mt23">注意：</div>
      <div class="searchProduct-secret-con">
        1、大小写都行，
        <strong>横杠"-" 或斜杠"/" 可以省略</strong>
        ，但是中文括号"（" 和英文括号"(" 不能输错
      </div>
      <div class="searchProduct-secret-con mb10">2、点击搜索框下面的搜索历史或搜索结果中的型号，可以直接选择完整产品型号。</div>
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
    if (localStorage.getItem('productSearchHistory')) {
      this.searchHistory = JSON.parse(localStorage.getItem('productSearchHistory'));
    }
  },
  data() {
    return {
      // 通知栏显示隐藏
      noticeShow: true,
      // search value
      searchVal: '',
      // 点击的数据
      currentClickItemData: {},
      searchList: [],
      // 搜索历史
      searchHistory: []
    };
  },
  methods: {
    search(val) {
      /* 搜索产品 */
      this.productService.list(this.searchVal, '1', '30').then((res) => {
        // debugger;
        if (res.code === 1) {
          this.searchList = res.data;
          if (res.data === null) {
            Toast.failed('暂无信息，请重新搜索');
            this.searchVal = '';
          }
        }
      });
    },
    onItemClick(item) {
      this.currentClickItemData = item;
      this.searchHistory.push(this.currentClickItemData);
      this.$router.go(-1);
    },

  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderEntry') {
      const obj = { product: this.currentClickItemData };
      to.query.temp = JSON.stringify(obj);
    }
    localStorage.setItem('productSearchHistory', JSON.stringify(this.searchHistory));
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
    border-bottom: 1px solid #CCC;
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
