/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 强制跳过检查，只保留这一项
    ignoreBuildErrors: true,
  },
};

export default nextConfig;