import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { appSettings } from './package.json'

const defaultEnv = {
  dev: true,
  production: false,
  disable_login: false
}

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

const productionPlugins = [new ExtractTextPlugin('[name].css')]

export default (env = defaultEnv) => ({
  entry: [
    'babel-polyfill',
    ...(env.dev
      ? [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://0.0.0.0:8080',
          'webpack/hot/only-dev-server'
        ]
      : []),
    path.join(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devtool: env.dev ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      path.resolve('./assets'),
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: (env.dev ? ['react-hot-loader/webpack'] : []).concat([
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ])
      },
      {
        // ES& modules
        test: /\.js$/,
        include: [path.resolve('node_modules', 'io-ts-reporters')],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: env.dev
          ? [
              'style-loader',
              'css-loader?importLoader=1',
              'postcss-loader?sourceMap',
              'resolve-url-loader',
              'sass-loader?sourceMap'
            ]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?importLoader=1',
                'postcss-loader?sourceMap',
                'resolve-url-loader',
                'sass-loader?sourceMap'
              ]
            })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader:
              'url-loader?name=assets/images/[name]_[hash].[ext]&limit=10000'
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    ...(env.dev ? devPlugins : productionPlugins),
    new webpack.DefinePlugin({
      __PRODUCTION__: !env.dev,
      __SERVER__: false,
      __APIBASEURL__: JSON.stringify(
        env.dev ? appSettings.dev.baseUrl : appSettings.production.baseUrl
      )
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    hot: env.dev,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000/'
      }
    }
  }
})
