'use client'

import AdsBanner from '@/components/ads/banner'
import LatestBlogs from '@/components/blogs/latestblog'
import ComicSlider from '@/components/hero/comics'
import Carousel from '@/components/hero/slider'
import DefaultBackendService from '@/services/default'
import { useEffect, useState } from 'react'

export default function Home() {
	const [topComics, setTopComics] = useState([])
	const [banners, setBanners] = useState([])
	const [exclusiveComics, setExclusiveComics] = useState([])
	const [newReleaseComics, setNewReleaseComics] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const [
				topComicsData,
				bannersData,
				exclusiveComicsData,
				newReleaseComicsData,
			] = await Promise.all([
				DefaultBackendService.instance().getTopComics(0, 12),
				DefaultBackendService.instance().getActiveBannerByPosition('HT'),
				DefaultBackendService.instance().getComics(
					'Exclusive Comic',
					undefined,
					0,
					12,
					'random'
				),
				DefaultBackendService.instance().getComics(
					undefined,
					undefined,
					0,
					12,
					'created_at::desc'
				),
			])
			setTopComics(topComicsData)
			setBanners(bannersData)
			setExclusiveComics(exclusiveComicsData)
			setNewReleaseComics(newReleaseComicsData)
		}
		fetchData()
	}, [])

	return (
		<div className="flex flex-col mx-auto min-h-screen container">
			<Carousel banners={banners} />
			<ComicSlider title="Top Comics" comics={topComics} />
			<ComicSlider title="Exclusive Comics" comics={exclusiveComics} />
			<AdsBanner />
			<LatestBlogs />
			<ComicSlider title="New Release Comics" comics={newReleaseComics} />
		</div>
	)
}
