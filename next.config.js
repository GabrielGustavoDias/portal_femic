/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	ignoreBuildErrors: true,
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
