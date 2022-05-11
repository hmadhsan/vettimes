let webpack = require("webpack"),
  path = require("path"),
  TerserPlugin = require("terser-webpack-plugin"),
  credential = require("fs").readFileSync("./.credential", "utf8");

  

let app = {
  publicPath: "/",
  outputDir: "../public/",
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  assetsDir: undefined,
  css: undefined,
  configureWebpack: {
    devServer: {
      proxy: "http://cpd-dev.vettimes.co.uk",
      public: "http://cpd-dev.vettimes.co.uk:8080",
      contentBase: `${__dirname}/src`,
      overlay: { warnings: true, errors: true },
      headers: { "Access-Control-Allow-Origin": "*" },
      disableHostCheck: true,
      inline: true,
      hot: true
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue2-editor/nuxt'
  ],
  auth:{
    
  },
 
  plugins: [
    { src: '~/plugins/myplugin.js', mode: 'client' },
    { src: '~/plugins/vue2-editor.js', mode: 'client' }
  ]
};

if (process.env.NODE_ENV === "production") {
  app.configureWebpack = {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: "app.js"
    },
    plugins: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { output: { comments: false } }
      }),
      new webpack.BannerPlugin(credential)
    ]
  };
  app.css = {
    extract: { filename: "app.css" }
  };
  app.indexPath = path.resolve(__dirname, "../resources/views/app.blade.php");
}

module.exports = app;
