/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	pageExtensions: ['page.tsx', 'page.ts'],
	images: {
		domains: ['media.rawg.io'],
	},
};

module.exports = nextConfig;
