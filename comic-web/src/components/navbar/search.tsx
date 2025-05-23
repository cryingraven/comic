import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface SearchForm {
	query: string
}

const NavbarSearch = () => {
	const { register, handleSubmit } = useForm<SearchForm>()
	const router = useRouter()

	const onSearch = (data: SearchForm) => {
		router.push(`/search?q=${encodeURIComponent(data.query)}`)
	}

	return (
		<form onSubmit={handleSubmit(onSearch)}>
			<input
				type="text"
				{...register('query')}
				autoComplete="off"
				autoCorrect="off"
				placeholder="Search..."
				className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button type="submit" className="hidden">
				Search
			</button>
		</form>
	)
}

export default NavbarSearch
