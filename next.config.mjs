/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Fix for pg package and cloudflare:sockets
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        util: false,
        buffer: false,
        events: false,
        child_process: false,
        worker_threads: false,
      };
    }
    
    // Add ignore plugin for problematic modules
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^cloudflare:sockets$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^@cloudflare\/workers-types$/,
      })
    );
    
    // Handle module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'cloudflare:sockets': false,
      'pg-native': false,
    };
    
    return config;
  },
  serverExternalPackages: ['pg'],
}

export default nextConfig
