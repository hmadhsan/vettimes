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
      proxy: "https://cpd.vettimes.co.uk",
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
    'vue2-editor/nuxt',
    '@nuxtjs/proxy'
    
  ],
  axios: {
    // WARNING: proxy doesn't work with nuxt generate,
    // have to use a prefix and set an API_URL
    proxy: true,
  
  },
  proxy: [
    ['/rest', { target: 'http://cpdlocal.vettimes.co.uk' }]
],
  auth:{
    
  },
 
  plugins: [
    { src: '~/plugins/myplugin.js', mode: 'client' },
    { src: '~/plugins/vue2-editor.js', mode: 'client' },
    { src:'~/plugins/element-ui.js', mode:'client'},
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
export default {
  localRuntimeConfig: {
    myLocalHost: process.env.LOCAL_HOST,
  },
  serverRuntimeConfig: {
    serverRuntimeConfig: process.env.BASE_URL
  }
}


module.exports = app;
