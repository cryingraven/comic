'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import { getImageUrl } from '@/utils/imageurl'
import { useRouter } from 'next/navigation'

const PaymentSuccessPage = () => {
	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 w-full max-w-[600px]">
				<Image
					src={getImageUrl('assets/icon-wallet.png')}
					alt="Success"
					width={200}
					height={200}
					className="w-32"
				/>
				<h1 className="text-2xl font-bold mt-4 text-blue-700">
					Payment Successful!
				</h1>
				<p className="text-gray-600 text-center mt-4">
					Thank you for your purchase! You can now use your coins to buy more
					comics.
				</p>
				<Button
					variant="contained"
					color="primary"
					className="mt-4 rounded-full p-2 md:p-4"
					fullWidth
					onClick={() => router.push('/')}
				>
					Back to Home
				</Button>
			</div>
		</div>
	)
}

export default PaymentSuccessPage
