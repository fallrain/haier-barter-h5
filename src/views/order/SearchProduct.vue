<template>
  <div class="searchProduct">
    <!--<b-notice-bar
      :show.sync="noticeShow"
      content="温馨提示：点击下方的【扫描】，可扫产品能效贴自动带入产品型号。"
    >
    </b-notice-bar>-->
    <div class="searchProduct-scan">
      <div class="searchProduct-scan-head">
        <p class="searchProduct-scan-head-title">方式一：扫码自动获取型号（推荐）</p>
        <div
          class="searchProduct-scan-head-tips"
          @click="toggleDescription"
        >
          <span>扫码说明</span>
          <i
            class="iconfont icon-jiantou9"
            :class="[isShowDescription && 'reverse']"
          ></i>
        </div>
      </div>
      <ol
        class="searchProduct-scan-description"
        v-show="isShowDescription"
      >
        <li>1.点击下方扫码按钮启动摄像头后，对准顾客所购产品的样机机身上的能效标识二维码（右图红框内）扫描，即可自动获取产品型号。</li>
        <li class="dis-flex-sb">
          <span>2.扫描完成一个后可点击扫描按钮继续添加商品</span>
          <button
            type="button"
            class="searchProduct-scan-description-btn"
            @click="isShowDescription=false"
          >收起</button>
        </li>
      </ol>
      <div class="searchProduct-scan-cnt">
        <div class="searchProduct-scan-icon-par" @click="scanQRCodeAndShow()">
          <div
            class="searchProduct-scan-icon-wrap"
          >
            <i class="searchProduct-scan-icon iconfont icon-tubiaolunkuo-">
            </i>
          </div>
          <p class="searchProduct-scan-icon-tip">点击打开摄像头</p>
        </div>
        <div class="searchProduct-scan-example-img-par">
          <img
            src="@/assets/images/order/energy-example@2x.png"
            class="searchProduct-scan-example-img"
          >
          <p class="searchProduct-scan-example-img-tip">机身能效贴示例</p>
        </div>
      </div>
    </div>
    <!--<div
      class="searchProduct-scan-product"
      v-if="scanQRCodeProductList.length"
    >
      <p class="searchProduct-scan-product-title">已扫产品型号：</p>
      <ul class="searchProduct-scan-product-list">
        <li
          class="searchProduct-scan-product-item"
          v-for="(item,index) in scanQRCodeProductList"
          :key="item.productCode"
        >{{index + 1}}.
          <div class="searchProduct-scan-product-item-cnt">
            <span class="searchProduct-scan-product-item-name">{{item.productBrandName}}{{item.productGroupName}}</span>
            <span class="searchProduct-scan-product-item-code">{{item.productModel}}</span>
          </div>
          <i
            class="iconfont icon-chahao searchProduct-scan-product-item-del"
            @click="delScannedProduct(index)"
          ></i>
        </li>
      </ul>
      <div class="searchProduct-scan-product-btn-par">
        <button
          type="button"
          class="searchProduct-scan-product-btn"
          @click="choseProductsAndBack"
        >完成
        </button>
      </div>
    </div>-->
    <div class="searchProduct-scan mt20">
      <div class="searchProduct-scan-head">
        <p class="searchProduct-scan-head-title">方式二：手工搜索</p>
      </div>
      <b-search-input
        v-model="searchVal"
        @search="search"
        placeholder="点击搜索型号"
        @input="inputFunction()"
      >
        <!--<div class="searchProduct-scan-wrap">
          <i class="iconfont icon-saomiao"></i>
          <span class="searchProduct-scan-inf">扫描</span>
        </div>-->
      </b-search-input>
      <ul
        class="searchProduct-history"
      >
        <li
          class="searchProduct-history-item"
          v-for="(item,index) in searchListShow"
          :key="index"
          @click="onItemClick(item)"
        >{{item.productModel}}{{item.productBrandName}}
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
          ，中间横杠-可以省略。
        </div>
        <div class="searchProduct-secret-title  searchProduct-secret-warn mt23">注意：</div>
        <div class="searchProduct-secret-con">
          1、大小写都行，
          <strong>横杠"-" 或斜杠"/" 可以省略</strong>
          ，但是中文括号"（" 和英文括号"(" 不能输错。
        </div>
        <div class="searchProduct-secret-con mb10">2、点击搜索框下面的搜索历史或搜索结果中的型号，可以直接选择完整产品型号。</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Dialog,
  Toast
} from 'mand-mobile';

import {
  BSearchInput
} from '@/components/business';

