import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    // Địa chỉ cũ /docs/{vi|en|ja}/... chuyển sang môn Claude Code.
    return [
      {
        source: '/docs/:lang(vi|en|ja)/:path*',
        destination: '/docs/claude-code/:lang/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
