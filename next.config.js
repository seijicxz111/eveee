/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'images.weserv.nl' },
      { protocol: 'https', hostname: '64.media.tumblr.com' },
    ],
  },
};

module.exports = nextConfig;
