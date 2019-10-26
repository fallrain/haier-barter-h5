const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清理文件夹

module.exports = {
  mode: 'production',
  entry: {
    // 需要提取的库文件
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios',
      'mand-mobile',
      'vee-validate',
      'qs'
    ]
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.[hash:8].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dll']
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    })
  ]
};
