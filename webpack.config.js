const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.jsx'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    open: true,
    hot: isDev,
    historyApiFallback: true,
  },
  optimization: {
    minimize: isProd,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  target: isDev ? "web" : "browserslist",
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: isProd,
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new StylelintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
};
