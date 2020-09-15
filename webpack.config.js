const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//bundle 분석용
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
    mode: "production",
    entry: {
      index: ['@babel/polyfill','./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),/** bundle.js와 index.html이 저장될 위치 */
        chunkFilename: '[name].[chunkhash].bundle.js',
        filename: '[name].[chunkhash].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env',
                        '@babel/react' ],
                        
            }
          }
        },
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [
              {
                  loader: 'url-loader'
              },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          include: path.join(__dirname,'dist'),
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
      ]
    },
    plugins: [
        /** 기존에 빌드한 파일 삭제 해주는 plugin */
        new cleanWebpackPlugin(),
        /** template을 filename에 그대로 복사함. */
        new htmlWebpackPlugin({
            chunks: ["index","images","vendors"],
            template: path.join(__dirname, './public/index.html'),
            inject: true, //true or body로 설정하면 body 태그의 맨 마지막에 bundle.js import
            filename: path.join(__dirname, './dist/index.html')
        }),
        new ManifestPlugin({
          fileName: 'assets.json',
          basePath: '/'
        }),
        /** bundle 분석 plugin */
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
      /** 번들 쪼개기 설정 */
      splitChunks: {
        /** 한 bundle당 최대 사이즈(byte단위) */
        // maxSize: 300000, //300kb, 약 292kib
        cacheGroups: {
          /** node_modules 폴더를 vendors.bundle.js로 만듬 */
          node_vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          /** public 폴더를 images.bundle.js로 만듬 */
          public_images: {
            test: /[\\/]public[\\/]/,
            name: 'images',
            chunks: 'all'
          }
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
};
