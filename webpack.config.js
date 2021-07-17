const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



// Рабочие среды
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
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
   ]

}

