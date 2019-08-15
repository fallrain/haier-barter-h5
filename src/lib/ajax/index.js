import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import router from '@/router';
import store from '@/store';
import {
  Toast
} from 'mand-mobile';

const ax = axios.create();
ax.defaults = Object.assign(
  ax.defaults,
  {
    baseURL: process.env.VUE_APP_BASE_URL,
    method: 'post'
  }
);
ax.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem('acces_token');
  }
  if (!config.params.noLoading) {
    Toast.loading('加载中...');
  }
  return config;
});
ax.interceptors.response.use((response) => {
  const customOptions = response.config.customOptions;
  // 关闭遮罩
  if (!response.config.params.noLoading) {
    Toast.hide();
  }
  const { msg } = response.data;
  if (msg === '用户未登陆') {
    router.replace({
      name: 'Login'
    });
  }
  if (!(response.config.params && response.config.params.requestNoToast)) {
    if (response.data.code !== 1 && !response.data.isSuccess) {
      Toast.failed(msg || '请求失败');
    }
  }
  if (customOptions.returnResponse) {
    return response.data;
  }
  return response.data;
}, (error) => {
  Toast.hide();
  // return Promise.reject(error);
  Toast.failed('请求失败');
  error.response.data = {
    data: {
      code: -1
    }
  };
  return error.response.data;
});
const axGet = function (url, params, options) {
  return ax({
    method: 'get',
    url,
    params,
    customOptions: {
      ...options
    },
  });
};

const axPost = function (url, data, params, options) {
  return ax({
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url,
    data: qs.stringify(data),
    params,
    customOptions: {
      ...options
    },
  });
};

const axPostJson = function (url, data, params, options) {
  return ax({
    method: 'post',
    url,
    data,
    params,
    customOptions: {
      ...options
    },
  });
};
export default ax;

export { axGet, axPost, axPostJson };
