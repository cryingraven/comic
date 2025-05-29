import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		minimumCacheTTL: 300,
		dangerouslyAllowSVG: true,
		domains: [
			'firebasestorage.googleapis.com',
			'images.pexels.com',
			'via.placeholder.com',
			'placehold.co',
			'images.24comic.com',
			'comic-images.alanmr.com',
			'lh3.googleusercontent.com',
			'link.storjshare.io',
		],
	},
	reactStrictMode: false,
}

export default nextConfig
