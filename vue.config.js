const env = process.env.NODE_ENV_MODE;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const path = require('path');

const smp = new SpeedMeasurePlugin();
module.exports = {
  publicPath: env === 'prod' ? '/' : '/',
  devServer: {
    host: '0.0.0.0',
    port: 8094,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://10.159.152.134:9091/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // secure: false
      }
    }
  },
  configureWebpack: (config) => {
    const cfg = {};
    if (env !== 'dev') {
      return smp.wrap(cfg);
    }
    return cfg;
  }
};
