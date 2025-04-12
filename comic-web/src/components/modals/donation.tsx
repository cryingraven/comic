'use client'

import React, { useEffect, useState } from 'react'
import { Modal, Box, Button, TextField, Typography } from '@mui/material'
import { PaymentMethod } from '@/models/paymentmethod'
import DefaultBackendService from '@/services/default'
import Image from 'next/image'
import { getImageUrl } from '@/utils/imageurl'
import useStore from '@/store'
import AppService from '@/services/app'
import { useRouter } from 'next/navigation'

interface DonationModalProps {
	authorId: number
	open: boolean
	handleClose: () => void
}

const DonationModal = ({ open, handleClose, authorId }: DonationModalProps) => {
	const store = useStore()
	const router = useRouter()
	const [amount, setAmount] = useState(10000)
	const [methods, setMethods] = useState<PaymentMethod[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		null
	)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleAmountChange = (event: any) => {
		setAmount(event.target.value)
	}

	const handleDonate = async () => {
		setLoading(true)
		try {
			if (amount < 10000) {
				alert('Minimum donation amount is 10.000 IDR')
				return
			}

			const response = await AppService.instance(store.token || '').post(
				`/payment/donate`,
				{
					author_id: authorId,
					amount: amount,
					method_id: selectedMethod?.method_id || 0,
				}
			)
			console.log(
				`Donated ${amount} to author ${authorId} using method ${selectedMethod?.method_id}`
			)

			if (response.order_id) {
				router.push(`/payment/${response.order_id}`)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
		handleClose()
	}

	const fetchMethods = async () => {
		const newMethods =
			await DefaultBackendService.instance().getAllPaymentMethods()
		setMethods(newMethods)
	}

	useEffect(() => {
		fetchMethods()
	}, [])

	const filterMethods = methods.filter((method) => {
		return amount >= 10000 || method.method_type === 'ewallet'
	})

	return (
		<Modal open={open} onClose={handleClose}>
			<Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-1/ min-w-[300px] max-w-[400px]">
				<Typography variant="h6" className="mb-4">
					Donation
				</Typography>
				<div className="flex flex-wrap gap-2 mb-8">
					{[10000, 20000, 50000, 100000].map((value) => (
						<Button
							key={value}
							variant="outlined"
							onClick={() => setAmount(value)}
							className={`px-4 py-2 ${amount === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
						>
							{value.toLocaleString('id-ID')}
						</Button>
					))}
				</div>
				<TextField
					label="Custom Amount"
					type="number"
					value={amount}
					onChange={handleAmountChange}
					className="mb-8 w-full"
				/>
				<div className="mb-4">
					<p className="text-gray-800">Select Payment Method</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
					{filterMethods.map((method) => (
						<div
							key={method.method_id}
							className={`flex items-center cursor-pointer p-4 bg-white rounded-lg gap-2 hover:bg-gray-100 transition duration-300 ${selectedMethod?.method_id === method.method_id ? 'border border-blue-500' : ''}`}
							onClick={() => setSelectedMethod(method)}
						>
							<Image
								src={getImageUrl(method.method_image)}
								alt={method.method_name}
								className="w-12 h-12 object-contain"
								width={64}
								height={64}
							/>
							<span className="font-bold text-sm">
								{method.method_description}
							</span>
						</div>
					))}
				</div>
				<Button
					variant="contained"
					color="warning"
					onClick={handleDonate}
					className="w-full rounded-full"
					disabled={loading}
				>
					Donate
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleClose}
					className="w-full rounded-full mt-2"
				>
					Cancel
				</Button>
			</Box>
		</Modal>
	)
}

export default DonationModal
