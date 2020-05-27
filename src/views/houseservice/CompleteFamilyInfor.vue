<template xmlns:v-slot="">
  <div id="apply">
    <!--    表单信息-->
    <div class="content-infor">
      <nav class="mt16">
        <ul>
          <li :class="{'active':tabIndex==0}" @click="tabChange(0)">预约信息</li>
          <li :class="{'active':tabIndex==1}" @click="tabChange(1)">住宅信息</li>
          <li :class="{'active':tabIndex==2}" @click="tabChange(2)">家电产品</li>
        </ul>
      </nav>
      <div class="tab-show">
        <!-- 预约信息 -->
        <div v-show="tabIndex==0" class="tab-item">
          <form class>
            <b-item class="br-b mt16" title="顾客信息:" :value="customerInfo.servicerName"></b-item>
            <b-item
              class="br-b mt16"
              title="入户服务场景"
              :value="tagName"
              :arrow="true"
              @click.native="serviceScape(0)"
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
              <template slot="left">
                <span>(选填)</span>
                <span class="icon iconfont icon-wenhao"></span>
              </template>
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
            <!-- <b-item
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
            </ul>-->
            <!-- <div class="rows br-b bg-white p24 mt16 fs28">
              <label>加入我的日程提醒</label>
              <md-switch v-model="isTip" />
            </div> -->
            <!-- <div v-show="isTip" class="br-b bg-white p24 fs28">
        <span :class="[{'active':activeOffset==='0'},'tag-style']" @click="clickTag('0')">提前三天</span>
        <span :class="[{'active':activeOffset==='1'},'tag-style']" @click="clickTag('1')">提前一天</span>
        <span :class="[{'active':activeOffset==='2'},'tag-style']" @click="clickTag('2')">提前2小时</span>
        <span :class="[{'active':activeOffset==='3'},'tag-style']" @click="clickTag('3')">提前1小时</span>
            </div>-->
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

        <!-- 住宅信息 -->
        <div v-show="tabIndex==1" class="tab-item">
          <b-item class="br-b mt16" title="顾客信息:" :value="customerInfo.servicerName"></b-item>
          <div class="addressInfor-item mt16 br-b">
            <label>小区名称</label>
            <div class="address-form-item">
              <input
                class="text-666"
                type="text"
                placeholder="请输入入户小区"
                v-model="familyCompleteInfo.communityName"
              />
            </div>
          </div>
          <div class="addressInfor-item br-b">
            <label>地理位置</label>
            <div class="address-form-item">
              <input
                class="text-666"
                type="text"
                placeholder="请输入入户地理位置"
                v-model="familyCompleteInfo.location"
              />
              <span class="icon iconfont icon-dingwei icon-color fs34 ml10"></span>
            </div>
          </div>
          <div class="addressInfor-item br-b leixClass">
            <label>类型</label>
            <div>
              <md-radio name="1" v-model="familyCompleteInfo.familyType" label="城市" inline />
              <md-radio name="0" v-model="familyCompleteInfo.familyType" label="农村" inline />
            </div>
          </div>

          <b-item
            class="br-b"
            title="小区档次"
            :value="houseAreaLevelName"
            :arrow="true"
            @rightClick="serviceScape(1)"
            @arrowClick ="serviceScape(1)"
          ></b-item>
          <!-- <div class="addressInfor-item br-b">
            <label>建筑面积</label>
            <div class="address-form-item">
              <input
                class="text-666"
                type="number"
                @input="inputChange"
                placeholder="请输入入户小区面积"
                v-model="familyCompleteInfo.area"
              />
              平方米
            </div>
          </div>-->
          <b-item
            class="br-b"
            title="户型"
            :value="houseTypeName"
            :arrow="true"
            @rightClick="serviceScape(2)"
            @arrowClick ="serviceScape(2)"
          ></b-item>
          <!-- <div class="addressInfor-item br-b">
            <label>均价</label>
            <div class="address-form-item">
              <input
                class="text-666"
                type="number"
                @input="inputChange"
                placeholder="请输入均价"
                v-model.number="familyCompleteInfo.avgPrice"
              />
              元/平方米
            </div>
          </div>-->
          <div class="addressInfor-item br-b mt16">
            <label>家庭成员数</label>
            <div class="address-form-item">
              <input
                class="text-666"
                type="number"
                placeholder="请输入家庭成员数量"
                @input="inputDeal"
                v-model="familyCompleteInfo.memberNum"
              />
              人
            </div>
          </div>
          <b-item
            class="br-b"
            title="与地址家庭于用户关系"
            :value="addressRelationName"
            :arrow="true"
            @rightClick="serviceScape(3)"
            @arrowClick ="serviceScape(3)"
          ></b-item>
          <div class="br-b family-tag-area">
            <label class="fs28">该地址家庭标签</label>
            <div class="tagList">
              <span
                class="family-tag"
                ref="tagJudges"
                @click="clickFamilyTag(i, index)"
                v-for="(i, index) in familyTagList"
                :key="index"
              >{{i}}</span>
              <span class="add-family-tag" @click="addLabel">+ 新建标签</span>
            </div>
          </div>
          <div class="remarks">
            <div>用户及家庭成员信息备注</div>
            <textarea
              placeholder="请输入用户的备注信息，200字以内..."
              placeholder-style="font-size: 28px; color:#999;"
              class="w100per"
              rows="3"
              v-model="familyCompleteInfo.memberRemarks"
              @input="delKeyNum"
            ></textarea>
          </div>
        </div>
        <!-- 家电产品 -->
        <div v-show="tabIndex==2" class="tab-item">
          <b-item class="br-b mt16" title="顾客信息:" :value="customerInfo.servicerName"></b-item>
          <div class="products-total">
            <div class="total-item">
              <div class="mt30">品牌</div>
              <div class="mt20">
                <span class="text-primary">{{familyCompleteInfo.totalBrand}}</span>个
              </div>
            </div>
            <div class="total-item">
              <div class="mt30">品类</div>
              <div class="mt20">
                <span class="text-primary">{{familyCompleteInfo.totalCategory}}</span>个
              </div>
            </div>
            <div class="total-item">
              <div class="mt30">产品</div>
              <div class="mt20">
                <span class="text-primary">{{familyCompleteInfo.totalProduct}}</span>(件/台)
              </div>
            </div>
          </div>
          <div class="fs30 mt24 ml25 text-333">产品明细列表</div>
          <div
            class="product-show-item"
            v-for="(item, index) in familyCompleteInfo.customerHeaInfoList"
            :key="index"
          >
            <!--            <img v-if="item.img" :src="item.img[0]">-->
            <img v-if="imgList[item.id] !== '0'" :src="imgList[item.id]" />
            <img v-else src="@/assets/images/houseServicer/no_img.png" />
            <div class="product-infor">
              <div class="infor-rows">
                <span
                  v-if="item.brandItemCode"
                  class="fs28 text-333"
                >{{BrandName(item.brandItemCode)}}-{{groupName(item.categoryItemCode)}}</span>
                <span v-else class="fs28 text-333">{{item.name}}</span>
                <span v-if="item.price" class="fs28 text-primary">￥{{item.price}}</span>
              </div>
              <div class="infor-rows fs24 text-666 mt5">
                <span>类别：{{groupName(item.categoryItemCode)}}</span>
                <span>数量：1</span>
              </div>
              <div class="infor-rows fs24 text-666 mt5">
                <span v-if="item.purchaseDate">购买时间:{{buyTime(item.purchaseDate)}}</span>
              </div>
              <div class="mt5">
                <span
                  class="product-tag"
                  v-for="(item1, index1) in groupAppraiseCodeList(item.groupAppraiseCode)"
                  :key="index1"
                >{{item1}}</span>
              </div>
              <div class="mt16">
                <span class="btn-xs btn-primary" @click="editProduct(item)">编辑</span>
                <span class="btn-xs btn-danger" @click="deleteProduct(item)">删除</span>
              </div>
            </div>
          </div>
          <div @click="addProduct" class="addProduct">+</div>
        </div>
      </div>
    </div>
    <!--    底部按钮-->
    <footer v-show="tabIndex == '1'">
      <template>
        <div class="md-example-child md-example-child-button md-example-child-button-3">
          <div class="md-example-section">
            <md-button type="primary" inline @click="dealSave">保存</md-button>
          </div>
        </div>
      </template>
    </footer>
    <footer v-show="tabIndex == '0'">
      <template>
        <div class="md-example-child md-example-child-button md-example-child-button-3">
          <div class="md-example-section-q">
            <md-button type="primary" inline @click="yyxxdealSave">确认修改</md-button>
          </div>
        </div>
      </template>
    </footer>
    <b-pop-check-list type="radio" :show.sync="tagPopShow0" :list="tagList" v-model="tag"></b-pop-check-list>
    <div class="orderentry-address">
      <b-pop-address-list
        :show.sync="addressPopShow"
        :list="addressList"
        @addNew="addAddress"
        @editAddress="editAddress"
        @clickAddress="selectAddress"
      ></b-pop-address-list>
    </div>
    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow"
      :list="GRADEList"
      v-model="houseAreaLevelV"
    ></b-pop-check-list>

    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow1"
      :list="HOUSETYPEList"
      v-model="houseTypeV"
    ></b-pop-check-list>

    <b-pop-check-list
      type="radio"
      :show.sync="tagPopShow2"
      :list="FAMILYList"
      v-model="addressRelationV"
    ></b-pop-check-list>
    <md-dialog title="新建标签" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">
      <input type="text" class="dialog-input" v-model="addLabelValue" />
    </md-dialog>
  </div>
