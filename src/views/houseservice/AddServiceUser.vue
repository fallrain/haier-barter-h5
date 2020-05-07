<template xmlns:v-slot="">
  <div>
    <!--    头部用户基本信息-->
    <header>
      <img src="@/assets/images/houseServicer/head.png" alt />
      <div class="right-content">
        <div class="user-info">
          <div>
            <span class>{{this.customerInfo.userName}}</span>
            <span v-show="this.usersex == 1">先生</span>
            <span v-show="this.usersex == 2">小姐</span>
          </div>
          <div class="mobile">
            {{this.customerInfo.userPhone}}
            <span class="icon iconfont icon-dianhua"></span>
          </div>
        </div>
      </div>
    </header>
    <!--    表单信息-->
    <div class="content">
      <div class="cue text-666">
        <div class="text-333 text-bold">温馨提示</div>
        <div>
          1、为避免一个用户多次重复服务，创建计划前，请点击
          <span
            class="check-history text-primary text-nowrap"
            @click="checkhistoryList"
          >查看该用户历史入户服务资料</span>
        </div>
        <div>2、只创建计划后执行的入户服务才记入考核</div>
      </div>
      <form class>
        <div class="form-title text-bold">入户服务计划详情</div>
        <b-item
          class="br-b mt16"
          title="入户服务场景"
          :value="tagName"
          :arrow="true"
          @click.native="serviceScape"
        ></b-item>
        <b-item class title="计划入户服务时间">
          <template v-slot:right>
            <b-date-picker
              class="hourseService-date"
              slot="right"
              type="datetime"
              :defaultDate="customerInfo.serviceTime"
              title="请选择日期"
              :pattern="pattern"
              v-model="customerInfo.serviceTime"
            ></b-date-picker>
          </template>
        </b-item>
        <b-item class="br-b mt16" title="服务人" :value="customerInfo.servicerName"></b-item>
        <b-item
          class="br-b join-person"
          title="随行参与人"
          :value="customerInfo.accompanyingName"
          :arrow="true"
          @click.native="chooseJoinPerson()"
        >
          <templet slot="left">
            <span>(选填)</span>
            <span class="icon iconfont icon-wenhao"></span>
          </templet>
        </b-item>
        <div class="bg-white p24 fs28">
          <div class="rows">
            <div class="text-333">入户地址</div>
            <button type="button" class="common-btn-waring" @click="queryAddress">修改地址</button>
          </div>
          <div class>{{customerInfo.serviceAddress}}</div>
        </div>
        <!--<b-item
        class="br-b mt16"
        title="选择入户服务礼品"
        :value="tagName1"
        :arrow="true"
        @rightClick="chooseGift()"
        ></b-item>-->
        <b-item
          v-show="productNames.length > 0"
          class="br-b service mt16"
          title="购买产品"
          placeholder
          :arrow="false"
          @rightClick="chooseProduct()"
        ></b-item>
        <ul class="choosedProduces text-right bg-white">
          <li v-for="(item, index) in productNames" :key="index">
            <span class="product-item">{{item}}</span>
            <span @click="deleteProduct(index)" class="icon iconfont icon-shanchu text-ccc"></span>
          </li>
        </ul>
        <div class="rows br-b bg-white p24 mt16 fs28">
          <label>加入我的日程提醒</label>
          <md-switch v-model="isTip" />
        </div>
        <div v-show="isTip" class="br-b bg-white p24 fs28">
          <span :class="[{'active':activeOffset==='0'},'tag-style']" @click="clickTag('0')">提前三天</span>
          <span :class="[{'active':activeOffset==='1'},'tag-style']" @click="clickTag('1')">提前一天</span>
          <span :class="[{'active':activeOffset==='2'},'tag-style']" @click="clickTag('2')">提前2小时</span>
          <span :class="[{'active':activeOffset==='3'},'tag-style']" @click="clickTag('3')">提前1小时</span>
        </div>
        <div class="remarks fs28">
          <div class="text-333">备注</div>
          <textarea
            placeholder="请输入备注信息"
            class="w100per"
            rows="3"
            @input="inputMax"
            v-model="customerInfo.description"
          ></textarea>
        </div>
      </form>
    </div>
    <!--    底部按钮-->
    <footer>
      <template>
        <div class="md-example-child md-example-child-button md-example-child-button-3">
          <div class="md-example-section">
            <md-button type="primary" inline plain @click="dealCancle">取消</md-button>
            <md-button type="primary" inline @click="dealSave">保存</md-button>
          </div>
        </div>
      </template>
    </footer>
    <b-pop-check-list type="radio" :show.sync="tagPopShow" :list="tagList" v-model="tag"></b-pop-check-list>
    <b-pop-check-list type="radio" :show.sync="tagPopShow1" :list="tagList1" v-model="tag1"></b-pop-check-list>
    <div class="orderentry-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :list="addressList"
        @addNew="addAddress"
        @editAddress="editAddress"
        @clickAddress="selectAddress"
      ></b-pop-address-list>
    </div>
    <div class="dialog" v-show="showMask">
      <div class="dialog-container">
        <div class="listClass">
          <li class="rowClass" v-for="(item, index) in queryHistoryList" :key="index">
            <div class="leftClass">
              <span class="product-item">{{item.userName}}</span>
              <span class="product-item">{{item.serviceTime}}</span>
            </div>
            <!-- ，0-待入户，1-已入户，2-已完成 -->
            <span class="product-item" v-show="item.status == 0">待入户</span>
            <span class="product-item" v-show="item.status == 1">已入户</span>
            <span class="product-item" v-show="item.status == 2">已完成</span>
          </li>
        </div>

        <div class="close-btn" @click="closeMask">
          <img class="zanclass" src="@/assets/images/houseServicer/ruhulistIcon.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Popup, PopupTitleBar, Button, Icon, Switch } from "mand-mobile";

