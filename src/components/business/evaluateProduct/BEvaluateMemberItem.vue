<template>
  <div class="">
    <li class="songs-item-li" v-for="(item,index) in userList" :key="index">
      <div class="bEvaluateProductItem-cnt-person mb22">
        <div class="name-style">张三</div>
        <a href="tel:18510778318" class="go-phone">
          <div class="num-style">18678611903</div>
          <div class="phone-style">
            <i class="iconfont icon-dianhua mr16"></i>
            拨打电话
          </div>
        </a>
      </div>
      <div class="bEvaluateProductItem-cnt-price mb22">
        <span class="name">电冰箱</span>
        <span class="price">￥1897</span>
      </div>
      <div class="bEvaluateProductItem-cnt-time">
        <!-- <i class="iconfont icon-shizhong"></i> -->
        2010.02.12
      </div>
      <div class="container-style">
        <div class="goutjlClass">沟通记录</div>
        <div class="inputgtClass">
          <input type="text" class="" placeholder="请输入本次沟通记录">
        </div>
        <div class="cliclMore" @click="barCodeClick(item)">查看记录</div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'BEvaluateMemberItem',
  props: {
    // 订单数据
    userList: {
      type: Array
    }
  },
  methods: {
    barCodeClick(item) {
      /* 查看记录click */
      this.$router.push({
        name: 'EvaluateProductHistoryList.evaluateProductDetail',
        params: { isShow: false }
      });
    },
    selectItem(e) {
      /* 选中本item */
      e.stopPropagation();
      this.$emit('update:isChecked', !this.isChecked);
      this.$emit('onChecked', !this.isChecked);
    },
    toDetail(item) {
      wx.miniProgram.navigateTo({
        url: `/pages/message/valuationInfo/valuationInfo?odlfornewdbId=${item.id}`
      });
    },
    orderStatusFilter({ orderStatus }) {
      /* 订单转状态筛选 */
      const orderStatusMap = {
        0: '未成交',
        1: '已成交'
      };
      // const orderSourceMap = {
      //   DB: '兑呗',
      //   YLH: '易理货'
      // };
      const name = orderStatusMap[orderStatus] || '';
      //  if (orderSourceMap[orderSource]) {
      //   name += `（${orderSourceMap[orderSource]}）`;
      // }
      return name;
    },
    recordCall(item) {
      /* 记录以旧换新打电话 */
      const { id } = item;
      this.campaignService.recordFrequency({
        id,
        type: 1
      });
    }
  }
};
</script>

<style lang="scss">
  .songs-item-li{
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 24px;
    .bEvaluateProductItem-cnt-person{
      line-height: 50px;
      display: flex;
      .name-style{
        width: 110px;
        font-size: 36px;
        color: #333;
        font-weight: 600;

      }
      .go-phone{
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        .num-style{
          color: #333333;
        }
        .phone-style{
          .iconfont{
            font-size: 32px;
          }
          color: #1969C6;
        }
      }
    }
    .bEvaluateProductItem-cnt-price{
      color: #1969C6;
      .name{
        padding-right: 20px;
      }
    }
    .bEvaluateProductItem-cnt-time{
      margin-bottom: 20px;
    }
    .container-style {
      display: flex;
      line-height: 60px;
      .goutjlClass{
        font-size: 24px;
      }
      .inputgtClass{
        flex-grow: 1;
        padding: 0 34px;
        input{
          height: 60px;
          line-height: 60px;
          padding: 14px 25px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      }
      .cliclMore {
        color: #1969c6;
      }
    }
  }
.bEvaluateProductItem {
  display: flex;
  align-items: center;
  padding-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #d9d9d9;
  word-break: break-all;
}


.bEvaluateProductItem-btn-par {
  margin-left: auto;
  text-align: right;
}

.bEvaluateProductItem-tips {
  font-size: 20px;
  color: #29ab91;
}
</style>
