import Image from 'next/image'
import Button from '@mui/material/Button'

const Featured = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center justify-center">
				<div className="w-full md:w-12/12 text-center">
					<p className="text-3xl font-bold mb-4">WHAT MAKES US DIFFERENT?</p>
				</div>
				<div className="w-full md:w-8/12 text-center">
					<p className="text-xl leading-relaxed">
						Our mission is to create a platform that makes everyone happy. We
						believe that the source of reader&apos;s happiness is a happy
						artist. So here are all the benefits you will receive as an artist
						at 24Comic.
					</p>
				</div>
			</div>
			<div className="flex flex-col lg:flex-row items-center bg-gray-200 w-full mt-4">
				<div className="flex flex-col items-center py-6 px-8 text-center w-full lg:w-1/3">
					<div>
						<Image
							src="https://images.24comic.com/assets/icon-wallet.png"
							layout="intrinsic"
							width={100}
							height={100}
							alt="Wallet"
						/>
					</div>
					<div>
						<p className="text-2xl font-semibold mb-2">ADS & SALES REVENUE</p>
					</div>
					<div>
						<p className="text-center text-lg leading-relaxed">
							Get paid immediately when people read your comic. Don&apos;t
							worry, you can do withdrawal any time.
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center py-6 px-8 text-center w-full lg:w-1/3">
					<div>
						<Image
							src="https://images.24comic.com/assets/astronout.png"
							layout="intrinsic"
							width={300}
							height={300}
							alt="Astronout"
						/>
					</div>
				</div>
				<div className="flex flex-col items-center py-6 px-8 text-center w-full lg:w-1/3">
					<div>
						<Image
							src="https://images.24comic.com/assets/icon-clock.png"
							layout="intrinsic"
							width={100}
							height={100}
							alt="Clock"
						/>
					</div>
					<div>
						<p className="text-2xl font-semibold mb-2">NO DEADLINE</p>
					</div>
					<div>
						<p className="text-center text-lg leading-relaxed">
							Take your time and create amazing comic, then publish them when
							you are ready.
						</p>
					</div>
				</div>
			</div>
			<div className="w-full text-center mt-8">
				<Button variant="contained" color="primary" href="/genres">
					Learn more about us
				</Button>
			</div>
		</div>
	)
}

export default Featured
