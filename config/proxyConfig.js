module.exports = {
  proxy: {
    '/server': {    //将www.exaple.com印射为/apis
      target: 'http://localhost:9999',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/server': ''   //需要rewrite的,
      }
    }
  }
}
