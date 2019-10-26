const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sass = require('node-sass')
const { DefinePlugin } = require('webpack')
require('dotenv').config()

module.exports = {
  plugins: [
    // Copy static assets from `public` folder to `build` folder
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
      },
      {
        from: path.resolve(__dirname, '../src/extension.scss'),
        to: path.resolve(__dirname, '../dist/static/css/extension.css'),
        transform(content, path) {
          const result = sass.renderSync({
            data: content.toString(),
            outputStyle: 'compressed',
          })
          return result.css
        },
      },
    ]),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    //
    new DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
    }),
  ],
  entry: {
    content: path.resolve(__dirname, '../src/content.js'),
    background: path.resolve(__dirname, '../src/background.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
}
