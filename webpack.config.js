const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');

module.exports = {
  context: path.join(__dirname, 'src'),
  // target: 'electron-renderer',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ],
  devServer: {
    setup() {
      console.log('Staring Main Process...');
      childProcess.spawn(
        'npm',
        ['run', 'start'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
    }
  },
};
