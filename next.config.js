/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rollover401ktogold.us', 'gitty-subdomains-9rwdvkrw0-lucorpmediacoms-projects.vercel.app'],
  },
  env: {
    MASTER_REPO_URL: 'gitty-subdomains-9rwdvkrw0-lucorpmediacoms-projects.vercel.app',
    DOMAIN_NAME: 'rollover401ktogold.us'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'gitty-subdomains-9rwdvkrw0-lucorpmediacoms-projects.vercel.app/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig