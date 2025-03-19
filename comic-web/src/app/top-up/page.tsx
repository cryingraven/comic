import TopUpForm from '@/components/form/topup'
import DefaultBackendService from '@/services/default'
import { Typography } from '@mui/material'

const TopUpPage = async () => {
	const methods = await DefaultBackendService.instance().getAllPaymentMethods()

	return (
		<div className="container mx-auto p-4 md:p-10">
			<Typography variant="h4" gutterBottom className="font-bold">
				Top Up
			</Typography>
			<TopUpForm methods={methods} />
		</div>
	)
}

export default TopUpPage
