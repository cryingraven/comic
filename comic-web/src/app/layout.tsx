import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: '24Comic - Home',
	description:
		'Welcome to 24Comic, your go-to source for the latest and greatest comics. Explore a vast collection of comics from various genres and enjoy a seamless reading experience.',
	openGraph: {
		title: '24Comic - Home',
		description:
			'Welcome to 24Comic, your go-to source for the latest and greatest comics. Explore a vast collection of comics from various genres and enjoy a seamless reading experience.',
		url: 'https://www.24comic.com',
		siteName: '24Comic',
		images: [
			{
				url: 'https://www.24comic.com/logo.png',
				width: 1200,
				height: 630,
			},
		],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: '24Comic - Home',
		description:
			'Welcome to 24Comic, your go-to source for the latest and greatest comics. Explore a vast collection of comics from various genres and enjoy a seamless reading experience.',
		images: ['https://www.24comic.com/logo.png'],
	},
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
