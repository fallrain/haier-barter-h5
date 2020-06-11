<template>
  <div>
    <b-search-input
      v-model="searchVal"
      @search="search"
      placeholder="通过员工姓名或员工ID查询随行参与人"
    >
    </b-search-input>
    <ul class="searchAccompanying-list">
      <li
        class="searchAccompanying-list-item"
        v-for="(item, index) in searchData"
        :key="index"
        @click="onItemClick(item)"
      >
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
        <div
          class="searchAccompanying-list-item-check"
          :class="[item.checked && 'checked']"
        >
          <i
            class="iconfont"
            :class="[item.checked ? 'icon-guifanduoxuanxuanzhong':'icon-guifanduoxuanweixuanzhong']"
          ></i>
        </div>
      </li>
    </ul>
    <div class="searchAccompanying-par">
      <button
        type="button"
        class="common-submit-btn-primary"
        @click="$mBack"
      >取消
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="submit"
      >确定
      </button>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

import {
  BSearchInput
} from '@/components/business';

import {
  mapGetters,
  mapMutations
} from 'vuex';

import {
  HOUSE_SERVICE
} from '@/store/mutationsTypes';

export default {
  name: 'SearchAccompanying',
  components: {
    BSearchInput,
  },
  data() {
    return {
      searchVal: '',
      searchData: [],
      // 点击的数据
      currentClickItemData: {},
      searchList: [],
      // 最大参与人数目
      maxAccompanistNum: 5
    };
  },
  created() {
    this.search();
  },
  computed: {
    ...mapGetters([
      HOUSE_SERVICE.GET_PARTICIPANT
    ])
  },
  methods: {
    ...mapMutations([
      HOUSE_SERVICE.UPDATE_PARTICIPANT
    ]),
    search() {
      const param = {};
      param.hmcIdOrUsername = this.searchVal;
      /* 搜索随行参与人 */
      this.basicService.queryAccompanier(param).then(({ code, data }) => {
        if (code === 1) {
          if (data.length > 0) {
            const dataTemp = data;
            // 获取随行人，已选择的设置为选中状态
            const {
              accompanyingId
            } = this[HOUSE_SERVICE.GET_PARTICIPANT];
            if (accompanyingId) {
              const accompanyingIdMap = {};
              accompanyingId.split(',').forEach((v) => {
                accompanyingIdMap[v] = 1;
              });
              dataTemp.forEach((v) => {
                if (accompanyingIdMap[v.hmcId]) {
                  v.checked = true;
                }
              });
            }
            this.searchData = dataTemp;
          } else {
            Toast.failed('随行参与人:无');
            this.searchVal = '';
            this.searchData = [];
          }
        }
      });
    },
    onItemClick(item) {
      const {
        maxAccompanistNum,
        searchData
      } = this;
      this.searchVal = '';
      // checked状态
      const choseNum = searchData.filter(v => v.checked).length;
      if (!item.checked && choseNum >= maxAccompanistNum) {
        this.$toast.failed(`最大只能选择${maxAccompanistNum}个`);
        return;
      }
      this.$set(item, 'checked', !item.checked);
    },
    submit() {
      /* 选择完返回 */
      const choseAccompanistsTemp = this.searchData.filter(v => v.checked);
      const accompanyingNameAy = [];
      const accompanyingIdAy = [];
      choseAccompanistsTemp.forEach((v) => {
        accompanyingNameAy.push(v.username);
        accompanyingIdAy.push(v.hmcId);
      });
      const accompanyingId = accompanyingIdAy.join(',');
      const accompanyingName = accompanyingNameAy.join(',');
      // 更新选择的参与人
      this[HOUSE_SERVICE.UPDATE_PARTICIPANT]({
        accompanyingId,
        accompanyingName
      });
      this.$mBack();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.AddServiceUser') {
      to.params.accompanyingData = this.searchData;
    }
    next();
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

  .searchAccompanying-list {
    height: calc(100vh - 216px);
    overflow-y: auto;
  }

  .searchAccompanying-list-item {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;

    .img-style {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: inline;
      margin-right: 24px;

      img {
        height: 100%;
      }
    }
  }

  .searchAccompanying-list-item-check {
    margin-left: auto;
    color: #B9BABA;

    .iconfont {
      font-size: 40px;
    }

    &.checked {
      color: #1969C6;
    }
  }

  .searchAccompanying-par {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;

    .common-submit-btn-primary,
    .common-submit-btn-default {
      width: 45%;
    }
  }

</style>
