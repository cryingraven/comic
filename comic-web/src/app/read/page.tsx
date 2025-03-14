'use client'

import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Card, Button } from '@mui/material'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
	Comment,
	ChevronLeft,
	ChevronRight,
	ThumbUp,
} from '@mui/icons-material'

const ComicReadingPage = () => {
	const router = useRouter()
	const [showAppBar, setShowAppBar] = useState(false)

	const toggleAppBar = () => {
		setShowAppBar(!showAppBar)
	}

	return (
		<div className="w-full flex flex-col" onClick={toggleAppBar}>
			{showAppBar && (
				<AppBar position="fixed" className="bg-gray-100 text-black">
					<Toolbar className="flex justify-between">
						<div className="flex justify-center items-center space-x-3 overflow-hidden flex-nowrap">
							<Image
								src={'/logo.png'}
								alt="Logo"
								width={100}
								height={50}
								className="h-6"
							/>
							<Typography variant="subtitle1" className="hidden md:flex">
								Comic Reading
							</Typography>
							<Typography variant="subtitle1" className="hidden md:flex">
								&gt;
							</Typography>
							<Typography
								variant="subtitle1"
								className="hidden md:flex"
								textOverflow={'ellipsis'}
							>
								Episode 1
							</Typography>
						</div>
						<div className="flex">
							<Button
								onClick={() => router.back()}
								className="p-1 md:p-2"
								size="small"
							>
								<ChevronLeft />
							</Button>
							<Button
								onClick={() => router.forward()}
								className="p-1 md:p-2"
								size="small"
							>
								<ChevronRight />
							</Button>
							<Button className="p-1 md:p-2" size="small">
								<Comment />
							</Button>
							<Button className="p-1 md:p-2" size="small">
								<ThumbUp />
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			)}
			<div className="flex flex-col items-center container mx-auto">
				{Array.from({ length: 10 }).map((_, index) => (
					<Card key={index} className="w-full">
						<Image
							src={`https://images.pexels.com/photos/${index + 1}/pexels-photo-${index + 1}.jpeg`}
							alt={`Comic Page ${index + 1}`}
							layout="responsive"
							width={800}
							height={600}
						/>
					</Card>
				))}
			</div>
		</div>
	)
}

export default ComicReadingPage
