export function getImageUrl(image: string) {
	const baseUrl =
		process.env.NEXT_PUBLIC_IMAGE_URL || 'https://images.24comic.com'
	const imageUrl = `${baseUrl}/${image}`
	return imageUrl
}
