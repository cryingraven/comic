import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: [
			'firebasestorage.googleapis.com',
			'images.pexels.com',
			'via.placeholder.com',
			'images.24comic.com',
		],
	},
}

export default nextConfig
