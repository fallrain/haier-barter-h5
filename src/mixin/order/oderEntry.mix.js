export default {
  data() {
    return {
      // 模态框:已领优惠券
      couponDialog: {
        open: true,
      },
      // 显示隐藏输入优惠券对话框
      isShowInputCoupons: false,
      // 显示优惠券对话框
      isShowCoupons: false,
      // 已领优惠券
      receivedCoupons: [],
      // 已选择的优惠券
      choseCoupons: []
    };
  },
  computed: {
    queryCouponsTitle() {
      /* 查询优惠券按钮文字 */
      return this.choseCoupons.length ? '重新选择' : '查询优惠券';
    },
    inputCouponsTitle() {
      /* 修改优惠券按钮文字 */
      return this.choseCoupons.length ? '重新选择' : '输入优惠券';
    }
  },
  methods: {
    showChooseCoupons() {
      /* 查看可选的优惠券 */
      const userPhone = this.customerInfo.mobile;
      if (!userPhone) {
        this.$dialog.alert({
          content: '请添加顾客'
        });
        return;
      }
      this.orderService.queryAdjCouponInfo({
        userPhone
      }).then(({ code, data }) => {
        if (code === 1) {
          const receivedCoupons = data || [];
          this.receivedCoupons = receivedCoupons.map(v => ({
            ...v,
            couponName: v.activityName
          }));
          this.isShowCoupons = true;
        }
      });
      // this.$dialog.alert({
      //   content: '暂无可用消费券'
      // });
    },
    showInputCoupons() {
      /* 展示输入优惠券对话框 */
      const userPhone = this.customerInfo.mobile;
      if (!userPhone) {
        this.$dialog.alert({
          content: '请添加顾客'
        });
        return;
      }
      if (this.productList.length) {
        this.isShowInputCoupons = true;
      } else {
        this.$dialog.alert({
          content: '请先选择产品'
        });
      }
    },
    showCoupons() {
      /* 展示输入优惠券对话框 */
      this.isShowCoupons = true;
    },
    chooseCouponsConfirm(choseCoupons) {
      /* 选择卡券确认 */
      const choseCouponsTemp = [...this.choseCoupons, ...choseCoupons];
      // activityId不能重复
      this.choseCoupons = choseCouponsTemp.filter((v, index) => {
        const { activityId } = v;
        return choseCouponsTemp.findIndex(searchCoupon => searchCoupon.activityId === activityId) === index;
      });
    },
    orderInputCouponsConfirm(data) {
      /* 核销确认 */
      const choseCoupons = data.map(v => ({
        couponName: v.msg,
        ...v
      }));
      this.choseCoupons = choseCoupons.filter((v, index) => {
        const { entryID } = v;
        return choseCoupons.findIndex(searchCoupon => searchCoupon.entryID === entryID) === index;
      });
    },
    genChoseCouponsByDetail(data) {
      /* 组合已选优惠券list */
      const {
        orderDetailDtoList
      } = data;
      const coupons = [];
      orderDetailDtoList.forEach((v, index) => {
        if (v.couponNumDetail) {
          coupons.push({
            productModel: v.productModel,
            codeIndex: index,
            entryID: v.couponNumDetail,
            couponName: v.couponNameDetail,
            msg: v.couponNameDetail,
          });
        }
      });
      return coupons;
    },
    genCouponName() {
      /* 组合couponNum couponName */
      const couponNumAy = [];
      const couponNameAy = [];
      this.choseCoupons.forEach((v) => {
        couponNumAy.push(v.entryID);
        couponNameAy.push(v.msg);
      });
      // 优惠券id
      const couponNum = couponNumAy.join(',');
      // 优惠券名字
      const couponName = couponNameAy.join('&&');
      return {
        couponNum,
        couponName
      };
    },
    updateOrderDetailSaveQoList(choseCoupons, orderDetailSaveQoList) {
      /* 更新产品列表里的卡券信息 */
      // 先重置
      orderDetailSaveQoList.forEach((v) => {
        v.couponNumDetail = '';
        v.couponNameDetail = '';
      });
      choseCoupons.forEach((v) => {
        const {
          codeIndex,
          entryID,
          couponName
        } = v;
        orderDetailSaveQoList[codeIndex].couponNumDetail = entryID;
        orderDetailSaveQoList[codeIndex].couponNameDetail = couponName;
      });
    },
    productDelete(index) {
      /* 删除一条产品操作 */
      this.rightsList = [];
      this.rightsJson = '';
      this.rightName = '';
      this.rightId = '';
      // 如果存在则删除已选
      const beginIndex = this.choseCoupons.findIndex(v => v.codeIndex === index);
      if (beginIndex > -1) {
        this.choseCoupons.splice(beginIndex, 1);
      }
      const lastCoupons = this.choseCoupons[this.choseCoupons.length - 1];
      // 如果删除的产品的下标没超过已经配置了卡券的产品的最大下标，则下标需要操作
      if (lastCoupons && lastCoupons.codeIndex >= index) {
        // 所有大于这个产品下标的，统统减1
        this.choseCoupons.forEach((v) => {
          if (v.codeIndex > index) {
            v.codeIndex--;
          }
        });
      }
      this.productList.splice(index, 1);
    },
  }
};
