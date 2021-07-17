const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');   
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



// Рабочие среды
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// Формирование имени в зависимости от среды разработки
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
   mode: 'development',
   context: path.resolve(__dirname, 'src'),

   //точка входа
   entry: {
      main: './index.js'
   },

   output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist') 
   },
   //  devtool: isDev ? 'eval-cheap-source-map' : '',    
   devtool: 'eval-cheap-source-map',      

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
                  // options: {
                  //    // hmr: isDev,
                  //    // reloadAll: true
                  // },
               },
               'css-loader',
               'sass-loader'
            ]
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            type: 'asset/resource',
            // Настройки для картинок в css
            generator: {
               filename: 'img/[name][ext]',
               publicPath: './'
            }
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]',
               publicPath: './'
            }
         },
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
         filename: filename('css'),
         // chunkFilename: '[id].css',
      }),

      new CopyWebpackPlugin({
         patterns: [
            // img
            {
               from: `${path.resolve(__dirname, 'src')}/img`,
               to: `${path.resolve(__dirname, 'dist')}/img`,
            },
         ],
      }),

      new HtmlWebpackPlugin({
         title: 'forkio project',
         template: path.resolve(__dirname, 'src') + '/html/index.html',
         filename: 'index.html',
      }),
   ]

}

