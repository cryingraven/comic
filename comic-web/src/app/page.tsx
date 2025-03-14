import Banner from '@/components/hero/banner'
import ComicSlider from '@/components/hero/comics'
import Featured from '@/components/hero/featured'
import ComicGenreTabs from '@/components/hero/genres'

export default function Home() {
	return (
		<div className="flex flex-col mx-auto min-h-screen container">
			<Banner />
			<Featured />
			<ComicSlider />
			<ComicGenreTabs />
		</div>
	)
}
