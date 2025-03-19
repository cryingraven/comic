import { Chapter } from '@/models/chapter'
import { getImageUrl } from '@/utils/imageurl'
import { ArrowRight, Favorite, Visibility } from '@mui/icons-material'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { formatNumber } from '@/utils/format'
import clsx from 'clsx'

interface ChapterItemProps {
	chapter: Chapter
}

const ChapterItem = ({ chapter }: ChapterItemProps) => {
	return (
		<Link href={`/read/${chapter.comic_id}/${chapter.chapter_id}`}>
			<div className="flex items-center p-4 w-full border-b border-b-gray-400 cursor-pointer hover:bg-gray-100 transition duration-300">
				<Image
					src={getImageUrl(chapter.image)}
					alt={chapter.title}
					width={200}
					height={200}
					className="rounded-lg md:w-32 md:h-32 w-20 h-20"
				/>
				<div className="flex flex-col md:flex-row flex-grow md:items-center">
					<div className="flex flex-col ml-4 flex-grow">
						<p
							className={clsx(
								'text-sm md:text-md',
								chapter.price > 0 && 'text-orange-500 font-bold',
								'text-gray-500'
							)}
						>
							{chapter.price
								? `${chapter.price} Coin - ${(chapter.price * 2500).toLocaleString('id-ID')} IDR`
								: 'Free'}
						</p>
						<h3 className="text-md md:text-lg font-semibold">
							{chapter.title}
						</h3>
						<p className="text-gray-500 text-xs md:text-sm">
							{moment(chapter.created_at).fromNow()}
						</p>
					</div>
					<div className="ml-4 flex gap-4 mr-4">
						<p className="text-blue-600 text-xs md:text-md">
							<Visibility /> {formatNumber(chapter.views)}
						</p>
						<p className="text-blue-600 text-xs md:text-md">
							<Favorite /> {formatNumber(chapter.likes)}
						</p>
					</div>
				</div>
				<ArrowRight className="ml-auto hidden md:block" />
			</div>
		</Link>
	)
}

export default ChapterItem
