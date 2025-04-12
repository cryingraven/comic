'use client'

import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { BarChart, Book, Money } from '@mui/icons-material'

const CMSMasterLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<AppBar
				position="static"
				className="bg-gray-100 text-black container mx-auto shadow-none"
			>
				<Toolbar className="flex gap-4 mx-auto overflow-x-auto min-w-96 h-full">
					<Link href="/cms" className="flex items-center gap-1">
						<BarChart className="text-black" />
						<Typography className="flex-grow uppercase">Dashboard</Typography>
					</Link>
					<Link href="/cms/wallet" className="flex items-center gap-1">
						<Money className="text-black" />
						<Typography className="flex-grow uppercase">Wallet</Typography>
					</Link>
					<Link href="/cms/comics" className="flex items-center gap-1">
						<Book className="text-black" />
						<Typography className="flex-grow uppercase">Comics</Typography>
					</Link>
				</Toolbar>
			</AppBar>
			<div className="container flex mx-auto bg-white">{children}</div>
		</div>
	)
}

export default CMSMasterLayout
