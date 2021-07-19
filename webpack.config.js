const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


// Рабочие среды
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const config = {
   mode: 'development',
   context: path.resolve(__dirname, 'src'),

   //точка входа
   entry: {
      main: './index.js'
   },

   output: {
      filename: isDev ? `js/[name].js` : `js/[name].[hash].js`,
      path: path.resolve(__dirname, 'dist')
   },

   devtool: isDev ? 'source-map' : false,

   devServer: {
      port: 3000,
      open: true,
      contentBase: path.resolve(__dirname, 'dist'),
   },

   //  Настройки лаудеров
   module: {
      rules: [

         // JS 
         {
            test: /\.js$/,
            use: ['babel-loader']
         },
         //  Стили
         {
            test: /\.s[ac]ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
               },
               'css-loader',
               'sass-loader'
            ]
         },

         {
            test: /\.(png|jpg|svg|gif)$/,
            type: 'asset/resource',
            // Настройки путей для картинок
            generator: {
               filename: isDev ? `img/[name][ext]` : `img/[name].[hash][ext]`,
               // publicPath: './'
            }
         },

         // Позволяет видеть картинки в html
         {
            test: /\.html$/,
            use: 'html-loader'
         },

         // Шрифты
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            type: 'asset/resource',
            generator: {
               filename: isDev ? `fonts/[name][ext]` : `fonts/[name].[hash][ext]`,
               publicPath: '../'
            }
         },
      ]
   },
   // Плагина
   plugins: [
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
         filename: isDev ? `styles/[name].css` : `styles/[name].[hash].css`,
      }),

      new HtmlWebpackPlugin({
         title: 'forkio project',
         template: path.resolve(__dirname, 'src') + '/html/index.html',
         filename: 'index.html',
      }),



   ],

   // Оптимизация Js /css
   optimization: {},


}

// Оптимизирующие плагины для продакшена

if (isProd) {

   config.plugins.push(
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
   );

   config.optimization =
   {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            extractComments: false,
            terserOptions: {
               output: {
                  comments: false,
               }
            }
         }),
         new CssMinimizerPlugin({
            minimizerOptions: {
               preset: [
                  'default',
                  {
                     discardComments: { removeAll: true },
                  },
               ],
            },
         }),
      ],
   }



};




module.exports = config;