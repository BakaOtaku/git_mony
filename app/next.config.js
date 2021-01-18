const withOffline = require('next-offline')

module.exports = withOffline({
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /.jpg$/,
        handler: 'CacheFirst'
      },
      {
        urlPattern: /api/,
        handler: 'NetworkFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              'x-test': 'true'
            }
          }
        }
      }
    ]
  }
})