export default {
  name: 'SearchProduct',
  components: {
    BSearchInput,
  },
  created() {
    this.orderNo = this.$route.params.orderNo;
    this.isProductList = this.$route.params.productList;
    this.recordMode = this.$route.params.recordMode;
    if (localStorage.getItem('productSearchHistory')) {
      this.searchHistory = JSON.parse(localStorage.getItem('productSearchHistory'));
      if (this.searchHistory.length > 30) {
        this.searchHistory.splice(0, 29);
      }
    }
    this.currentClickItemData = {};
  },
  data() {
    return {
      // search value
      searchVal: '',
      // 点击的数据
      currentClickItemData: {},
      // 选中的产品
      choseProducts: [],
      searchList: [],
      // 搜索历史
      searchHistory: [],
      orderNo: '',
      isProductList: [],
      recordMode: '',
      // 是否显示扫码说明
      isShowDescription: true,
      // 扫码之后获取的产品列表
      // 2020-05-20,接口不支持，暂时去掉
      scanQRCodeProductList: []
    };
  },
  computed: {
    searchListShow() {
      const arr = [];
      if (this.searchList && this.searchList.length > 0) {
        this.searchList.forEach((item) => {
          const itemStr = `${item.productModel}${item.productBrandName}`;
          if (itemStr.indexOf(this.searchVal.toUpperCase()) > -1) {
            arr.push(item);
          }
        });
      }
      return arr;
    }
  },
  methods: {
    inputFunction() {
      this.searchList = this.searchHistory;
      if (this.searchVal === '') {
        this.searchList = [];
      }
    },
    toggleDescription() {
      /* 显示隐藏扫码说明 */
      this.isShowDescription = !this.isShowDescription;
    },
    delScannedProduct(index) {
      /* 删除已经扫描的 */
      this.scanQRCodeProductList.splice(index, 1);
    },
    search(type = 1) {
      /**
         *  搜索产品
         *  @type 类型 1：搜索并赋值 2：搜索返回值
         *  */
      if (this.searchVal === '') {
        Toast.failed('请输入搜索内容！');
        return;
      }
      const searchStr = this.searchVal.toUpperCase().replace(/\//g, ' ');
      return this.productService.list(searchStr, '1', '30').then(({ code, data }) => {
        if (code === 1) {
          if (!data) {
            Dialog.confirm({
              content: '暂无信息，请重新搜索',
              confirmText: '继续扫码',
              cancelText: '取消',
              onConfirm: () => {
                if (type === 1) {
                  this.scanQRCodeAndShow();
                } else {
                  this.scanQRCodePro();
                }
              }
            });
            this.searchVal = '';
          }
          if (type === 1) {
            this.searchList = data || [];
          } else {
            return data;
          }
        }
      });
    },
    async scanQRCodePro() {
      /* 扫码且搜索 */
      const valid = await this.scanQRCode();
      if (valid) {
        this.search();
      }
    },
    async scanQRCodeAndShow() {
      /* 扫码且展示 */
      const valid = await this.scanQRCode();
      if (valid) {
        const searchList = await this.search(2);
        if (searchList && searchList.length) {
          // 扫码只会返回一个产品
          const product = searchList[0];
          const {
            productCode
          } = product;
            // 不添加重复产品
          if (this.scanQRCodeProductList.find(v => v.productCode === productCode)) {
            return;
          }
          // 查询价格
          this.queryPrice({
            productCode,
            productGroup: product.productGroup
          }).then((data) => {
            // 添加到scanQRCodeProductList
            this.scanQRCodeProductList.push({
              ...product,
              ...data
            });
            this.choseProductsAndBack();
          });
        }
      }
    },
    choseProductsAndBack() {
      /* 确认扫码选的产品，并返回 */
      this.choseProducts = [...this.scanQRCodeProductList];
      this.$router.back();
    },
    scanQRCode() {
      return new Promise((resolve) => {
        wx.ready(() => {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            // scanType: ['barCode','qrCode'],//qrCode // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              // alert(JSON.stringify(res));
              const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              if (result && typeof result === 'string') {
                if (result.includes(',')) {
                  this.searchVal = result.split(',')[1];
                  return resolve(true);
                }
                if (result.includes('http')) {
                  this.basicService.scanQRcode(result).then((res2) => {
                    if (res2.code === 1) {
                      this.searchVal = res2.data;
                      return resolve(true);
                    }
                  });
                } else {
                  this.searchVal = result;
                  return resolve(true);
                }
              }
            },
            fail: (res) => {
              // alert(222);
              alert(JSON.stringify(res));
              resolve(false);
            }
          });
        });
      });
    },
    array_contain(array, obj) {
      return !!array.find(v => v.productCode === obj.productCode);
    },
    onItemClick(item) {
      if (item.productGroup === null || item.productGroupName === null) {
        Toast.info('产品组名称不能为空');
        return;
      }
      this.currentClickItemData.productGroup = item.productGroup;
      this.currentClickItemData.productGroupName = item.productGroupName;
      this.currentClickItemData.productBrandCode = item.productBrandCode;
      this.currentClickItemData.productBrandName = item.productBrandName;
      const orderMode = this.recordMode;
      if (orderMode === 'Casarte') {
        if (item.productBrandName !== '卡萨帝') {
          Toast.failed('当前是卡萨帝模式，只能选择卡萨帝品牌的产品，请重新选择！');
          return;
        }
      }
      if (!this.array_contain(this.searchHistory, item)) {
        this.searchHistory.push(item);
      }
      this.searchVal = '';
      // 查询价格，并回退上一页
      this.queryPrice({
        productCode: item.productCode,
        productGroup: item.productGroup
      }).then((data) => {
        this.choseProducts = [{
          ...this.currentClickItemData,
          ...data
        }];
        this.$router.go(-1);
      });
    },
    queryPrice({
      productCode,
      productGroup
    }) {
      /* 查询价格 */
      return this.productService.price(productCode, productGroup).then(({ code, data }) => {
        if (code === 1) {
          return {
            price: data.price,
            industryCode: data.industryCode,
            industryName: data.industryName,
            productCode: data.productCode,
            productModel: data.productModel
          };
        }
        this.currentClickItemData = {};
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderEntry' || to.name === 'Order.OrderModify' || to.name === 'Order.OrderSupplement') {
      // 2020-05-12,product的值改为choseProducts[0],批量传产品接口未支持
      const obj = {
        product: this.choseProducts[0]
      };
      to.query.temp = JSON.stringify(obj);
      to.params.orderNo = this.orderNo;
      to.params.productList = this.isProductList;
    }
    localStorage.setItem('productSearchHistory', JSON.stringify(this.searchHistory));
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">
  .searchProduct {
    padding-top: 20px;
  }

  .md-toast-text {
    white-space: normal !important;
  }

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
    font-size: 20px;
    writing-mode: vertical-lr;
  }

  .searchProduct-scan {
    background: #fff;
    padding: 30px 24px 40px 24px;

    .bSearchInput-wrap {
      background: #F5F5F5;
    }

    .bSearchInput {
      background: #F5F5F5;
    }
  }

  .searchProduct-scan-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
  }

  .searchProduct-scan-head-title {
    font-size: 34px;
    font-weight: 600;
    color: #333;
  }

  .searchProduct-scan-head-tips {
    display: flex;
    align-items: center;
    color: #1969C6;
    font-size: 28px;

    .iconfont {
      margin-left: 16px;
      font-size: 26px;

      &.reverse {
        display: inline-block;
        transform: rotateX(180deg);
      }
    }
  }

  .searchProduct-scan-cnt {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  .searchProduct-scan-icon-par {
    text-align: center;
  }

  .searchProduct-scan-icon-wrap {
    height: 174px;
    line-height: 174px;
    vertical-align: middle;
  }

  .searchProduct-scan-icon {
    font-size: 146px;
    color: #1969C6;
  }

  .searchProduct-scan-icon-tip {
    font-size: 24px;
    color: #4A90E2;
  }

  .searchProduct-scan-example-img-par {
    margin-left: 160px;
    text-align: center;
  }

  .searchProduct-scan-example-img {
    width: 108px;
    height: 174px;
  }

  .searchProduct-scan-example-img-tip {
    font-size: 24px;
    color: #999;
  }

  .searchProduct-scan-example-img-tip,
  .searchProduct-scan-icon-tip {
    margin-top: 27px;
  }

  .searchProduct-scan-description {
    border: 1px solid #44BE3C;
    margin-top: 6px;
    padding: 18px 9px;
    color: #333;
    font-size: 24px;
    line-height: 40px;
  }

  .searchProduct-scan-description-btn {
    width: 66px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: 1px solid #1969C6;
    color: #1969C6;
    font-size: 20px;
    border-radius:17px;
    background: #fff;
  }

  .searchProduct-scan-product {
    margin: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    background: #fff;
  }

  .searchProduct-scan-product-title {
    height: 42px;
    font-size: 30px;
    line-height: 42px;
    color: #333;
    padding-left: 50px;
    padding-right: 50px;
  }

  .searchProduct-scan-product-list {
    margin-top: 12px;
    padding-top: 12px;
    padding-left: 50px;
    padding-bottom: 17px;
    max-height: 800px;
    overflow-y: auto;
  }

  .searchProduct-scan-product-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .searchProduct-scan-product-item-cnt {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 540px;
    min-height: 64px;
    margin-right: 30px;
    background: #F5F5F5;
    padding: 16px 28px;
    font-size: 24px;
    word-break: break-all;
    margin-left: 14px;
  }

  .searchProduct-scan-product-item-del {
    color: #999;
    font-size: 20px;
  }

  .searchProduct-scan-product-item-name {
    color: #333;
    margin-right: 24px;
  }

  .searchProduct-scan-product-item-code {
    color: #1969C6;
  }

  .searchProduct-scan-product-btn-par {
    width: 100%;
    text-align: center;
  }

  .searchProduct-scan-product-btn {
    width: 300px;
    height: 60px;
    background: #fff;
    color: #1969C6;
    border: 1px solid #1969C6;
    border-radius: 10px;
    font-size: 30px;
    margin-top: 20px;
  }
</style>
