'use client'

import { NextPage } from 'next'
// import { Bar, Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
} from 'chart.js'
import useStore from '@/store'
import { User } from '@/models/user'
import AppService from '@/services/app'
import { useEffect, useState } from 'react'
import { Alert } from '@mui/material'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement
)

interface CountStats {
	num_of_comics: number
	total_revenue: number
	total_donation: number
	total_views: number
}

const DashboardHomePage: NextPage = () => {
	const store = useStore()
	const [profile, setProfile] = useState<User>()
	const [countStats, setCountStats] = useState<CountStats>()

	const fetchProfile = async () => {
		const profile = await AppService.instance(
			store.token || ''
		).getAuthorProfile()
		setProfile(profile)
	}

	const fetchStats = async () => {
		const stats = await AppService.instance(store.token || '').getAuthorStats()
		setCountStats(stats)
	}

	// const revenueData = {
	// 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	// 	datasets: [
	// 		{
	// 			label: 'Revenue Growth',
	// 			data: [65, 59, 80, 81, 56, 55, 40],
	// 			backgroundColor: 'rgba(75, 192, 192, 0.2)',
	// 			borderColor: 'rgba(75, 192, 192, 1)',
	// 			borderWidth: 1,
	// 		},
	// 	],
	// }

	// const viewData = {
	// 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	// 	datasets: [
	// 		{
	// 			label: 'Number of Views',
	// 			data: [12, 19, 3, 5, 2, 3, 7],
	// 			fill: false,
	// 			backgroundColor: 'rgba(153, 102, 255, 0.2)',
	// 			borderColor: 'rgba(153, 102, 255, 1)',
	// 		},
	// 	],
	// }

	useEffect(() => {
		fetchProfile()
		fetchStats()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
			<div className="flex flex-wrap -mx-2">
				<Alert severity="warning" className="w-full mb-4">
					<p>
						Pada tanggal <strong>[Tanggal] [Bulan] 2025</strong>, semua komik
						yang <strong>BELUM DI-PUBLISH</strong> akan{' '}
						<strong>DIHAPUS PERMANEN</strong>.
					</p>
					<p>
						Komik yang sudah terbit <strong>AMAN</strong> dan tidak akan
						terpengaruh. Jangan sampai kehilangan karyamu!
					</p>
				</Alert>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Wallet Balance</div>
							<div className="text-yellow-600">
								Rp.{' '}
								{profile ? profile.wallet_balance.toLocaleString('id-ID') : 0}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Revenue 30D</div>
							<div className="text-orange-600">
								Rp.{' '}
								{countStats?.total_revenue
									? countStats?.total_revenue.toLocaleString('id-ID')
									: 0}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Donation 30D</div>
							<div className="text-orange-600">
								Rp.{' '}
								{countStats?.total_donation
									? countStats?.total_donation.toLocaleString('id-ID')
									: 0}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/2 px-2 mb-4">
					<div className="bg-green-600 shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold text-white">Comics</div>
							<div className="text-white">{countStats?.num_of_comics}</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/2 px-2 mb-4">
					<div className="bg-purple-600 shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold text-white">
								Total Views 30D
							</div>
							<div className="text-white">
								{countStats?.total_views
									? countStats?.total_views.toLocaleString('id-ID')
									: 0}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="w-full md:w-1/2 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Revenue Growth</div>
							<Bar data={revenueData} />
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Number of Views</div>
							<Line data={viewData} />
						</div>
					</div>
				</div> */}
			</div>
		</div>
	)
}

export default DashboardHomePage
