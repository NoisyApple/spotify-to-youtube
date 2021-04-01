const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  output: {
    path: path.join(__dirname, "server-dist"),
    filename: "server.js",
  },
  entry: "./src/server/index.js",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
};