import {
  BDatePicker,
  BItem,
  BPopAddressList,
  BPopCheckList
} from "@/components/form";
import addressData from "@/lib/address";

export default {
  name: "AddServiceUser",
  components: {
    [Toast.name]: Toast,
    BDatePicker,
    BItem,
    BPopAddressList,
    BPopCheckList,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Switch.name]: Switch
  },
  data() {
    return {
      showMask: false,
      orderFollowId: "", // 订单传过来的代办
      isTip: false,
      activeOffset: "0",
      addressPopShow: false,
      addressList: [],
      consignee: {},
      isChangePlan: false,
      pattern: "yyyy-MM-dd hh:mm",
      usersex: 0,
      tag: [],
      tagList: [],
      tag1: [],
      tagList1: [],
      accompanier: "",
      createdType: "直销员手工创建的入户服务",
      tagPopShow: false,
      tagPopShow1: false,
      productCodes: [],
      productNames: [],
      productCategory: [],
      productCategoryName: [],
      customerInfo: {
        title: "",
        customerId: "",
        customerInfoId: "",
        userId: "",
        userName: "",
        userPhone: "",
        servicescape: "", // 入户服务场景
        appointmentTime: "", // 用户预约时间
        serviceTime: "", // 计划上门时间
        servicerId: "", // 服务人ID
        servicerName: "", // 服务人姓名
        accompanyingId: "", // 随行人ID
        accompanyingName: "", // 随行人姓名
        giftId: "", // 服务礼品ID
        giftName: "", // 服务礼品名称
        productCodes: "", // 购买产品编码
        productNames: "", // 购买产品名称
        productCategory: "", // 产品组编码
        productCategoryName: "", // 产品组名称
        serviceAddress: "", // 入户服务地址
        description: "", // 备注
        warnFlag: "", // 是否加入提醒
        flag: 0 // 服务计划类型
      }
    };
  },
  computed: {
    tagName() {
      const that = this;
      if (this.tag) {
        const tagObj = this.tagList.find(v => v.id === this.tag[0]);
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = "";
        }
        that.customerInfo.servicescape = this.tag[0];
        return name;
      }
      return "";
    },
    tagName1() {
      if (this.tag1) {
        const tagObj = this.tagList1.find(v => v.id == this.tag1[0]);
        let name;
        if (tagObj) {
          name = tagObj.name.split("&")[0];
          this.customerInfo.giftId = this.tag1[0];
          this.customerInfo.giftName = name;
        } else {
          name = "";
        }
        return name;
      }
      return "";
    }
  },
  activated() {
    debugger;
    if (this.$route.params.choosedInfo) {
      this.productNames = [];
      this.productCodes = [];
      this.productCategory = [];
      this.productCategoryName = [];
      this.tag = [];
      this.tagList1 = [];
      this.customerInfo.userName = this.$route.params.choosedInfo.username;
      this.customerInfo.userId = this.$route.params.choosedInfo.userId;
      this.customerInfo.userPhone = this.$route.params.choosedInfo.mobile;
      // this.customerInfo.customerId = this.$route.params.choosedInfo.id;
      this.customerInfo.servicerId = this.$route.params.choosedInfo.servicerId;
      this.orderFollowId = this.$route.params.choosedInfo.orderFollowId;
      this.usersex = this.$route.params.choosedInfo.sex;
      // this.title = this.createdType + this.customerInfo.username;

      // 查询默认地址
      this.getDefaultAddress();
      // 查询用户最新购买产品
      // 查询直销员信息
      this.basicService.userInfo().then(res => {
        this.customerInfo.servicerId = res.data.hmcId;
        this.customerInfo.servicerName = res.data.username;
        this.orderService
          .queryUserNewestOrder(
            {},
            {
              hmcId: this.customerInfo.servicerId,
              userPhone: this.customerInfo.userPhone,
              requestNoToast: true
            }
          )
          .then(res => {
            if (res.code === 1) {
              if (res.data.orderDetailDtoList.length > 0) {
                res.data.orderDetailDtoList.forEach(item => {
                  this.productNames.push(
                    item.productModel + item.productCategoryName
                  );
                  this.productCodes.push(item.productCode);
                  this.productCategory.push(item.productCategoryCode);
                  this.productCategoryName.push(item.productCategoryName);
                });
              }
            }
          });
      });
      // 查询入户服务礼品卡券
      /* this.houseService.getCanBeIssuedRights({
        userId: this.customerInfo.userId,
        type: 2
      }).then((res) => {
        if (res.code === '200') {
          res.data.forEach((item) => {
            const name = `${item.cardTypeName} &nbsp; <span class="text-warning fs20">${item.rightsList[0].residualNum}</span>`;
            this.tagList1.push({
              id: item.rightsList[0].id,
              name: name
            })
          });
        }
      }); */
    }
    // 修改计划
    if (this.$route.params.customerInfo) {
      this.productNames = [];
      this.productCodes = [];
      this.productCategory = [];
      this.productCategoryName = [];
      this.tag = [];
      this.tagList1 = [];
      this.isChangePlan = true;
      this.customerInfo = this.$route.params.customerInfo;
      // 查询入户服务礼品卡券
      // this.houseService.getCanBeIssuedRights({
      //   userId: this.customerInfo.userId,
      //   type: 2
      // }).then((res) => {
      //   if (res.code === '200') {
      //     res.data.forEach((item) => {
      //       const name = `${item.cardTypeName} &nbsp; <span class="text-warning fs20">${item.rightsList[0].residualNum}</span>`;
      //       this.tagList1.push({
      //         id: item.rightsList[0].id,
      //         name
      //       });
      //     });
      //   }
      // });
      if (
        this.customerInfo.productCodes !== "" &&
        this.customerInfo.productCodes !== null
      ) {
        this.productNames = this.customerInfo.productNames.split(",");
        this.productCodes = this.customerInfo.productCodes.split(",");
      }
      if (
        this.customerInfo.productCategory !== "" &&
        this.customerInfo.productCategory !== null
      ) {
        this.productCategory = this.customerInfo.productCategory.split(",");
        this.productCategoryName = this.customerInfo.productCategoryName.split(
          ","
        );
      }
      this.tag[0] = this.customerInfo.servicescape;
      this.tag1[0] = this.customerInfo.giftId;
      // 查询客户地址列表
      this.queryCustomerAddressList();
    }
    if (this.$route.params.addressState) {
      // 查询默认地址
      this.getDefaultAddress();
      // 查询客户地址列表
      this.queryCustomerAddressList();
    }
    if (this.$route.params.accompanyingData) {
      // 选择随行参与人
      this.customerInfo.accompanyingId = this.$route.params.accompanyingData.hmcId;
      this.customerInfo.accompanyingName = this.$route.params.accompanyingData.username;
    }
  },
  created() {
    this.addressData = addressData;
    this.getServiceEle();
  },
  methods: {
    closeMask() {
      this.showMask = false;
    },
    // 查看该用户历史服务资料
    checkhistoryList() {
      const data = {
        servicerId: this.customerInfo.servicerId,
        pageNum: '1',
        pageSize: '100',
      };
      this.houseService.queryHistoryPlan(data, {}).then(res => {
        if (res.code === 1) {
          this.showMask = true;
          debugger;
          this.queryHistoryList = res.data.result;
          // res.data.result.forEach((item, index) => {
          //    debugger
          // });
        }
      });
    },
    clickTag(index) {
      this.activeOffset = index;
    },
    serviceScape() {
      /* 入户服务场景标签显示隐藏 */
      this.tagPopShow = true;
    },
    chooseGift() {
      /* 入户服务礼品选择 */
      this.tagPopShow1 = true;
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService
        .customerAddressList(this.customerInfo.customerId)
        .then(res => {
          if (res.code === 1) {
            const Data = this.addressData.options;
            res.data.forEach(address => {
              address.consignee = {};
              Data.forEach(p => {
                if (address.province === p.value) {
                  address.consignee.provinceName = p.label;
                  p.children.options.forEach(c => {
                    if (address.city === c.value) {
                      address.consignee.cityName = c.label;
                      c.children.options.forEach(d => {
                        if (address.district === d.value) {
                          address.consignee.districtName = d.label;
                        }
                      });
                    }
                  });
                }
              });
            });
            this.addressList = res.data;
            this.bUtil.analyzeAddressList(this.addressList);
          }
        });
    },
    getDefaultAddress() {
      this.productService
        .deafaultCustomerAddress(this.customerInfo.userPhone)
        .then(res => {
          if (res.code === 1) {
            if (res.data !== null) {
              console.log(res);
              this.customerInfo.customerInfoId = res.data.familyId;
              this.customerInfo.customerId = res.data.customerId;
              if (res.data.province) {
                this.getAddressName(
                  res.data.province,
                  res.data.city,
                  res.data.district,
                  res.data.address
                );
              }
              // 查询客户地址列表
              this.queryCustomerAddressList();
            }
          }
        });
    },
    // 翻译地址名称
    getAddressName(province, city, district, address) {
      this.consignee.address = {};
      const Data = this.addressData.options;
      Data.forEach(p => {
        if (province === p.value) {
          this.consignee.address.provinceName = p.label;
          p.children.options.forEach(c => {
            if (city === c.value) {
              this.consignee.address.cityName = c.label;
              c.children.options.forEach(d => {
                if (district === d.value) {
                  this.consignee.address.districtName = d.label;
                }
              });
            }
          });
        }
      });
      this.customerInfo.serviceAddress = `${this.consignee.address.provinceName}/
    ${this.consignee.address.cityName}/${this.consignee.address.districtName}/${address}`;
    },
    chooseJoinPerson() {
      // 进入随行参与人页面
      this.$router.push({
        name: "Houseservice.SearchAccompanying",
        params: {}
      });
    },
    queryAddress() {
      this.addressPopShow = true;
    },
    addAddress() {
      // 添加新地址
      this.region = "add";
      this.$router.push({
        name: "Houseservice.ChooseAddress",
        params: {
          region: this.region,
          customerInfo: this.customerInfo
        }
      });
    },
    editAddress(info) {
      info.userId = this.customerInfo.userId;
      info.username = this.customerInfo.userName;
      info.mobile = this.customerInfo.userPhone;
      console.log(info);
      console.log(this.customerInfo);
      this.region = "edit";
      this.$router.push({
        name: "Houseservice.ChooseAddress",
        params: {
          region: this.region,
          customerInfo: info
        }
      });
    },
    selectAddress(item) {
      this.getAddressName(
        item.province,
        item.city,
        item.district,
        item.address
      );
      this.customerInfo.customerInfoId = item.id;
    },
    // 查询 入户服务场景 数据字典
    getServiceEle() {
      const data = [
        { id: 1, name: "购买后指导家电使用" },
        { id: 2, name: "用户关怀（上门清洗保养）" },
        { id: 3, name: "未购买用户上门测量" }
      ];
      this.tagList = data;
    },
    // 添加产品
    chooseProduct() {
      /* 添加产品 */
      this.$router.push({
        name: "Houseservice.SearchProduct"
      });
    },
    deleteProduct(index) {
      // 删除产品
      this.productNames.splice(index, 1);
      this.productCodes.splice(index, 1);
      this.productCategory.splice(index, 1);
      this.productCategoryName.splice(index, 1);
    },
    inputMax() {
      const strResult = String(this.customerInfo.description);
      if (strResult.length > 100) {
        Toast.failed("最多可输入100个字符！");
        this.customerInfo.description = strResult.slice(0, 100);
      }
    },
    // 取消
    dealCancle() {
      this.$router.go(-1);
      // this.$destroy();
    },
    // 保存
    dealSave() {
      if (
        this.customerInfo.servicescape === undefined ||
        this.customerInfo.servicescape === ""
      ) {
        Toast.failed("入户服务场景不能为空");
        return;
      }
      if (
        this.customerInfo.serviceTime === undefined ||
        this.customerInfo.serviceTime === ""
      ) {
        Toast.failed("计划服务时间不能为空");
        return;
      }
      if (
        this.customerInfo.servicerName === undefined ||
        this.customerInfo.servicerName === ""
      ) {
        Toast.failed("服务人不能为空");
        return;
      }
      debugger;
      if (
        this.customerInfo.serviceAddress === undefined ||
        this.customerInfo.serviceAddress === ""
      ) {
        Toast.failed("入户服务地址不能为空");
        return;
      }
      // 处理选择的产品
      this.customerInfo.productNames = this.productNames.join(",");
      this.customerInfo.productCodes = this.productCodes.join(",");
      this.customerInfo.productCategory = this.productCategory.join(",");
      this.customerInfo.productCategoryName = this.productCategoryName.join(
        ","
      );
      if (this.orderFollowId) {
        this.customerInfo.orderFollowId = this.orderFollowId;
      }
      console.log(this.customerInfo);
      if (!this.isChangePlan) {
        // 新增计划
        this.houseService.createPlanService(this.customerInfo, {}).then(res => {
          if (res.code === 1) {
            Toast.succeed("保存成功");
            this.dealTip(res.data);
          }
        });
      } else {
        // 修改计划
        this.houseService.changePlanService(this.customerInfo, {}).then(res => {
          if (res.code === 1) {
            Toast.succeed("保存成功");
            this.dealTip(res.data);
          }
        });
      }
    },
    dealAddress(str) {
      const obj = JSON.parse(str);
      if (typeof obj.addressName !== "undefined") {
        // 选择地址
        this.customerInfo.serviceAddress = obj.addressName;
        this.customerInfo.customerInfoId = obj.customerInfoId;
      }
      console.log(this.customerInfo);
    },
    dealTip(id) {
      if (this.isTip) {
        let host = `${window.location.protocol}//${window.location.host}`;
        if (host.indexOf("localhost") > -1) {
          host = "https://testdb.haier.net";
        }
        const url = `${host}/houseservice/checkPlan?id=${id}`;
        const endDate = new Date(
          this.customerInfo.serviceTime.replace(/-/g, "/")
        );
        const tipInfo = {
          hmcId: this.customerInfo.servicerId,
          jumpPage: url,
          remindTitle: `${this.tagName}——${this.customerInfo.userName}`,
          remindType: "1",
          topEndTime: endDate,
          topStartTime: ""
        };
        switch (this.activeOffset) {
          case "0":
            tipInfo.topStartTime = this.getTipTime(3, "d");
            break;
          case "1":
            tipInfo.topStartTime = this.getTipTime(1, "d");
            break;
          case "2":
            tipInfo.topStartTime = this.getTipTime(2, "h");
            break;
          case "3":
            tipInfo.topStartTime = this.getTipTime(1, "h");
            break;
        }
        this.basicService
          .sellerRemind(
            {
              ...tipInfo
            },
            {}
          )
          .then(res => {
            if (res.code === 1) {
              debugger;
              this.$router.push({
                name: "Houseservice.HouseServiceEntry"
              });
            }
          });
      } else {
        this.$router.push({
          name: "Houseservice.HouseServiceEntry"
        });
      }
    },
    getTipTime(num, type) {
      const startDate = new Date(
        this.customerInfo.serviceTime.replace(/-/g, "/")
      );
      let endDate = "";
      if (type === "d") {
        endDate = new Date(startDate.getTime() - num * 24 * 60 * 60 * 1000);
      } else if (type === "h") {
        endDate = new Date(startDate.getTime() - num * 60 * 60 * 1000);
      }
      return endDate;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "Houseservice.HouseServiceEntry") {
      this.$destroy();
    }
    next();
  }
};
</script>
<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 191px;
  background: #fff;
  padding: 27px 24px;
  img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
  }
  .right-content {
    flex-grow: 1;
    padding: 4px 0 0 26px;
    .user-info {
      display: flex;
      justify-content: space-between;
      span:nth-child(1) {
        font-size: 30px;
        color: #333;
        margin-right: 30px;
      }
      span:nth-child(2) {
        font-size: 28px;
        color: #999999;
      }
      span:nth-child(3) {
        font-size: 28px;
        color: #999999;
      }
      .mobile {
        height: 48px;
        line-height: 48px;
        background: #4a90e2;
        border-radius: 24px;
        padding: 0 24px 0 60px;
        color: #fff;
        position: relative;
        span {
          color: #fff;
          position: absolute;
          left: 20px;
          top: 3px;
        }
      }
    }
  }
}
.cue {
  font-size: 24px;
  line-height: 36px;
  padding: 24px 25px;
}
form {
  .form-title {
    margin-left: 25px;
  }
  .hourseService-date {
    width: 320px;
    color: #999;
    font-size: 28px;
    .b-date-picker-ipt {
      border: none !important;
    }
    .iconfont {
      display: none;
    }
  }
  .icon-dingwei {
    color: #1969c6 !important;
    font-size: 5.333vw !important;
  }
  .address-item {
    height: 74px;
    line-height: 74px;
    background: #fff;
    font-size: 28px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    justify-content: space-between;
    .address-form-item {
      input {
        width: 470px;
        text-align: right;
        font-size: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: none;
      }
    }
  }
  .join-person templet {
    span:nth-child(1) {
      color: #999999;
      margin-right: 10px;
    }
    span:nth-child(2) {
      color: #4a90e2;
      font-size: 30px;
    }
  }
  .choosedProduces {
    padding: 24px;
    span:nth-child(1) {
      margin-right: 13px;
    }
    .product-item {
      font-size: 28px;
      color: #333;
    }
  }
  .remarks {
    margin-top: 24px;
    background: #fff;
    color: #666;
    div {
    }
    padding: 24px 23px 24px 28px;
    textarea {
      line-height: 33px;
      margin-top: 24px;
      font-size: 28px;
      border: none;
    }
  }
  .b-date-picker-ipt {
    text-align: right;
    padding: 0;
    span {
      width: 100%;
    }
  }
}
footer {
  padding: 24px;
  .md-example-section {
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
      height: 84px;
    }
  }
}
.rows {
  display: flex;
  justify-content: space-between;
}
.tag-style {
  padding: 5px 10px;
  background: #eee;
  color: #333;
  border-radius: 8px;
  margin-right: 16px;
}
.tag-style.active {
  background: #2f86f6;
  color: #fff;
}
.bg-white {
  background: #fff;
}
.p24 {
  padding: 24px;
}
.br-b {
  border-bottom: 1px solid #d0d0d0;
}
.mt2 {
  margin-top: 2px;
}
.ml10 {
  margin-left: 10px;
}
.mbn {
  margin-bottom: 0 !important;
}
.fs20 {
  font-size: 20px;
}
.fs28 {
  font-size: 28px;
}
.fs34 {
  font-size: 34px;
}
.icon-color {
  color: #4a90e2;
}
.text-333 {
  color: #333333;
}
.text-666 {
  color: #666666;
}
.text-ccc {
  color: #cccccc;
}
.text-warning {
  color: #f5a623;
}
.text-primary {
  color: #1969c6;
}
.text-bold {
  font-weight: bold;
}
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 689px;
    height: 719px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    padding-top: 90px;
    
  }
  .listClass{
    overflow-y: auto;
    padding: 15px;
    width: 689px;
    height: 619px;
  }
  .close-btn {
    position: absolute;
    top: 26px;
    right: 26px;

    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
  .leftClass {
    display: flex;
    flex-direction: column;
  }
  .rowClass {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 120px;
    border-bottom: 1px solid #eeeeee;
    align-items: center;
    font-size: 30px;
  }
}
</style>
