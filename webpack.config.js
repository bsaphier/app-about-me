'use strict';
const { LOADERS } = require('./webpack.constants');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: LOADERS
  },
  resolve: {
    alias: {
      modernizr$: './.modernizrrc.json'
    }
  }
};
