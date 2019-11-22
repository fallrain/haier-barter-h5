const env = process.env.NODE_ENV_MODE;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const path = require('path');

const smp = new SpeedMeasurePlugin();
const webpack = require('webpack');

const dllPath = './dll';
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    host: '0.0.0.0',
    port: 8094,
    compress: true,
    proxy: {
      '/api/test': {
        target: 'https://hzy.haier.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/test': ''
        },
        secure: false
      },
      '/api': {
        // target: 'https://testdb.haier.net/',
        target: 'https://barter.haier.net/',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // },
        secure: false
      }
    }
  },
  configureWebpack: (config) => {
    if (env === 'dev') {
    } else {
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(`${dllPath}/vendor-manifest.json`)
        })
      );
      // / 将打包出来文件动态引入index.html
      config.plugins.push(
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, `${dllPath}/*.js`),
          // dll 引用路径
          publicPath: path.join(process.env.VUE_APP_PUBLIC_PATH, dllPath),
          // dll最终输出的目录
          outputPath: dllPath
        })
      );
      /* if (process.env.Analyse) {
        config.plugins.push(new BundleAnalyzerPlugin());
      } */
    }
  },
};
