'use client'

import { Payment } from '@/models/payment'
import { getImageUrl } from '@/utils/imageurl'
import { CopyAll } from '@mui/icons-material'
import { Button, CircularProgress, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const PaymentInstruction = () => {
	const params = useParams()
	const router = useRouter()
	const paymentId = params.payment_id
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [instruction, setInstruction] = useState<any | null>(null)
	const { data } = useSWR<Payment>(`/payment/detail/${paymentId}`)

	useEffect(() => {
		if (data && data.payment_response) {
			setInstruction(JSON.parse(data.payment_response))
		}
	}, [data])

	return (
		<>
			{!data && (
				<div className="flex justify-center items-center h-screen">
					<CircularProgress />
				</div>
			)}
			{data && (
				<div className="flex w-full flex-col p-4 bg-white max-w-[600px] mx-auto rounded-lg items-center justify-center">
					<Typography variant="h5" gutterBottom className="font-bold">
						Payment Instruction
					</Typography>
					<Typography variant="h3" className="font-bold text-blue-500 mt-4">
						IDR {data.amount.toLocaleString('id-ID')}
					</Typography>
					{data?.payment_method?.method_type === 'va' && (
						<div className="flex w-full flex-col my-4 md:gap-2">
							<div className="flex items-center gap-2">
								<Image
									src={getImageUrl(data?.payment_method?.method_image)}
									alt={data?.payment_method?.method_name}
									className="w-32"
									width={100}
									height={100}
								/>
								<p className="font-semibold">
									{data?.payment_method?.method_description} VA
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-gray-600">Account Number:</p>
								<p
									className="font-bold text-lg md:text-2xl text-gray-700 flex justify-between w-full cursor-pointer"
									onClick={() => {
										navigator.clipboard
											.writeText(instruction?.va_numbers[0]?.va_number)
											.then(() => {
												alert('VA Number copied to clipboard!')
											})
											.catch((err) => {
												console.error('Failed to copy: ', err)
											})
									}}
								>
									<span>{instruction?.va_numbers[0]?.va_number}</span>
									<CopyAll />
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-gray-600">Expired At :</p>
								<p className="font-bold text-md md:text-xl text-gray-500">
									{moment(instruction?.expiry_time).format(
										'DD MMMM YYYY, HH:mm'
									)}
								</p>
							</div>

							<Button
								variant="outlined"
								onClick={() => router.back()}
								color="info"
								className="mt-8 p-2 md:p-4 rounded-full"
							>
								Back
							</Button>
						</div>
					)}

					{data?.payment_method?.method_type === 'ewallet' && (
						<div className="flex w-full flex-col my-4 md:gap-2">
							<Image
								src={getImageUrl(data?.payment_method?.method_image)}
								alt={data?.payment_method?.method_name}
								className="w-32"
								width={100}
								height={100}
							/>
							<Button
								variant="contained"
								onClick={() => {
									const deepLink = instruction?.actions?.filter(
										(action: { name: string }) =>
											action.name === 'deeplink-redirect'
									)[0]?.url

									if (deepLink) {
										window.open(deepLink, '_blank')
									}
								}}
								color="primary"
								className="mt-8 p-2 md:p-4 rounded-full"
							>
								Open {data?.payment_method?.method_name}
							</Button>
							<Button
								variant="outlined"
								onClick={() => router.back()}
								color="info"
								className="mt-4 p-2 md:p-4 rounded-full"
							>
								Back
							</Button>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default PaymentInstruction
