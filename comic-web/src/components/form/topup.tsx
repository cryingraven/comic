'use client'

import { PaymentMethod } from '@/models/paymentmethod'
import { getImageUrl } from '@/utils/imageurl'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

interface TopUpFormProps {
	methods: PaymentMethod[]
}

const TopUpForm = ({ methods }: TopUpFormProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedPackage, setSelectedPackage] = useState<any | null>(null)
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		null
	)
	const packages = [
		{ id: 1, price: 15000, coins: 15 },
		{ id: 2, price: 30000, coins: 30 },
		{ id: 3, price: 50000, coins: 50 },
		{ id: 4, price: 100000, coins: 100 },
		{ id: 5, price: 200000, coins: 200 },
	]

	return (
		<div className="flex flex-col">
			<Typography variant="h6" gutterBottom className="font-bold mb-4">
				Payment Method
			</Typography>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{methods.map((method) => (
					<div
						key={method.id}
						className={`flex items-center cursor-pointer p-4 bg-white rounded-lg gap-2 hover:bg-gray-100 transition duration-300 ${selectedMethod?.id === method.id ? 'border-2 border-blue-500' : ''}`}
						onClick={() => setSelectedMethod(method)}
					>
						<Image
							src={getImageUrl(method.method_image)}
							alt={method.method_name}
							className="w-16 h-16 object-contain"
							width={64}
							height={64}
						/>
						<span className="font-bold">{method.method_name}</span>
					</div>
				))}
			</div>
			<Typography variant="h6" gutterBottom className="font-bold mt-4">
				Select Package
			</Typography>
			<div className="my-4">
				{packages.map((pkg) => (
					<div
						key={pkg.id}
						className={`flex justify-between items-center cursor-pointer p-2 border-b text-lg font-semibold hover:bg-gray-100 transition duration-300 ${selectedPackage?.id === pkg.id ? 'bg-gray-200' : ''}`}
						onClick={() => setSelectedPackage(pkg)}
					>
						<p>
							<span className="text-blue-700">
								{pkg.coins.toLocaleString()}
							</span>{' '}
							Coins
						</p>
						<span>{pkg.price.toLocaleString('id-ID')} IDR</span>
					</div>
				))}
			</div>

			<div className="flex justify-end mt-4">
				<Button
					variant="contained"
					color="warning"
					className="p-4 rounded-full w-full md:max-w-96"
					disabled={!selectedPackage || !selectedMethod}
				>
					Top Up
				</Button>
			</div>
		</div>
	)
}

export default TopUpForm
