const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      ['/api', '/scrape'],
      createProxyMiddleware({
          target: 'http://localhost:9000',
          secure: false,
          changeOrigin: true,
      })
  );
};