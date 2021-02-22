module.exports = {
  configureWebpack: {
    devServer: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://www.vtmer2018.top:8066',
          pathRewrite: {
            "^/api": ""
          },
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
    },
    // externals: process.env.NODE_ENV === 'production' ? {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    // }: {},
  },
  pwa: {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  }
}
