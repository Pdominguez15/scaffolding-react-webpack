const { merge } = require("webpack-merge");

const Dotenv = require("dotenv-webpack");

const ImageminPlugin = require("imagemin-webpack");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  stats: "verbose",

  plugins: [
    new Dotenv({
      path: "./prod.env",
    }),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
});
