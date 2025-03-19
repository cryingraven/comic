import { Comic } from '@/models/comic'
import { formatNumber } from '@/utils/format'
import { getImageUrl } from '@/utils/imageurl'
import { Visibility } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

interface ComicItemProps {
	data: Comic
}
const ComicItem = ({ data }: ComicItemProps) => {
	return (
		<Link href={`/comics/${data.comic_id}`}>
			<div
				className={`border rounded-lg bg-gray-50 cursor-pointer transition-transform transform hover:scale-105`}
			>
				<Image
					src={getImageUrl(data.image)}
					alt={data.title}
					width={500}
					height={300}
					className="w-full h-60 object-center object-cover relative z-30 rounded-t-lg transition-transform transform hover:scale-105"
				/>
				<h2 className="text-sm md:text-md font-bold p-2 h-14 text-ellipsis">
					{data.title}
				</h2>
				<p className="text-sm font-semibold p-2">{data.genre}</p>
				<div className="p-2 flex items-center text-blue-600 gap-2 text-xs md:text-md">
					<Visibility /> {formatNumber(data.views)}
				</div>
			</div>
		</Link>
	)
}

export default ComicItem
