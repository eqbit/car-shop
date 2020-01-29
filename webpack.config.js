var path = require('path');

module.exports = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: "/assets/",
    filename: "js/bundle.js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  }
};
