/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	output: 'standalone',
	pageExtensions: ['page.tsx', 'page.ts'],
};

module.exports = nextConfig;
