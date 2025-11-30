const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint blocking deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;



