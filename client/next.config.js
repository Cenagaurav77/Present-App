/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://picsum.photos/'],
  },
  reactStrictMode: false,
  // basePath: '/present',
  headers: async () => {
    return [
      {
        // matching all API routes
        // source: '/present/api/:path*',
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
