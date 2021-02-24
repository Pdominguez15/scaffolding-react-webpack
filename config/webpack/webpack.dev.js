const { merge } = require("webpack-merge");

const Dotenv = require("dotenv-webpack");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",

  plugins: [
    new Dotenv({
      path: "./dev.env",
    }),
  ],
});
