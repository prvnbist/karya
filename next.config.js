module.exports = {
   env: {
      HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
      HASURA_HTTPS_URL: process.env.HASURA_HTTPS_URL,
      HASURA_WSS_URL: process.env.HASURA_WSS_URL,
   },
   webpack5: true,
   webpack: config => {
      config.resolve.fallback = { fs: false, module: false }
      return config
   },
   images: {
      domains: ['lh3.googleusercontent.com'],
   },
}
