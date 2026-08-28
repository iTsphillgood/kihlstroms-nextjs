/** @type {import('next').NextConfig} */
const isWpExport = process.env.WP_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.blocketcdn.se' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'edge.sitecorecloud.io' }
    ]
  },
  ...(isWpExport
    ? {
        // Statisk HTML-export för WordPress-exporten (scripts/build-wordpress.mjs)
        output: "export",
        images: { unoptimized: true }
      }
    : {})
};

export default nextConfig;
