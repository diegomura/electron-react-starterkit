const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'inline-source-map',
  // target: 'electron-renderer',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devServer: {
    setup() {
      console.log('Staring Main Process...');
      childProcess.spawn(
        'npm',
        ['run', 'start']
      )
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
    }
  },
};
