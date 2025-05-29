import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		minimumCacheTTL: 300,
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '', // Optional: Defaults to '' (standard ports 80/443)
				pathname: '/**', // Allows any path on this hostname
			},
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.24comic.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'comic-images.alanmr.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'link.storjshare.io',
				port: '',
				pathname: '/**',
			},
		],
	},
	reactStrictMode: false,
}

export default nextConfig
