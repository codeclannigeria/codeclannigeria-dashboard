/**
 * In production environment, the proxy cannot take effect,
 * so there is no production environment configuration here
 * For more details, please see https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
