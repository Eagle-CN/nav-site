/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // 添加外部图片域名
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // 优化构建
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 静态导出（如果需要）
  // output: 'export',
}

module.exports = nextConfig 