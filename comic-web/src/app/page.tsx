import AdsBanner from '@/components/ads/banner'
import LatestBlogs from '@/components/blogs/latestblog'
import ComicSlider from '@/components/hero/comics'
import Carousel from '@/components/hero/slider'
import DefaultBackendService from '@/services/default'

export default async function Home() {
	const [topComics, banners, exclusiveComics] = await Promise.all([
		DefaultBackendService.instance().getTopComics(0, 12),
		DefaultBackendService.instance().getActiveBannerByPosition('HT'),
		DefaultBackendService.instance().getComics(
			'Exclusive',
			undefined,
			0,
			12,
			'views::desc'
		),
		DefaultBackendService.instance().getTopComics,
	])

	return (
		<div className="flex flex-col mx-auto min-h-screen container">
			<Carousel banners={banners} />
			<ComicSlider title="Top Comics" comics={topComics} />
			<ComicSlider title="Exclusive Comics" comics={exclusiveComics} />
			<AdsBanner />
			<LatestBlogs />
		</div>
	)
}
