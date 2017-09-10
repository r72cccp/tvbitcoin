'use strict'
const config = require('./webpack.base.es6')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const production_config = merge([config, {
  cache: true,
  devtool: false,
//  entry: [
//    'webpack-hot-middleware/client',
//    path.join(__dirname, '../client/index.es6.jsx')
//  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { loose: true, modules: false }]
          ],
        },
//        query: {
//          presets: ['es2015']
//        }
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}])

module.exports = production_config
