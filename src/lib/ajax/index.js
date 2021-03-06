import axios from 'axios';
import qs from 'qs';
import {
  Dialog,
  Toast
} from 'mand-mobile';

const ax = axios.create();

ax.defaults = Object.assign(
  ax.defaults,
  {
    baseURL: process.env.VUE_APP_BASE_URL,
    method: 'post',
    timeout: 60 * 1000
  }
);
const loadingAy = [];

function closeLoading() {
// 关闭遮罩
  if (loadingAy.length === 1) {
    document.querySelector('.js-b-loading').style = 'display:none;';
  }
  loadingAy.length--;
}
function showLoading() {
  /* 打开遮罩 */
  document.querySelector('.js-b-loading').style = 'display:block;';
  return new Date().getTime();
}
let isShowError = false;

function showError(msg) {
  if (isShowError) {
    return;
  }
  isShowError = true;
  let errorMsg;
  // 无错误返回请求失败
  // 对象类型解析错误
  if (msg) {
    if (typeof msg === 'string') {
      errorMsg = msg;
    } else {
      // 以后存在不只是通过message来判断的情况
      if (msg.message) {
        const errorMessage = msg.message;
        if (/^timeout of/.test(errorMessage)) {
          errorMsg = '请求超时';
        }
      }
    }
  }
  Dialog.alert({
    content: errorMsg || '请求失败',
    confirmText: '确定',
    onConfirm() {
      isShowError = false;
    }
  });
}

ax.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  if (config.headers && !config.params.noToken) {
    config.headers.Authorization = `Bearer  ${localStorage.getItem('acces_token')}`;
  }
  if (!config.params.noLoading) {
    loadingAy.push(showLoading());
    // Toast.loading('加载中...')
    // Toast.hide()
  }
  return config;
}, (error) => {
  if (!error.config.params.noLoading) {
    closeLoading();
  }
  showError(error);
  return {
    code: -1
  };
});

ax.interceptors.response.use((response) => {
  const customOptions = response.config.params;
  // 关闭遮罩
  if (!response.config.params.noLoading) {
    closeLoading();
  }
  const { code, msg } = response.data;
  if (code === 7111) {
    wx.miniProgram.reLaunch({
      url: '/pages/login/login'
    });
    return;
  }
  if (!(response.config.params && response.config.params.requestNoToast)) {
    if (response.data.code !== 1 && !response.data.isSuccess) {
      if (response.config.url.indexOf('/common/weixin/jssign') === -1) {
        showError(msg);
      }
      // if (response.config.url !== '/api/manage/reportEhub/saveEhubBarCode') {
      //   if (response.config.url === '/api/rights/rightsManage/queryOrderOptionalShareRights' || response.config.url === '/api/rights/rightsManage/queryOrderOptionalMutexRights') {
      //     closeLoading();
      //     Toast.hide();
      //   } else {
      //     showError(msg);
      //   }
      // }
    }
  }
  if (customOptions && customOptions.returnResponse) {
    return response;
  }
  return response.data;
}, (error) => {
  if (!error.config.params.noLoading) {
    closeLoading();
  }
  if (error.config.url.indexOf('/common/weixin/jssign') === -1) {
    showError(error);
  }
  return {
    code: -1
  };
});

const axGet = function (url, params, options) {
  return ax({
    headers: { 'content-type': 'application/x-www-form-urlencoded,charset=UTF-8', },
    method: 'get',
    url,
    params,
    ...options
  });
};

const axGetUrl = function (url, appendUrl) {
  return ax({
    headers: { 'content-type': 'application/x-www-form-urlencoded,charset=UTF-8', },
    method: 'get',
    url: `${url}/${appendUrl}`,
  });
};

const axPost = function (url, data, params, options) {
  return ax({
    method: 'post',
    url,
    data: qs.stringify(data),
    params,
    ...options
  });
};

const axPostJson = function (url, data, params, options) {
  return ax({
    method: 'post',
    url,
    data,
    params,
    ...options
  });
};
export default ax;

export {
  axGet,
  axPost,
  axPostJson,
  axGetUrl
};
