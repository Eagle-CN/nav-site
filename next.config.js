/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 添加安全相关配置
  poweredByHeader: false,
  // 最小化输出
  compress: true,
  // 生产环境移除控制台输出
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}

module.exports = nextConfig 