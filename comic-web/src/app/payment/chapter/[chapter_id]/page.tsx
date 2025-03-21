'use client'

import useSWR from 'swr'
import { Chapter } from '@/models/chapter'
import { getImageUrl } from '@/utils/imageurl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from '@mui/material'
import { PaymentMethod } from '@/models/paymentmethod'
import DefaultBackendService from '@/services/default'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppService from '@/services/app'
import useStore from '@/store'

export default function CheckoutPage() {
	const { chapter_id } = useParams()
	const router = useRouter()
	const store = useStore()

	const { data, error } = useSWR<Chapter>(`/r/chapters/${chapter_id}`)
	const [methods, setMethods] = useState<PaymentMethod[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		null
	)

	const fetchMethods = async () => {
		const newMethods =
			await DefaultBackendService.instance().getAllPaymentMethods()
		setMethods(newMethods)
	}

	const processPurchase = async () => {
		setLoading(true)

		try {
			if (!selectedMethod) return
			const response = await AppService.instance(store.token || '').post(
				`/payment/buy-fiat/${data?.comic_id}/${data?.chapter_id}`,
				{
					method_id: selectedMethod.method_id,
				}
			)

			if (response.order_id) {
				router.push(`/payment/${response.order_id}`)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchMethods()
	}, [])

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	const filterMethods = methods.filter((method) => {
		return data?.fiat_price >= 10000 || method.method_type === 'ewallet'
	})

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full gap-2 max-w-md">
				<h1 className="text-2xl font-bold mb-4">Checkout</h1>
				<div className="mb-4">
					<h2 className="text-xl font-semibold">{data.title}</h2>
					<p className="text-gray-600">{data.subtitle}</p>
				</div>
				<div className="mb-4">
					<Image
						src={getImageUrl(data.image)}
						alt={data.title}
						width={256}
						height={256}
						className="w-full h-64 object-cover rounded-lg"
					/>
				</div>
				<div className="mb-4">
					<p className="text-gray-800 flex justify-between">
						Price
						<span className="text-orange-500 font-semibold">
							IDR {data.fiat_price.toLocaleString('id-ID')}
						</span>
					</p>
				</div>
				<div className="mb-4">
					<p className="text-gray-800">Select Payment Method</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
					{filterMethods.map((method) => (
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
				<div className="flex flex-col-reverse md:flex-row gap-2">
					<Button
						fullWidth
						variant="outlined"
						color="info"
						className="p-2 md:p-4 rounded-full"
					>
						Back
					</Button>
					<Button
						fullWidth
						variant="contained"
						className="p-2 md:p-4 rounded-full"
						color="warning"
						disabled={!selectedMethod || loading}
						onClick={processPurchase}
					>
						Purchase
					</Button>
				</div>
			</div>
		</div>
	)
}
