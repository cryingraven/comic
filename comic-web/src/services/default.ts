export default class DefaultBackendService {
	private readonly baseUrl =
		process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
	private static _instance: DefaultBackendService | null = null
	static instance(): DefaultBackendService {
		if (!this._instance) {
			this._instance = new DefaultBackendService()
		}
		return this._instance
	}
	constructor() {}

	async getComics(
		genre = '',
		authorId = '',
		skip = 0,
		limit = 10,
		sort = 'created_at::desc'
	) {
		let url = `${this.baseUrl}/r/comics?skip=${skip}&limit=${limit}`
		if (genre) url += `&genre=${genre}`
		if (authorId) url += `&author_id=${authorId}`
		if (sort) url += `&order_by=${sort}`

		const response = await fetch(url)
		const json = await response.json()
		return json.data
	}

	async getTopComics(skip = 0, limit = 10) {
		const response = await fetch(
			`${this.baseUrl}/r/comics?skip=${skip}&limit=${limit}&order_by=views::desc`
		)
		const json = await response.json()
		return json.data
	}

	async getMainGenres() {
		const response = await fetch(`${this.baseUrl}/r/main-genres`)
		const json = await response.json()
		return json.data
	}

	async getAllGenre() {
		const response = await fetch(`${this.baseUrl}/r/genres`)
		const json = await response.json()
		return json.data
	}

	async getAllPaymentMethods() {
		const response = await fetch(`${this.baseUrl}/payment/methods`)
		const json = await response.json()
		return json.data
	}
}
