<template xmlns:v-slot="">
  <div>
    <div class="orderConfirm-no">
  <span class="orderConfirm-p">订单号：</span><p class="orderConfirm-s">2019-06-18</p>
</div>
    <div class="orderEntry-header">
      <span class="orderEntry-header-name">门店：{{shopName}}</span>
    </div>

      <div class="orderEntry-user">
        <div>
          <div class="orderEntry-user-head">
            <span class="name mr16">收货人：{{consignee.name}}</span>
            <span class="sex mr16">{{consignee.sex}}</span>
            <i class="iconfont icon-dianhua mr16"></i>
            <span class="phone mr16">{{consignee.phone}}</span>

          </div>
          <p class="orderEntry-user-address">
            {{consignee.address}}
          </p>
        </div>
      </div>
    <b-item
      class="mt16"
      title="购买日期："
      value="2019-05-31"
    >
    </b-item>
    <b-item
      class="mt16"
      title="订单类型："
      value="单品"
    >
    </b-item>
    <b-fieldset
      class="mt16"
      title="用户购买的产品"
    >
      <div>
        <ul>
          <b-order-product-confirm
            class="mb20"
            v-for="(item,index) in productList"
            :key="index"
            :data="item"
            :index="index"
            :content="item.isReport"
          >
            <template
              v-slot:default
            >
              <p class="orderEntry-reportInf">
                该产品需代报装,请选择安装时间
              </p>
            </template>
          </b-order-product-confirm>
        </ul>
      </div>
    </b-fieldset>
    <b-fieldset
      class="mt16 orderEntry-rights-fieldset"
      title="已选择的权益"
      :headBtmLine="true"
    >
      <div>
        <b-activity-list
          :isDetail="isDetail"
          :data="activityList"
          v-model="choosedActivitys"
          @chooseGift="chooseGift"
        ></b-activity-list>
      </div>
    </b-fieldset>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-primary"
      >返回修改草稿
      </button>
      <button
        type="button"
        class="common-submit-btn-default"
        @click="next"
      >确认订单
      </button>
    </div>
  </div>
</template>

<script>
import {
  BActivityList,
  BDatePicker,
  BFieldset,
  BItem,
  BOrderProduct,
  BPop,
  BPopAddressList,
  BPopCheckList,
  BRadioItem,BOrderProductConfirm
} from '@/components/form';

import {
  BMultbuyCheck
} from '@/components/business';
import { Toast } from 'mand-mobile';

