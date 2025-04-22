import AdsBanner from '@/components/ads/banner'
import LatestBlogs from '@/components/blogs/latestblog'
import ComicSlider from '@/components/hero/comics'
import Carousel from '@/components/hero/slider'
import DefaultBackendService from '@/services/default'

export default async function Home() {
	const [topComics, exclusiveComics] = await Promise.all([
		DefaultBackendService.instance().getTopComics(0, 12),
		DefaultBackendService.instance().getTopComics(0, 12),
	])

	return (
		<div className="flex flex-col mx-auto min-h-screen container">
			<Carousel />
			<ComicSlider title="Top Comics" comics={topComics} />
			<AdsBanner />
			<ComicSlider title="Exclusive Comics" comics={exclusiveComics} />
			<LatestBlogs />
		</div>
	)
}
