const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './main.ts',
  resolve: {
      extensions: ['.ts', '.scss', '.js', '.json']
  },
  output: {
      path: `${__dirname}/dist`,
      filename: 'Main.js'
  },
  watch: true,
  mode: "development",
  devtool: "source-map",
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: {
                  loader: 'ts-loader'
              }
          }
      ]
  },
  plugins: [
      new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          server: { baseDir: [__dirname] }
      })
  ]
}