module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/edit': {
        target: 'https://mallapi.duyiedu.com/',
      },
    },
  },
};
