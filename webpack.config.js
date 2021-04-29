const PATH = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/my-main.js",
  output: {
    path: PATH.resolve(__dirname, "dist"),
    filename: "my-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    // ☆IEは11以上、Androidは4.4以上
                    // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
                    overrideBrowserslist: [
                      "last 2 versions",
                      "ie >= 11",
                      "Android >= 4",
                    ],
                    grid: true,
                  }),
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/recipe.css",
      ignoreOrder: true,
    }),
    // new StylelintPlugin({
    //   files: ['./src/css/**.scss'],
    //   fix: true,
    //   syntax: 'scss'
    // }),
  ],
};
