import { Button, Typography } from '@mui/material'
import Image from 'next/image'

const Banner = () => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-8">
			<div className="md:w-1/2 text-center md:text-left p-5 md:p-10">
				<Typography
					variant="h4"
					className="title font-bold text-2xl md:text-3xl mb-4"
				>
					FLYING HIGHER WITH 24COMIC
				</Typography>
				<Typography
					variant="body1"
					className="description text-lg md:text-xl mb-4 text-gray-600"
				>
					Publish your comic and read unlimited free comics anywhere anytime!
				</Typography>
				<div className="mt-4 flex flex-col space-y-3">
					<Button
						variant="outlined"
						className="button w-full md:w-auto  py-4 px-4 rounded-full"
						href="/genres"
						fullWidth
						color="info"
					>
						Start Reading
					</Button>
					<Button
						variant="contained"
						className="btnOrange w-full md:w-auto py-4 px-4 rounded-full"
						href="/cms"
						color="warning"
						fullWidth
					>
						Upload Your Comic
					</Button>
				</div>
			</div>
			<div className="md:w-1/2 mt-8 md:mt-0">
				<Image
					className="p-10"
					priority
					src={`https://images.24comic.com/assets/rocketkoo.png`}
					layout="intrinsic"
					width="705"
					height="616"
					alt="logo"
					objectPosition="50% 50%"
				/>
			</div>
		</div>
	)
}

export default Banner
