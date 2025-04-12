export function getImageUrl(image: string) {
	if (image.startsWith('http')) {
		return image
	}

	const baseUrl =
		process.env.NEXT_PUBLIC_IMAGE_URL || 'https://images.24comic.com'
	const imageUrl = `${baseUrl}/${image}?wrap=0`

	return imageUrl
}
