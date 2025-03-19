import axios from 'axios'

export default class AppService {
	private static _instance: AppService | null = null
	private static readonly baseUrl =
		process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
	private static _axios = axios.create({
		baseURL: this.baseUrl,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	static instance(token: string | null | undefined = undefined): AppService {
		if (!this._instance) {
			this._instance = new AppService()
		}

		if (token) {
			this._axios.interceptors.request.use((config) => {
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			})
		}

		return this._instance
	}
	constructor() {}

	async get(url: string) {
		const response = await AppService._axios.get(url)
		return response.data.data
	}
}
