'use client'

import TopUpForm from '@/components/form/topup'
import DefaultBackendService from '@/services/default'
import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'

export default function TopUpPage() {
	const [methods, setMethods] = useState([])
	const [packages, setPackages] = useState([])

	const fetchData = async () => {
		const fetchedMethods =
			await DefaultBackendService.instance().getAllPaymentMethods()
		const fetchedPackages =
			await DefaultBackendService.instance().getAllPackages()
		setMethods(fetchedMethods)
		setPackages(fetchedPackages)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="container mx-auto p-4 md:p-10">
			<Typography variant="h4" gutterBottom className="font-bold">
				Top Up
			</Typography>
			<TopUpForm packages={packages} methods={methods} />
		</div>
	)
}
