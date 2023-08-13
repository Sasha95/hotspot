/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    if (typeof config.webpack === "function") {
      return config.webpack(config, options);
    }

    return config;
  },
};

module.exports = nextConfig;
