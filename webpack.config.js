const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';
  const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    entry: './src/app/index.tsx',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      static: path.join(__dirname, 'out'),
      compress: true,
      port: 9000,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: { syntax: 'typescript', tsx: true },
                transform: {
                  react: { runtime: 'automatic', development: !isProduction, refresh: false }
                },
                target: 'es2022'
              }
            }
          }
        },
        {
          test: /\.css$/i,
          use: [styleLoader, 'css-loader']
        },
        {
          test: /\.less$/i,
          use: [styleLoader, 'css-loader', 'less-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : [])
    ],
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'app.js',
      path: path.resolve(__dirname, 'out'),
      clean: true
    },
    performance: {
      // antd is large; don't warn about the vendor bundle size.
      hints: false
    }
  };
};
