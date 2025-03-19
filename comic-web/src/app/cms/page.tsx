import { NextPage } from 'next'

const DashboardHomePage: NextPage = () => {
	return (
		<div className="min-h-screen container max-auto flex items-center justify-center">
			<main className="p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-gray-800">
					Welcome to the Dashboard
				</h1>
				<p className="mt-4 text-gray-600">
					This is the home page of your dashboard.
				</p>
			</main>
		</div>
	)
}

export default DashboardHomePage
