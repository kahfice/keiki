import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://xzpqlpbtauevqittkmvi.supabase.co/storage/**'),
    ],
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
