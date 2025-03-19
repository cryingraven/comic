import React from 'react'
import { Container, Typography, IconButton, Link } from '@mui/material'
import {
	Facebook,
	Twitter,
	Instagram,
	Apple,
	Google,
} from '@mui/icons-material'
import Image from 'next/image'

const Footer = () => {
	return (
		<footer className="py-10 bg-blue-50">
			<Container maxWidth="lg">
				<div className="flex justify-center m-3">
					<Image
						src={'/logo.png'}
						alt="Logo"
						width={200}
						height={200}
						className="h-12"
					/>
				</div>
				<div className="flex justify-center space-x-2">
					<IconButton href="https://facebook.com" target="_blank">
						<Facebook />
					</IconButton>
					<IconButton href="https://twitter.com" target="_blank">
						<Twitter />
					</IconButton>
					<IconButton href="https://instagram.com" target="_blank">
						<Instagram />
					</IconButton>
					<IconButton href="https://apps.apple.com" target="_blank">
						<Apple />
					</IconButton>
					<IconButton href="https://play.google.com" target="_blank">
						<Google />
					</IconButton>
				</div>
				<div className="flex justify-between md:flex-row flex-col items-center">
					<Typography variant="body2" color="textSecondary">
						© {new Date().getFullYear()} Your Company. All rights reserved.
					</Typography>
					<Typography variant="body2" color="textSecondary">
						<Link href="/privacy" target="_blank" color="inherit">
							Privacy Policy
						</Link>
						{' | '}
						<Link href="/terms" target="_blank" color="inherit">
							Terms and Conditions
						</Link>
					</Typography>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
