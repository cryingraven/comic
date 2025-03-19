import Banner from '@/components/hero/banner'
import ComicSlider from '@/components/hero/comics'
import Featured from '@/components/hero/featured'
import ComicGenreTabs from '@/components/hero/genres'
import DefaultBackendService from '@/services/default'

export default async function Home() {
	const comics = await DefaultBackendService.instance().getTopComics(0, 12)
	const mainGenres = await DefaultBackendService.instance().getMainGenres()

	return (
		<div className="flex flex-col mx-auto min-h-screen container">
			<Banner />
			<Featured />
			<ComicSlider comics={comics} />
			<ComicGenreTabs genres={mainGenres} />
		</div>
	)
}
