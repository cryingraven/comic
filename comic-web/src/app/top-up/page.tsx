import TopUpForm from '@/components/form/topup'
import DefaultBackendService from '@/services/default'
import { Typography } from '@mui/material'

const TopUpPage = async () => {
	const methods = await DefaultBackendService.instance().getAllPaymentMethods()
	const packages = await DefaultBackendService.instance().getAllPackages()

	return (
		<div className="container mx-auto p-4 md:p-10">
			<Typography variant="h4" gutterBottom className="font-bold">
				Top Up
			</Typography>
			<TopUpForm packages={packages} methods={methods} />
		</div>
	)
}

export default TopUpPage
