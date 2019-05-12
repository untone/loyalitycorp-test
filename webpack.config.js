const webpack = require('webpack');
const path = require('path');
const fs  = require('fs');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: 'src/index.html'
});

const uglifyPlugin = new UglifyJSPlugin({
  uglifyOptions: {
    output: { comments: false },
    compress: {
      drop_console: true,
      dead_code: true,
    },
  },
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: 'style.css'
});

const vueLoader = new VueLoaderPlugin();

const hrmPlugin = new webpack.HotModuleReplacementPlugin();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 1234,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/'
    }
  },
  optimization: {
      minimize: isProduction ? true : false,
      minimizer: [uglifyPlugin],
    },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: './',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      'vue$': isProduction ? 'vue/dist/vue.min' : 'vue/dist/vue'
    },
  },
  module: {
    rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        postcss: [require('postcss-cssnext')()]
      }
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      }
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        { 
          loader: 'css-loader', 
          options: {
            importLoaders: 1 
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss'
          }
        },
      ],
    },
    ],
  },
  plugins: isProduction
    ? 
      [
        vueLoader,
        cssPlugin,
        htmlPlugin,
        uglifyPlugin
      ]
    : [
        vueLoader,
        cssPlugin,
        htmlPlugin,
        hrmPlugin
      ]
};