export default {
  name: 'OrderModify',
  components: {
    BActivityList,
    BDatePicker,
    BFieldset,
    BItem,
    BMultbuyCheck,
    BOrderProduct,
    BPop,
    BPopAddressList,
    BPopCheckList,
    BRadioItem,BOrderProductConfirm
  },
  data() {
    return {
      // 是否详情模式
      isDetail: true,
      // 门店名称
      shopName: '新华百货老大楼',
      // 收货人信息
      consignee: {
        /* name: '',
            sex: '男士',
            phone: '15067543689' */
      },
      // 订单类型单选
      orderTypes: [
        {
          key: 1,
          value: '单品'
        },
        {
          key: 2,
          value: '套购'
        }
      ],
      // 订单类型
      orderType: 2,
      // 购机时间
      buyDate: '',
      // 产品列表
      productList: [
        {
          name: '海尔/空调，KFR-35G',
          price: '',
          isReport: true
        },
        {
          name: '海尔/空调，KFR-35G',
          price: '',
        },
        {
          name: '海尔/空调，KFR-35G',
          price: '',
          isReport: true
        }
      ],
      // 活动列表
      activityList: [
        {
          id: 1,
          activityName: '6月场景套权益昆明小微',
          inf: '满10000元送7500积分',
          num: 33
        },
        {
          id: 2,
          activityName: '6月场景套权益昆明小微',
          inf: '满10000元送7500积分',
          num: 21
        }
      ],
      // 选中的活动id
      choosedActivitys: [],
      // 选择礼品pop显示隐藏
      chooseGiftPopShow: false,
      // pop礼品列表
      giftList: [
        {
          id: 1,
          name: '1.双立人厨房六件套（价值 7000积分）',
          checkedIds: []
        },
        {
          id: 2,
          name: '2.婴儿料理机（价值 6000积分）',
          checkedIds: []
        }
      ],
      // 退货原因pop show
      returnReasonPopShow: false,
      // pop 退货原因
      returnReasonList: [
        {
          id: 1,
          name: '换货'
        },
        {
          id: 2,
          name: '录单错误'
        },
        {
          id: 3,
          name: '信息填写错误'
        },
        {
          id: 4,
          name: '其他原因',
          reason: '',
          placeholder: '请输入您的订单修改原因'
        }
      ],
      // 选中的原因id 数组
      returnReasonVal: [],
      // 选择收货人列表pop show
      addressPopShow: false,
      // 收货人地址pop列表
      addressList: [
        {
          name: '张三',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '自己家'
        },
        {
          name: '李四',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '办公室'
        },
        {
          name: '王二',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '父母家'
        },
        {
          name: '尼古拉斯赵四',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '其他'
        },
        {
          name: '莱桑尼丝铁柱',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '其他'
        },
        {
          name: '罗伯特英子',
          phone: '15000000000',
          address: '山东省青岛市崂山区海尔路1号左岸风度小区12号楼1单元801户',
          tagName: '其他'
        }
      ],
      // 套购pop show
      multBuyPopShow: false,
      // 套购发起人
      multBuySponsor: [
        {
          id: 1,
          name: '陆梦飞',
          industry: '冰箱'
        },
        {
          id: 2,
          name: '大飞哥',
          industry: '彩电'
        },
        {
          id: 3,
          name: '贾老板',
          industry: '打怪兽'
        },
        {
          id: 4,
          name: '蟹老板',
          industry: '蟹黄包'
        }
      ],
      multBuySponsorCheckedIds: [],
      // 套购参与人
      multBuyParticipant: [
        {
          id: 1,
          name: '陆梦飞',
          industry: '冰箱'
        },
        {
          id: 2,
          name: '大飞哥',
          industry: '彩电'
        },
        {
          id: 3,
          name: '贾老板',
          industry: '打怪兽'
        },
        {
          id: 4,
          name: '蟹老板',
          industry: '蟹黄包'
        }
      ],
      // 参与人选中id
      multBuyParticipantCheckIds: [],
      orderNo:''
    };
  },
  computed: {

  },
  created(){
    this.orderService.generateOrderNo({},{recordModel:'Haier'}).then(res =>{
        if(res.code === 1){
          this.orderNo = res.data
          this.orderNo = 'Z15645424968056668'
          this.orderService.queryOrderInfoByOrderNo({},{orderNo:this.orderNo}).then(response =>{
              if(response.code === 1){
                  const resData  = response.data
                  this.shopName = resData.storeName
                  this.consignee.name = resData.userName
                  this.consignee.phone = resData.userPhone
                  this.consignee.sex = resData.userSex
                  this.consignee.address = resData.dispatchProvince + resData.dispatchCity + resData.dispatchArea + resData.dispatchAdd
                  this.buyDate = resData.buyTime
                  this.orderType = resData.orderType
                  this.haveConsignee()
                  if(resData.orderDetailDtoList.length !== 0){
                    this.productList = resData.orderDetailDtoList
                    this.productList.forEach(item =>{
                      if(item.productBrand == 'haier'){
                        item.productBrandCN = '海尔'
                      }else{
                        item.productBrandCN ='卡萨帝'
                      }
                    })
                  }
              }
          })
        }else{
         Toast.failed(res.msg);
        }

    })
  },
  methods: {
     haveConsignee() {
      /* 存在收货人信息 */
      return this.consignee && JSON.stringify(this.consignee) !== '{}';
    },
    chooseGift() {
      /* 选择礼品 */
      this.chooseGiftPopShow = true;
    },
    updateReasonClick() {
      /* 选择退换货原因 */
      this.returnReasonPopShow = true;
    },
    shwAddressList() {
      /* 展示选择用户pop */
      this.addressPopShow = true;
    },
    next() {
      /* 下一步 */
      // todo 单品、套购值待定
      if (this.orderType === 2) {
        // 展示套购发起人
        this.multBuyPopShow = true;
      }
    },
    saveOrder(){

    }
  }
};
</script>

<style lang="scss">
  .orderEntry-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background: #fff;
    padding-left: 27px;
    padding-right: 25px;
    color: #1969C6;
  }

  .orderEntry-header-name {
    font-size: 28px;
  }

  .orderEntry-header-icon {
    font-size: 32px;
  }

  .orderEntry-user {
    background: #fff;
    padding: 24px;
    margin-top: 16px;
  }

  .orderEntry-user-head {
    display: flex;
    align-items: center;

    .name {
      color: #333;
      font-size: 28px;
    }

    .sex {
      color: #333;
      font-size: 24px;
    }

    .icon-dianhua {
      font-size: 32px;
      color: #1969C6;
    }

    .phone {
      color: #1969C6;
      font-size: 28px;
    }

    .common-btn-waring {
      margin-left: auto;
    }
  }

  .orderEntry-user-address {
    color: #666;
    font-size: 28px;
    line-height: 36px;
    margin-top: 28px;
  }

  .orderEntry-date {
    width: 320px;
  }

  .orderEntry-reportInf {
    color: #3078CC;
    font-size: 24px;
  }

  .orderEntry-rights-fieldset {
    .b-fieldset-legend-left {
      font-size: 28px;
      color: #333;
    }

    .b-fieldset-legend-right {
      font-size: 24px;
      color: #1969C6;
    }
  }

  .orderEntry-rights-fieldset-more {
    margin-top: 20px;
    color: #1969C6;
    font-size: 24px;
    text-align: center;
  }
  .orderentry-address {
    .md-popup-mask {
      top: 0;
    }
  }
.orderConfirm-no{
  color: #1969C6;
  font-size: 28px;
  height: 80px;
  display: flex;
  .orderConfirm-p{
    height: 80px;
    line-height: 80px;
    padding-left: 25px;
    width: 580px;
     flex-shrink: 0;
  }
  .orderConfirm-s{
    height: 80px;
    line-height: 80px;
  }
}
</style>
