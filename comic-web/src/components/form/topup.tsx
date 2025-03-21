'use client'

import { Package } from '@/models/package'
import { PaymentMethod } from '@/models/paymentmethod'
import AppService from '@/services/app'
import useStore from '@/store'
import { getImageUrl } from '@/utils/imageurl'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TopUpFormProps {
	methods: PaymentMethod[]
	packages: Package[]
}

const TopUpForm = ({ methods, packages }: TopUpFormProps) => {
	const store = useStore()
	const router = useRouter()
	const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		null
	)

	const processTopUp = async () => {
		if (!selectedPackage || !selectedMethod) {
			alert('Please select a package and a payment method')
			return
		}

		try {
			const response = await AppService.instance(store.token || '').post(
				'/payment/topup',
				{
					package_id: selectedPackage.package_id,
					method_id: selectedMethod.method_id,
				}
			)

			if (response.order_id) {
				router.push(`/payment/${response.order_id}`)
			}
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="flex flex-col">
			<Typography variant="h6" gutterBottom className="font-bold mb-4">
				Payment Method
			</Typography>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{methods.map((method) => (
					<div
						key={method.method_id}
						className={`flex items-center cursor-pointer p-4 bg-white rounded-lg gap-2 hover:bg-gray-100 transition duration-300 ${selectedMethod?.method_id === method.method_id ? 'border-2 border-blue-500' : ''}`}
						onClick={() => setSelectedMethod(method)}
					>
						<Image
							src={getImageUrl(method.method_image)}
							alt={method.method_name}
							className="w-16 h-16 object-contain"
							width={64}
							height={64}
						/>
						<span className="font-bold">{method.method_description}</span>
					</div>
				))}
			</div>
			<Typography variant="h6" gutterBottom className="font-bold mt-4">
				Select Package
			</Typography>
			<div className="my-4">
				{packages.map((pkg) => (
					<div
						key={pkg.package_id}
						className={`flex justify-between items-center cursor-pointer p-2 border-b text-lg font-semibold hover:bg-gray-100 transition duration-300 ${selectedPackage?.package_id === pkg.package_id ? 'bg-gray-200' : ''}`}
						onClick={() => setSelectedPackage(pkg)}
					>
						<p>
							<span className="text-orange-600">
								{pkg.coin.toLocaleString()}
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
					onClick={processTopUp}
				>
					Top Up
				</Button>
			</div>
		</div>
	)
}

export default TopUpForm
