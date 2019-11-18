import Clipboard from 'clipboard';
import {
  Toast
} from 'mand-mobile';
import MeScroll from 'mescroll.js';

const util = {
  getUrlVal(name) {
    /* 获取url参数 */
    const urlArgs = window.location.search;
    if (urlArgs) {
      const reg = new RegExp(`${name}=([^&]+)`);
      const results = urlArgs.match(reg);
      if (results) {
        return results[1];
      }
    }
  },
  convertQueryStingToMap() {
    /* 查询字符串转为对象 */
    let search = window.location.search;
    search = search.replace('?', '');
    const searchAy = search.split('&');
    const map = {};
    searchAy.forEach((v) => {
      const splitAy = v.split('=');
      map[splitAy[0]] = splitAy[1];
    });
    return map;
  },
  getNextDayDate() {
    const curDate = new Date();
    let curTime = curDate.getTime();
    curTime += 3600 * 24 * 1000;
    curDate.setTime(curTime);
    curDate.setHours(0);
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    return curDate;
  },
  getCurDate() {
    const curDate = new Date();
    return curDate.getFullYear() + (`0${curDate.getMonth() + 1}`).slice(-2) + (`0${curDate.getDate()}`).slice(-2);
  },
  isWeixin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') >= 0) {
      return true;
    }
  },
  formatDate(date, pattern) {
    if (!date) {
      return '';
    }
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const numToStr = function (num) {
      if (num < 10) {
        num = `0${num}`;
      } else {
        num = `${num}`;
      }
      return num;
    };
    const obj = {
      year: date.getFullYear(),
      month: numToStr(date.getMonth() + 1),
      date: numToStr(date.getDate()),
      hours: numToStr(date.getHours()),
      minutes: numToStr(date.getMinutes()),
      seconds: numToStr(date.getSeconds())
    };
    let res = pattern || 'yyyy-MM-dd';
    res = res.replace(/yyyy/g, obj.year);
    res = res.replace(/MM/g, obj.month);
    res = res.replace(/dd/g, obj.date);
    res = res.replace(/HH/g, obj.hours);
    res = res.replace(/mm/g, obj.minutes);
    res = res.replace(/ss/g, obj.seconds);
    return res;
  },
  formatFloat(f, digit) {
    const m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  },
  formatNoSplitTime(val, isDate) {
    if (!val) {
      return '';
    }
    val += '';
    let returnStr = '';
    returnStr += `${val.substr(0, 4)}-${val.substr(4, 2)}-${val.substr(6, 2)}`;
    if (val.length > 8 && !isDate) {
      returnStr += ` ${val.substr(8, 2)}:${val.substr(10, 2)}`;
    }
    return returnStr;
  },
  shallowCopyObject(obj) {
    /* 浅拷贝 */
    return JSON.parse(JSON.stringify(obj));
  },
  arithmetic(val1, val2, arithmetic = 1, floatNum = 2) {
    val1 += '';
    val2 += '';
    const val1Split = val1.split('.');
    const val2Split = val2.split('.');
    const val1Len = val1Split[1] ? val1Split[1].length : 0;
    const val2Len = val2Split[1] ? val2Split[1].length : 0;
    const multiple = Math.pow(10, val1Len > val2Len ? val1Len : val2Len);
    val1 = val1.replace('.', '') * (val1Len ? 1 : multiple);
    val2 = val2.replace('.', '') * (val2Len ? 1 : multiple);
    let returnValue;
    switch (arithmetic) {
      case 1:
        returnValue = (val1 + val2) / multiple;
        break;
      case 2:
        returnValue = (val1 - val2) / multiple;
        break;
      case 3:
        returnValue = (val1 * val2) / multiple / multiple;
        break;
      case 4:
        returnValue = val1 / val2;
        break;
      default:
        break;
    }
    return this.formatFloat(returnValue, floatNum);
  },
  addZero(value) {
    let returnStr = `${value}`;
    let len = returnStr.split('.')[1];
    if (len) {
      len = len.length;
    } else {
      len = 0;
    }
    returnStr += ['.00', '0', ''][len] || '';
    return returnStr;
  },
  updateUserCommunity(data) {
    sessionStorage.setItem('ownerCode', data.ownerCode);
    sessionStorage.setItem('roomCode', data.roomCode);
    sessionStorage.setItem('ownerSimpleCode', data.simpleCode);
    sessionStorage.setItem('communityName', data.communityName);
    sessionStorage.setItem('address', data.address);
  },
  copy(copyText) {
    /* 复制，微信下ios有键盘弹起的bug,即使blur掉也会推页面 */
    let textArea;

    // 判断是不是ios端
    /* function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
      } */

    // 创建文本元素
    function createTextArea(text) {
      textArea = document.createElement('input');
      textArea.value = text;
      document.documentElement.insertBefore(textArea, document.body);
    }

    // 选择内容
    function selectText() {
      // let range;
      // let selection;

      /* if (!isOS()) {
           range = document.createRange();
          range.selectNodeContents(textArea);
          selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textArea.setSelectionRange(0, 999999);
          textArea.select();
          document.body.removeChild(textArea);
        } else {
          textArea.select();
          textArea.setSelectionRange(0, textArea.value.length);
        } */
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);
    }

    // 复制到剪贴板
    function copyToClipboard() {
      let status = false;
      try {
        if (document.execCommand('copy')) {
          status = true;
        }
      } catch (err) {
        console.log(err);
      }
      textArea.blur();
      document.documentElement.removeChild(textArea);
      return status;
    }

    createTextArea(copyText);
    selectText();
    return copyToClipboard();
  },
  clipboardCopy(selector, val) {
    const clipboard = new Clipboard(selector, {
      text() {
        return val;
      }
    });
    return clipboard;
  },
  genQueryStringByObj(obj) {
    /* 组合成query string */
    const args = [];
    for (const p in obj) {
      obj[p] !== undefined && (args.push(`${p}=${obj[p]}`));
    }
    let returnStr = '';
    if (args.length) {
      returnStr = `?${args.join('&')}`;
    }
    return returnStr;
  },
  valid(validAy) {
    return function () {
      for (let i = 0; i < validAy.length; i++) {
        const validObj = validAy[i];
        if (!validObj.ruleFun()) {
          Toast.failed(validObj.message);
          return false;
        }
      }
      return true;
    };
  },
  createMeScroll(ref, _this) {
    /* 创建MeScroll实例 */
    return new MeScroll(ref, {
      auto: false,
      up: {
        page: {
          num: 0,
          size: 10
        },
        noMoreSize: 1,
        htmlNodata: '<p class="upwarp-nodata">-- 数据已到底部 --</p>',
        callback: _this.upCallback,
        empty: {
          warpId: _this.curScrollViewName,
          tip: '<p class="upwarp-empty" style="color: #999999;font-size: 13px">\暂无相关数据~\</p>'
        },
      }
    });
  },
  scroviewTabChange(viewName, _this) {
    if (!_this[viewName].mescroll) {
      // 创建实例
      _this[viewName].mescroll = _this.bUtil.createMeScroll(_this.$refs[viewName], _this);
      // 触发下拉刷新
      _this[viewName].mescroll.triggerDownScroll();
    }
    // 未初始化就初始化
    if (!_this[viewName].isListInit) {
      _this[viewName].mescroll.triggerDownScroll();
    }
  },
  /** *****判断代报装时间是否符合要求******** */
  isReportInstallFit(productlist, deliveryTime) {debugger;
    let change = true;
    // const now = new Date()
    const deT = Date.parse(deliveryTime.substring(0, 16).replace(/-/g, '/'));
    const detFor = new Date(deT);
    const y = detFor.getFullYear();
    const m = detFor.getMonth();
    const d = detFor.getDate();
    const h = detFor.getHours();
    productlist.forEach((pro) => {
      if (pro.installTime) {
        const t = Date.parse(pro.installTime.replace(/-/g, '/'));
        const tFor = new Date(t);
        const ty = tFor.getFullYear();
        const tm = tFor.getMonth();
        const td = tFor.getDate();
        const th = tFor.getHours();
        if (t < deT) {
          Toast.failed('代报装时间不能小于送达时间');
          change = false;
          return;
        }
        if (td === d && tm === m && ty === y) {
          if (h >= 16) {
            Toast.failed('代报装时间不符合规则，请重新输入');
            change = false;
            return;
          }
          if (th <= (h + 4)) {
            Toast.failed('代报装时间必须大于送达时间4小时');
            change = false;
          }
        }
      }
    });
    return change;
  },
  analyzeAddressList(list) {
    list.forEach((add) => {
      if (add.familyItemCode === '4') {
        add.familyC = '自己家';
      } else if (add.familyItemCode === '5') {
        add.familyC = '父母家';
      } else if (add.familyItemCode === '6') {
        add.familyC = '朋友家';
      } else if (add.familyItemCode === '7') {
        add.familyC = '办公室';
      } else if (add.familyItemCode === '8') {
        add.familyC = '其他';
      } else {
        add.familyC = '其他';
      }
    });
  },
  checkOverflowScreen({
    dom,
    btmDom
  }) {
    /* 检查是否溢出屏幕 */
    /*
    * dom:检查的dom
    * isDomShow：底部的dom
    * */
    const screenHeight = document.documentElement.offsetHeight;
    let domHeight = dom.offsetHeight;
    let {
      top: domY
    } = dom.getBoundingClientRect();
    // 隐藏元素先显示再隐藏
    if (domHeight === 0) {
      const {
        top: domTop,
        left: domLeft,
        display: domDisplay
      } = dom.style;
      dom.style.position = 'absolute';
      dom.style.left = '-9999px';
      dom.style.display = 'block';
      domHeight = dom.offsetHeight;
      domY = dom.getBoundingClientRect().top;
      // 还原之前的位置
      if (domTop) {
        dom.style.position = domTop;
      } else {
        dom.style.position = null;
      }
      if (domLeft) {
        dom.style.left = domLeft;
      } else {
        dom.style.left = null;
      }
      if (domDisplay) {
        dom.style.display = domDisplay;
      } else {
        dom.style.display = null;
      }
    }
    let fixHeight = 0;
    // 底部存在dom（底栏），扣除高度
    if (btmDom) {
      fixHeight += btmDom.offsetHeight;
    }

    return !!(domY + domHeight > screenHeight - fixHeight);
  },
  downloadFile(data) {
    /* 接受二进制文件，下载文件 */
    // 'filename=micro_model_1568343739576.xlsx';
    const filename = 'pic.jpg';
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href); // 释放URL 对象
    document.body.removeChild(link);
  },
};

export default util;
