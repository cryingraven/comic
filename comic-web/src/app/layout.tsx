import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/providers'
import Layout from '@/components/layout/main'

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
			<head>
				<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}