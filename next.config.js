/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export
  output: 'export',

  // Optional: configure trailing slash behavior for GitHub Pages
  // GitHub Pages prefers trailing slashes for directory indexes
  trailingSlash: true,

  // Disable image optimization for static export
  // GitHub Pages cannot run the image optimization server
  images: {
    unoptimized: true,
  },

  // Optional: basePath if deploying to a repo subdirectory
  // Uncomment and set to '/repo-name' if needed
  // basePath: '',

  // Optional: assetPrefix if using a CDN
  // assetPrefix: '',

  // Ensure static export compatibility
  // Disables features that require a server
  experimental: {
    // Enable if using the App Router (recommended for new projects)
    appDir: true,
  },

  // Ensure environment variables are correctly handled at build time
  env: {
    // Build-time environment variables can be exposed here if needed
  },

  // Webpack configuration for static export
  webpack: (config, { isServer }) => {
    // Ensure client-side only code is not bundled for the server
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