</template>

<script>
import {
  Toast,
  Popup,
  PopupTitleBar,
  Button,
  Icon,
  Tabs,
  TabPane,
  Dialog,
  Switch,
  Radio,
  Field,
  FieldItem
} from 'mand-mobile';

import {
  BDatePicker,
  BItem,
  BPopAddressList,
  BPopCheckList
} from '@/components/form';

// eslint-disable-next-line no-unused-vars
import addressData from '@/lib/address';

export default {
  name: 'CompleteFamilyInfor',
  components: {
    [Toast.name]: Toast,
    BItem,
    BDatePicker,
    BPopCheckList,
    // eslint-disable-next-line vue/no-unused-components
    BPopAddressList,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Dialog.name]: Dialog,
    [Switch.name]: Switch,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio
  },
  data() {
    return {
      addressPopShow: false,
      addressList: [],
      isTip: false,
      productNames: [],
      pattern: 'yyyy-MM-dd hh:mm',
      isTaizhang: false,
      tabIndex: 0,
      tagPopShow0: false, // 服务场景
      tagPopShow: false,
      tagPopShow1: false,
      tagPopShow2: false,
      GradeList: [],
      houseAreaLevelV: [], // 小区档次
      houseTypeV: [],
      addressRelationV: [], // 地址家庭与用户的关系
      familyActiveTags: [],
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel
          },
          {
            text: '确认操作',
            handler: this.onBasicConfirm
          }
        ]
      },
      addLabelValue: '',
      tag: [],
      tagList: [],
      tag1: [],
      tagList1: [],
      customerInfo: {
        title: '',
        customerId: '',
        customerInfoId: '',
        userId: '',
        userName: '',
        userPhone: '',
        servicescape: '', // 入户服务场景
        appointmentTime: '', // 用户预约时间
        serviceTime: '', // 计划上门时间
        servicerId: '', // 服务人ID
        servicerName: '', // 服务人姓名
        accompanyingId: '', // 随行人ID
        accompanyingName: '', // 随行人姓名
        giftId: '', // 服务礼品ID
        giftName: '', // 服务礼品名称
        productCodes: '', // 购买产品编码
        productNames: '', // 购买产品名称
        productCategory: '', // 产品组编码
        productCategoryName: '', // 产品组名称
        serviceAddress: '', // 入户服务地址
        description: '', // 备注
        warnFlag: '', // 是否加入提醒
        flag: 0 // 服务计划类型
      },
      BRANDList: [],
      FAMILYList: [],
      HOUSETYPEList: [],
      GRADEList: [],
      productGroupName: [],
      familyTagList: [],
      familyCompleteInfo: {
        familyType: '1', // 类型 默认城市
        area: '0', // 面积
        avgPrice: '0', // 均价
        communityName: '', // 小区名称
        customerFamilyId: '',
        customerHeaInfoList: [
          {
            brandItemCode: null,
            buyingChannel: null,
            categoryItemCode: null,
            customerFamilyId: null,
            customerId: null,
            frequency: null,
            groupAppraiseCode: null,
            havePicture: null,
            id: '',
            img: [],
            name: '',
            picUrlList: '',
            price: '',
            purchaseDate: ''
          }
        ], // 家电信息列表
        familyItemCode: '', // 家庭住址类型字典分类代码
        gradeItemCode: '', // 小区档次字典代码
        groupCompositionCode: '', // 家庭结构标签代码 标签表代码
        housetypItemCode: '', // 户型
        location: '', // 地理位置
        memberNum: null, // 家庭成员数量
        memberRemarks: '', // 家庭成员信息描述
        totalBrand: 0, // 品牌数量
        totalCategory: 0, // 品类的数量
        totalProduct: 0 // 产品数量
      },
      imgList: {}
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
          name = '';
        }
        that.customerInfo.servicescape = this.tag[0];
        return name;
      }
      return '';
    },
    houseAreaLevelName() {
      if (this.houseAreaLevelV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.familyCompleteInfo.gradeItemCode = this.houseAreaLevelV[0];
        const tagObj = this.GRADEList.find(
          v => v.id === this.houseAreaLevelV[0]
        );
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
      return '';
    },
    houseTypeName() {
      if (this.houseTypeV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.familyCompleteInfo.housetypItemCode = this.houseTypeV[0];
        const tagObj = this.HOUSETYPEList.find(
          v => v.id === this.houseTypeV[0]
        );
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
      return '';
    },
    addressRelationName() {
      if (this.addressRelationV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.familyCompleteInfo.familyItemCode = this.addressRelationV[0];
        const tagObj = this.FAMILYList.find(
          v => v.id === this.addressRelationV[0]
        );
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
      return '';
    },
    BrandName() {
      return (brandCode) => {
        let brandName = '';
        this.BRANDList.forEach((item) => {
          if (item.itemCode === brandCode.padStart(3, '0')) {
            brandName = item.name;
          }
        });
        return brandName;
      };
    },
    groupName() {
      return (groupCode) => {
        let groupCodeName = '';
        this.productGroupName.forEach((item) => {
          if (item.groupCode === groupCode) {
            groupCodeName = item.groupName;
          }
        });
        return groupCodeName;
      };
    },
    buyTime() {
      return (time) => {
        const date = new Date(time);
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date
          .getDate()
          .toString()
          .padStart(2, '0');
        return `${y}-${m}-${d}`;
      };
    },
    groupAppraiseCodeList() {
      return (groupAppraiseCode) => {
        if (groupAppraiseCode) {
          return groupAppraiseCode.split(',');
        }
      };
    },
    // eslint-disable-next-line vue/return-in-computed-property
    groupCompositionCode() {
      if (this.familyCompleteInfo.groupCompositionCode) {
        return this.familyCompleteInfo.groupCompositionCode.split(',');
      }
    }
  },
  mounted() {},
  activated() {
    let customerInfo = {};
    const {
      customerInfo: customerInforTemp
    } = this.$route.query;
    if (customerInforTemp && typeof customerInforTemp === 'string') {
      customerInfo = JSON.parse(customerInforTemp);
    }
    if (this.$route.query.customerId && !this.isTaizhang) {
      this.planId = customerInfo.id;
      this.customerInfoId = this.$route.query.customerId;
      this.customerInfo = customerInfo;
      // this.tabIndex = this.$route.query.tabState;
      // this.queryDetail(this.$route.query.customerId);
      this.getFamilyInfo();
    } else if (this.isTaizhang) {
      this.getFamilyInfo();
    }
    // 修改计划
    if (customerInfo) {
      this.productNames = [];
      this.productCodes = [];
      this.productCategory = [];
      this.productCategoryName = [];
      this.tag = [];
      this.tagList1 = [];
      this.isChangePlan = true;
      this.customerInfo = customerInfo;
      if (this.customerInfo.warnFlag === 0) {
        this.isTip = true;
      } else {
        this.isTip = false;
      }
      // if (
      //   this.customerInfo.productCodes !== ''
      //   && this.customerInfo.productCodes !== null
      // ) {
      //   this.productNames = this.customerInfo.productNames.split(',');
      //   this.productCodes = this.customerInfo.productCodes.split(',');
      // }
      // if (
      //   this.customerInfo.productCategory !== ''
      //   && this.customerInfo.productCategory !== null
      // ) {
      //   this.productCategory = this.customerInfo.productCategory.split(',');
      //   this.productCategoryName = this.customerInfo.productCategoryName.split(
      //     ','
      //   );
      // }
      this.tag[0] = customerInfo.servicescape;
      this.tag1[0] = customerInfo.giftId;
      // 查询客户地址列表
      this.queryCustomerAddressList();
    }
  },
  created() {
    this.addressData = addressData;
    this.getServiceEle();
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function () {
      const nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight - nowClientHeight > 60) {
        // 因为ios有自带的底部高度
        // 键盘弹出的事件处理
        document.getElementById('apply').classList.add('focusState');
      } else {
        // 键盘收起的事件处理
        document.getElementById('apply').classList.remove('focusState');
      }
    };
    /* 获取字典数据 */
    // 品牌类型
    this.productService.commonTypeQuery('BRAND').then((res) => {
      if (res.code === 1) {
        res.data.forEach((item) => {
          item.name = item.itemName;
          delete item.itemName;
        });
        this.BRANDList = res.data;
      }
    });
    // 家庭住址类型字典
    this.productService.commonTypeQuery('FAMILY-ITEM').then((res) => {
      if (res.code === 1) {
        // 统一数据key
        res.data.forEach((item) => {
          item.name = item.itemName;
          delete item.itemName;
        });
        this.FAMILYList = res.data;
      }
    });
    // 家庭户型字典
    this.productService.commonTypeQuery('HOUSETYPE_ITEM').then((res) => {
      if (res.code === 1) {
        res.data.forEach((item) => {
          item.name = item.itemName;
          delete item.itemName;
        });
        this.HOUSETYPEList = res.data;
      }
    });
    // 小区档次字典
    this.productService.commonTypeQuery('GRADE_ITEM').then((res) => {
      if (res.code === 1) {
        // 统一数据key
        res.data.forEach((item) => {
          item.name = item.itemName;
          delete item.itemName;
        });
        this.GRADEList = res.data;
      }
    });
    // 产品类别字典
    this.productGroupName = [
      { id: '1', groupCode: 'BX', groupName: '冰箱' },
      { id: '2', groupCode: 'XYJ', groupName: '洗衣机' },
      { id: '3', groupCode: 'DS', groupName: '电视' },
      { id: '4', groupCode: 'KT', groupName: '空调' },
      { id: '5', groupCode: 'KX', groupName: '烤箱' },
      { id: '6', groupCode: 'BG', groupName: '冰柜' },
      { id: '7', groupCode: 'DN', groupName: '电脑' },
      { id: '8', groupCode: 'RSQ', groupName: '热水器' },
      { id: '9', groupCode: 'JSQ', groupName: '净水器' },
      { id: '10', groupCode: 'XDG', groupName: '消毒柜' },
      { id: '11', groupCode: 'RQZ', groupName: '燃气灶' },
      { id: '12', groupCode: 'XWJ', groupName: '洗碗机' },
      { id: '13', groupCode: 'YYJ', groupName: '油烟机' },
      { id: '14', groupCode: 'SJ', groupName: '手机' },
      { id: '15', groupCode: 'QT', groupName: '其他' }
    ];
    // 家庭结构字典
    this.productService.commonTypeQuery('group_composition_code').then((res) => {
      if (res.code === 1) {
        const arr = [];
        res.data.forEach((item) => {
          arr.push(item.itemName);
        });
        this.familyTagList = arr;
      }
    });
    if (this.$route.query.customerInfoId) {
      // 台账过来的
      this.isTaizhang = true;
      this.tabIndex = this.$route.query.tabState;
      this.customerInfoId = this.$route.query.customerInfoId;
      this.customerId = this.$route.query.customerId;
      this.customerInfo.userName = this.$route.query.userName;
      this.customerInfo.userPhone = this.$route.query.userPhone;
      this.getFamilyInfo();
      // this.queryDetail(this.$route.query.customerInfoId);
    }
  },
  methods: {
    addAddress() {
      // 添加新地址
      this.region = 'add';
      this.$router.push({
        name: 'Houseservice.ChooseAddress',
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
      this.region = 'edit';
      this.$router.push({
        name: 'Houseservice.ChooseAddress',
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
    queryAddress() {
      this.addressPopShow = true;
    },
    chooseJoinPerson() {
      // 进入随行参与人页面
      this.$router.push({
        name: 'Houseservice.SearchAccompanying',
        params: {}
      });
    },
    // 查询 入户服务场景 数据字典
    getServiceEle() {
      const data = [
        { id: 1, name: '购买后指导家电使用' },
        { id: 2, name: '用户关怀（上门清洗保养）' },
        { id: 3, name: '未购买用户上门测量' }
      ];
      this.tagList = data;
    },
    inputMax() {
      const strResult = String(this.customerInfo.description);
      if (strResult.length > 100) {
        Toast.failed('最多可输入100个字符！');
        this.customerInfo.description = strResult.slice(0, 100);
      }
    },
    // 查询客户地址列表
    queryCustomerAddressList() {
      this.productService
        .customerAddressList(this.customerInfo.customerId)
        .then((res) => {
          if (res.code === 1) {
            const Data = this.addressData.options;
            res.data.forEach((address) => {
              address.consignee = {};
              Data.forEach((p) => {
                if (address.province === p.value) {
                  address.consignee.provinceName = p.label;
                  p.children.options.forEach((c) => {
                    if (address.city === c.value) {
                      address.consignee.cityName = c.label;
                      c.children.options.forEach((d) => {
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

    inputChange() {
      if (
        this.familyCompleteInfo.area > 10000
        || this.familyCompleteInfo.area < 0
      ) {
        Toast.failed('请输入正确范围数值0~10000');
        this.familyCompleteInfo.area = null;
      }
      if (
        this.familyCompleteInfo.avgPrice > 10000
        || this.familyCompleteInfo.avgPrice < 0
      ) {
        Toast.failed('请输入正确范围数值0~10000');
        this.familyCompleteInfo.avgPrice = null;
      }
    },
    delKeyNum() {
      if (this.familyCompleteInfo.memberRemarks.length > 200) {
        Toast.failed('最多输入200个字');
        this.familyCompleteInfo.memberRemarks = this.familyCompleteInfo.memberRemarks.substr(
          0,
          200
        );
      }
    },
    tabChange(index) {
      this.tabIndex = index;
    },
    queryDetail(id) {
      // 根据ID查询入户计划详情
      const param = { id };
      this.houseService.queryDetailById(param).then((res) => {
        if (res.code === 1) {
          this.customerInfo = res.data;
          this.customerInfoId = this.customerInfo.customerInfoId;
          this.getFamilyInfo(); // 查询家庭资料详情
        }
      });
    },
    serviceScape(index) {
      if (index === 0) {
        /* 入户服务场景标签显示隐藏 */
        this.tagPopShow0 = true;
      }
      if (index === 1) {
        this.tagPopShow = true;
      }
      if (index === 2) {
        this.tagPopShow1 = true;
      }
      if (index === 3) {
        this.tagPopShow2 = true;
      }
    },
    getFamilyInfo() {
      // 查询家庭成员信息
      this.basicService.queryFamilyInfo(this.customerInfoId).then((res) => {
        if (res.code === 1) {
          this.familyCompleteInfo = res.data;
          this.familyCompleteInfo.familyType = `${this.familyCompleteInfo.familyType}`;
          this.houseAreaLevelV[0] = res.data.gradeItemCode; // 小区档次
          this.houseTypeV[0] = res.data.housetypItemCode; // 户型
          this.addressRelationV[0] = res.data.familyItemCode; // 用户与地址的关系
          if (res.data.groupCompositionCode) {
            this.familyActiveTags = res.data.groupCompositionCode.split(',');
            this.familyActiveTags.forEach((item) => {
              this.$refs.tagJudges.forEach((item1, index1) => {
                if (item === item1.innerHTML) {
                  this.$refs.tagJudges[index1].classList.add('familyTagActive');
                }
              });
            });
          }
          // 查询产品图片信息
          if (res.data.customerHeaInfoList.length > 0) {
            res.data.customerHeaInfoList.forEach((item, index) => {
              if (item.id) {
                this.basicService.queryHoseHoldPictures(item.id).then((res1) => {
                  if (res1.code === 1) {
                    if (res1.data.length === 0) {
                      res.data.customerHeaInfoList[index].havePicture = false;
                      this.$set(this.imgList, item.id, '0');
                    } else {
                      this.$set(this.imgList, item.id, res1.data[0]);
                      res.data.customerHeaInfoList[index].havePicture = true;
                      this.familyCompleteInfo.customerHeaInfoList[index].img = res1.data;
                    }
                  }
                });
              }
            });
          }
        }
      });
    },

    // 家庭标签选择
    clickFamilyTag(i, indexNum) {
      let state = false;
      if (this.familyActiveTags.indexOf(i) > -1) {
        this.familyActiveTags.forEach((item, index, arr) => {
          if (item == i) {
            arr.splice(index, 1);
            state = false;
            return false;
          }
        });
      } else {
        state = true;
        this.familyActiveTags.push(i);
      }
      if (state) {
        this.$refs.tagJudges[indexNum].classList.add('familyTagActive');
      } else {
        this.$refs.tagJudges[indexNum].classList.remove('familyTagActive');
      }
    },
    addLabel() {
      this.basicDialog.open = true;
    },
    onBasicConfirm() {
      if (this.addLabelValue != '') {
        if (this.familyTagList.indexOf(this.addLabelValue) > -1) {
          Toast.failed('该标签已经存在请重新输入');
          this.addLabelValue = '';
          return;
        }
        this.familyTagList.push(this.addLabelValue);

        this.basicDialog.open = false;
      }
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
    // 新增产品
    addProduct() {
      this.customerInfo.customerInfoId = this.customerInfoId;
      if (this.customerId) {
        this.customerInfo.customerId = this.customerId;
      }
      this.$router.push({
        name: 'Houseservice.AddNewProduct',
        params: {
          customerInfo: this.customerInfo,
          BRANDList: this.BRANDList,
          productGroupName: this.productGroupName
        }
      });
    },
    // 编辑产品
    editProduct(item) {
      this.$router.push({
        name: 'Houseservice.AddNewProduct',
        params: {
          productInfo: item,
          customerInfo: this.customerInfo,
          BRANDList: this.BRANDList,
          productGroupName: this.productGroupName
        }
      });
    },
    // 删除产品
    deleteProduct(item) {
      this.basicService.deleteHouseHold(item.id).then((res) => {
        if (res.code === 1) {
          Toast.succeed('删除成功');
          this.getFamilyInfo();
        }
      });
    },
    // 取消
    dealCancle() {
      this.$router.go(-1);
      this.$destroy();
    },
    // 预约信息 保存i
    yyxxdealSave() {
      if (this.isTip) { // 是否加入提醒
        this.customerInfo.warnFlag = '0';
      } else {
        this.customerInfo.warnFlag = '1';
      }
      if (
        this.customerInfo.servicescape === undefined
        || this.customerInfo.servicescape === ''
      ) {
        Toast.failed('入户服务场景不能为空');
        return;
      }
      if (
        this.customerInfo.serviceTime === undefined
        || this.customerInfo.serviceTime === ''
      ) {
        Toast.failed('计划服务时间不能为空');
        return;
      }
      if (
        this.customerInfo.servicerName === undefined
        || this.customerInfo.servicerName === ''
      ) {
        Toast.failed('服务人不能为空');
        return;
      }
      if (
        this.customerInfo.serviceAddress === undefined
        || this.customerInfo.serviceAddress === ''
      ) {
        Toast.failed('入户服务地址不能为空');
        return;
      }
      // 处理选择的产品
      this.customerInfo.productNames = this.productNames.join(',');
      this.customerInfo.productCodes = this.productCodes.join(',');
      this.customerInfo.productCategory = this.productCategory.join(',');
      this.customerInfo.productCategoryName = this.productCategoryName.join(
        ','
      );
      if (this.orderFollowId) {
        this.customerInfo.orderFollowId = this.orderFollowId;
      }
      console.log(this.customerInfo);

      // 修改计划
      this.houseService.changePlanService(this.customerInfo, {}).then((res) => {
        if (res.code === 1) {
          Toast.succeed('保存成功');
          // this.dealTip(res.data);
        }
      });
    },
    // 保存
    dealSave() {
      this.familyCompleteInfo.groupCompositionCode = this.familyActiveTags.join(
        ','
      );
      const familyCompleteInfo = JSON.parse(
        JSON.stringify(this.familyCompleteInfo)
      );
      delete familyCompleteInfo.customerHeaInfoList;
      familyCompleteInfo.customerFamilyId = this.customerInfoId;
      console.log(familyCompleteInfo);
      if (
        familyCompleteInfo.communityName === ''
        || !familyCompleteInfo.communityName
      ) {
        Toast.failed('小区名称不能为空');
        return;
      }
      if (
        familyCompleteInfo.gradeItemCode === ''
        || !familyCompleteInfo.gradeItemCode
      ) {
        Toast.failed('小区档次不能为空');
        return;
      }
      familyCompleteInfo.area = '10';
      familyCompleteInfo.avgPrice = '10';
      // if (familyCompleteInfo.area === "" || !familyCompleteInfo.area) {
      //   Toast.failed("建筑面积不能为空");
      //   return;
      // }
      if (
        familyCompleteInfo.housetypItemCode === ''
        || !familyCompleteInfo.housetypItemCode
      ) {
        Toast.failed('户型不能为空');
        return;
      }
      // if (familyCompleteInfo.avgPrice === "" || !familyCompleteInfo.avgPrice) {
      //   Toast.failed("均价不能为空");
      //   return;
      // }
      if (
        familyCompleteInfo.memberNum === ''
        || !familyCompleteInfo.memberNum
      ) {
        Toast.failed('家庭成员人数不能为空');
        return;
      }
      if (
        familyCompleteInfo.familyType === ''
        || !familyCompleteInfo.familyType
      ) {
        Toast.failed('类型不能为空');
        return;
      }
      if (
        familyCompleteInfo.familyItemCode === ''
        || !familyCompleteInfo.familyItemCode
      ) {
        Toast.failed('该地址与用户关系不能为空');
        return;
      }
      // 修改住宅信息状态
      if (!this.isTaizhang) {
        this.houseService
          .completeFamily({
            planId: this.planId
          })
          .then((res) => {});
      }
      /* 修改顾客的住宅信息、家庭成员 */
      this.basicService.updataFamilyInfo(familyCompleteInfo, {}).then((res) => {
        if (res.code === 1) {
          Toast.succeed('保存成功！');
        }
      });
    },
    distinct(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
    },
    inputDeal() {
      const reg = /^[+]{0,1}(\d+)$/g;
      if (!reg.test(this.familyCompleteInfo.memberNum)) {
        Toast.failed('输入格式错误，请重新输入');
        this.familyCompleteInfo.memberNum = null;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Houseservice.AddNewProduct') {
      const obj = { customerInfo: this.customerInfo };
      to.query.customerInfo = JSON.stringify(obj);
    }
    if (to.name === 'Houseservice.CompleteUserInfor') {
      this.$destroy();
    }
    next(); // 必须要有这个，否则无法跳转
  }
};
</script>
<style lang="scss" scoped>
.tab-item {
  padding-bottom: 80px;
}
.focusState {
  position: absolute;
  left: 6px;
}
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

  .focus-tag {
    margin-top: 28px;

    .focused {
      height: 48px;
      line-height: 48px;
      color: #f5a623;
      border: 1px solid #f5a623;
      border-radius: 24px;
      margin-right: 16px;
      padding: 0 18px;
      font-size: 26px;
    }
  }
}

.content-infor {
  color: #666;
  font-size: 28px;

  nav {
    ul {
      display: flex;
      justify-content: center;
      width: 706px;
      margin: 0 auto;
      border-radius: 8px;
      background: #fff;
      li {
        width: 50%;
        height: 58px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid #1969c6;
        border-bottom: 1px solid #1969c6;
        border-top: 1px solid #1969c6;
        color: #1969c6;
      }

      li:first-child {
        border-left: 1px solid #1969c6;
      }

      li.active {
        background: #1969c6 !important;
        color: #fff;
      }
    }
  }

  .tab-show {
    padding: 0 !important;

    .addressInfor-item {
      height: 74px;
      line-height: 74px;
      background: #fff;
      font-size: 28px;
      padding-left: 24px;
      padding-right: 24px;
      display: flex;
      justify-content: space-between;

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
    .beizhustr {
      color: #888888;
      background: #fff;
      font-size: 28px;
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 48px;
      display: flex;
      justify-content: space-between;
    }
  }

  .family-tag-area {
    padding: 20px 24px 4px;
    background: #fff;
    font-size: 24px;

    .tagList {
      .familyTagActive {
        color: #1969c6;
        border-color: #1969c6 !important;
      }

      margin-top: 24px;

      .family-tag {
        line-height: 36px;
        padding: 0 17px;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        display: inline-block;
      }

      .add-family-tag {
        line-height: 36px;
        padding: 0 17px;
        border: 1px dashed #d0d0d0;
        border-radius: 8px;
        margin-right: 16px;
        margin-bottom: 16px;
        display: inline-block;
      }
    }
  }

  .products-total {
    margin-top: 16px;
    background: #fff;
    display: flex;
    height: 150px;
    justify-content: center;

    .total-item {
      width: 234px;
      text-align: center;
    }
  }

  .product-show-item {
    background: #fff;
    margin-top: 23px;
    padding: 24px;
    display: flex;
    justify-content: space-between;

    img {
      width: 150px;
      height: 150px;
      margin-right: 17px;
    }

    .product-infor {
      flex-grow: 1;

      .infor-rows {
        display: flex;
        justify-content: space-between;
      }

      .product-tag {
        font-size: 24px;
        color: #1969c6;
        background: #deebfa;
        padding: 2px;
        margin-right: 20px;
        border-radius: 6px;
      }

      .btn-xs {
        display: inline-block;
        font-size: 24px;
        padding: 5px 20px;
        border: 1px solid #eee;
        border-radius: 20px;
        margin-right: 10px;
      }

      .btn-primary {
        color: #1969c6;
        border-color: #1969c6 !important;
      }

      .btn-danger {
        color: #ff001f;
        border-color: #ff001f !important;
      }
    }
  }

  .addProduct {
    width: 80px;
    height: 80px;
    line-height: 70px;
    text-align: center;
    border-radius: 50%;
    background: #4a90e2;
    color: #fff;
    font-size: 80px;
    position: fixed;
    right: 20px;
    bottom: 200px;
  }

  .remarks {
    background: #fff;
    padding: 23px 25px;
    div {
      font-size: 28px;
      color: #666;
      margin-bottom: 16px;
    }
    textarea {
      border: none;
    }
  }
}

.dialog-input {
  margin: 0 auto;
  display: block;
  padding: 0 24px;
  border: 1px solid #999;
  height: 46px;
  line-height: 46px;
  border-radius: 8px;
}

.bItem-item-title {
  color: #666;
}
.bItem-item-right {
width: 200px;
}
.bItem-item-right-val {
  color: #666;
  width: 100px;
}

footer {
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 24px;

  .md-example-section {
    display: flex;
    justify-content: space-between;

    button {
      width: 100%;
      height: 84px;
    }
  }
  .md-example-section-q {
    display: flex;
    justify-content: space-between;

    button {
      width: 100%;
      height: 84px;
    }
  }
}

.br-b {  width: 100%;
  border-bottom: 1px solid #f5f5f5;
}

.mt2 {
  margin-top: 2px;
}

.mt5 {
  margin-top: 5px;
}

.mt24 {
  margin-top: 24px;
}

.ml25 {
  margin-left: 25px;
}

.ml10 {
  margin-left: 10px;
}

.mbn {
  margin-bottom: 0 !important;
}

.lh36 {
  line-height: 36px;
}

.fs30 {
  font-size: 30px;
}

.fs24 {
  font-size: 24px;
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

.text-primary {
  color: #1969c6;
}

.text-bold {
  font-weight: bold;
}
form {
  .form-title {
    margin-left: 25px;
  }
  .hourseService-date {
    width: 380px;
    color: #999;
    font-size: 28px;
    .b-date-picker {
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
  .join-person template {
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
  .b-date-picker {
    text-align: right;
    padding: 0;
    span {
      width: 100%;
    }
  }
}
.rows {
  display: flex;
  justify-content: space-between;
}
.p24 {
  padding: 24px;
}
.fs28 {
  font-size: 28px;
}
.bg-white {
  background: #fff;
}
.leixClass {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
