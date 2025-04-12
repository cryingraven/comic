'use client'

import { NextPage } from 'next'
import { Bar, Line } from 'react-chartjs-2'
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
import Image from 'next/image'

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

const DashboardHomePage: NextPage = () => {
	const revenueData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Revenue Growth',
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	}

	const viewData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Number of Views',
				data: [12, 19, 3, 5, 2, 3, 7],
				fill: false,
				backgroundColor: 'rgba(153, 102, 255, 0.2)',
				borderColor: 'rgba(153, 102, 255, 1)',
			},
		],
	}

	const topComics = [
		{ title: 'Comic 1', image: '/path/to/image1.jpg' },
		{ title: 'Comic 2', image: '/path/to/image2.jpg' },
		{ title: 'Comic 3', image: '/path/to/image3.jpg' },
	]
	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
			<div className="flex flex-wrap -mx-2">
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Wallet Balance</div>
							<div className="text-yellow-600">$2500</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Revenue</div>
							<div className="text-orange-600">$5000</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Donation</div>
							<div className="text-orange-600">$5000</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-green-600 shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold text-white">
								Number of Comics
							</div>
							<div className="text-white">120</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-blue-600 shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold text-white">
								Number of Donations
							</div>
							<div className="text-white">300</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
					<div className="bg-purple-600 shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold text-white">
								Total Views
							</div>
							<div className="text-white">10000</div>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 px-2 mb-4">
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
				</div>
				<div className="w-full px-2 mb-4">
					<div className="bg-white shadow-md rounded-lg p-4">
						<div>
							<div className="text-lg font-semibold">Top Comics</div>
							<div className="flex flex-wrap -mx-2">
								{topComics.map((comic, index) => (
									<div
										className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
										key={index}
									>
										<div className="bg-white shadow-md rounded-lg p-4">
											<div>
												<Image
													width={100}
													height={100}
													src={comic.image}
													alt={comic.title}
													className="w-full h-48 object-cover mb-2"
												/>
												<div className="text-lg font-semibold">
													{comic.title}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardHomePage
