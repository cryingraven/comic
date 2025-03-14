import { Button, Typography } from '@mui/material'
import Image from 'next/image'

const Banner = () => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-8">
			<div className="md:w-1/2 text-center md:text-left">
				<Typography
					variant="h4"
					className="title font-bold text-2xl md:text-3xl mb-4"
				>
					FLYING HIGHER WITH KOOMIK
				</Typography>
				<Typography
					variant="body1"
					className="description text-lg md:text-xl mb-4"
				>
					Publish your comic and read unlimited free comics anywhere anytime!
				</Typography>
				<div className="mt-4">
					<Button
						variant="contained"
						className="button w-full md:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded"
						href="/genres"
					>
						Start Reading
					</Button>
				</div>
				<div className="mt-4">
					<Button
						variant="contained"
						className="btnOrange w-full md:w-auto bg-orange-500 text-white font-semibold py-2 px-4 rounded"
						href="https://cms.koomik.id/cms"
					>
						Upload Your Comic
					</Button>
				</div>
			</div>
			<div className="md:w-1/2 mt-8 md:mt-0">
				<Image
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
