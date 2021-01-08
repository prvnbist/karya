module.exports = {
   env: {
      HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
      HASURA_HTTPS_URL: process.env.HASURA_HTTPS_URL,
      HASURA_WSS_URL: process.env.HASURA_WSS_URL,
   },
   webpack: (config, { isServer }) => {
      if (!isServer) {
         config.node = { fs: 'empty', module: 'empty' }
      }

      return config
   },
}
