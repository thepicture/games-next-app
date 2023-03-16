/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	output: 'standalone',
	pageExtensions: ['page.tsx', 'page.ts'],
	images: {
		domains: ['media.rawg.io'],
	},
};

module.exports = nextConfig;
