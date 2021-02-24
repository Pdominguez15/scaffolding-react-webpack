const path = require("path");
const basePath = path.resolve(__dirname, "../../");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(basePath, "src"),

  resolve: {
    alias: {
      scenes: path.resolve(basePath, "src/scenes"),
      pods: path.resolve(basePath, "src/pods/"),
    },
    extensions: [".js", ".ts", ".tsx"],
  },

  entry: {
    app: ["regenerator-runtime/runtime", "./index.tsx"],
    appStyles: ["./mystyles.scss"],
  },

  output: {
    filename: "[name].[chunkhash].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=5000",
        options: {
          esModule: false,
        },
      },

      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
