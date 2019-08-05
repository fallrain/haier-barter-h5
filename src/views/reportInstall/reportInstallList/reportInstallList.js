// message.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    flowStatus: 0, // 预设当前项的值
    list: [
      [],
      [],
      []
    ],
    arr: [],
    pager: [
      {
        pageNum: 1,
        pageSize: 10
      },
      {
        pageNum: 1,
        pageSize: 10
      },
      {
        pageNum: 1,
        pageSize: 10
      }
    ],
    pageCount: [],
    animationData: {},
    touchStartPoint: {},
    isRefresh: false,
    isLoading: false,
    canRefresh: true,
    settimeout: false,
    loadOver: false,
    haveNetwork: true,
    scrollTop: 100,
    tmpList: []
  },
  onLoad(options) {
    const _this = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res.windowHeight);
        _this.setData({
          windowHeight: res.windowHeight - 50
        });
      }
    });
    if (!wx.getStorageSync('shopStatus')) {
      if (wx.getStorageSync('shopStatusMsg') == '' || wx.getStorageSync('shopStatusMsg') == undefined || !wx.getStorageSync('shopStatusMsg')) {
        wx.removeStorageSync('shopStatus');
        wx.removeStorageSync('shopStatusMsg');
        this.checkPortalUserShopStatus();
      }
    }
    if (options.flowStatus) {
      this.checkTab(options.flowStatus);
    }
    const pager = [{
      pageNum: 1,
      pageSize: 10
    }, {
      pageNum: 1,
      pageSize: 10
    }, {
      pageNum: 1,
      pageSize: 10
    }];

    this.setData({
      pager
    });
    this.getlist(app.globalData.reportInstallListTabStatus || 0, true).then(() => {
      // 什么鸡毛的bug
      this.setData({
        scrollTop: 20
      });
    });
  },
  jump({ currentTarget: { dataset } }) {
    /* 跳转报装详情 */
    const { url, orderdata, index } = dataset;
    const argsObj = {
      userId: undefined,
      userName: orderdata.customerName,
      mobile: orderdata.phoneNumber,
      orderNo: orderdata.orderNo,
      workFlowId: orderdata.orderId,
      parentPage: 'list', // 从何处跳过去的，此处代表列表
      flowStatus: this.data.flowStatus, // 判断待报装、非待报装
      itemIndex: index
    };
    wx.navigateTo({
      url: url + app.util.genQueryStringByObj(argsObj)
    });
  },
  checkTab(flowStatus) {
    this.swichNav({
      detail: {
        formId: ''
      },
      target: {
        dataset: {
          current: flowStatus
        }
      }
    });
  },
  // 滚动切换标签样式
  switchTab(e) {
    this.setData({
      flowStatus: e.detail.current
    });
    app.globalData.reportInstallListTabStatus = e.detail.current;
  },
  // 点击标题切换当前页时改变样式
  swichNav(e) {
    app.saveFormId(e.detail.formId);
    const cur = e.target.dataset.current;
    if (this.data.flowStatus == cur) {
      return false;
    }
    this.setData({
      flowStatus: cur
    });
    app.globalData.reportInstallListTabStatus = cur;

    this.getlist(cur, true);
  },
});
