import { SaveProfile } from '@/models/profile'
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async post(url: string, data: any) {
		const response = await AppService._axios.post(url, data)
		return response.data.data
	}

	async postMultipart(url: string, data: FormData) {
		const response = await AppService._axios.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data.data
	}

	async saveProfile(data: SaveProfile) {
		const response = await AppService._axios.post('/users', data)
		return response.data.data
	}

	async getCMSComics(skip: number, limit: number) {
		const response = await AppService._axios.get('/cms/comics', {
			params: {
				skip,
				limit,
			},
		})
		return response.data.data
	}

	async getCMSChapters(comicId: number, skip: number, limit: number) {
		const response = await AppService._axios.get(
			`/cms/comics/${comicId}/chapters`,
			{
				params: {
					skip,
					limit,
				},
			}
		)
		return response.data.data
	}
}
