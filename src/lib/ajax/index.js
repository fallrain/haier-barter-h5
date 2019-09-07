import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import {
  Toast
} from 'mand-mobile';
import router from '@/router';
import store from '@/store';

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
  const customOptions = response.config.params;
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
  if (customOptions && customOptions.returnResponse) {
    return response;
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
const axGet = function (url, params) {
  return ax({
    headers: { 'content-type': 'application/x-www-form-urlencoded,charset=UTF-8', },
    method: 'get',
    url,
    params,
  });
};

const axPost = function (url, data, params) {
  return ax({
    headers: { 'content-type': 'application/x-www-form-urlencoded', },
    method: 'post',
    url,
    data: qs.stringify(data),
    params,
  });
};

const axPostJson = function (url, data, params) {
  return ax({
    method: 'post',
    url,
    data,
    params,
  });
};
export default ax;

export { axGet, axPost, axPostJson };
