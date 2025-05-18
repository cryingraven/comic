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

	async unpublishComic(comicId: number) {
		const response = await AppService._axios.delete(`/cms/comics/${comicId}`)
		return response.data.data
	}

	async getAuthorProfile() {
		const response = await AppService._axios.get('/users/me')
		return response.data.data
	}

	async getWalletTxs(
		startDate: Date,
		endDate: Date,
		skip: number,
		limit: number
	) {
		const response = await AppService._axios.get('/cms/author/wallet/txs', {
			params: {
				start_date: startDate.toISOString(),
				end_date: endDate.toISOString(),
				skip,
				limit,
			},
		})
		return response.data.data
	}

	async isLikedChapter(chapterId: number) {
		const response = await AppService._axios.get(`/r/favorites/${chapterId}`)
		return response.data.data
	}

	async toggleLikeChapter(chapterId: number) {
		const response = await AppService._axios.post(`/r/favorites/${chapterId}`)
		return response.data.data
	}

	async getComments(chapterId: number, skip: number, limit: number) {
		const response = await AppService._axios.get(
			`/r/comments/${chapterId}?skip=${skip}&limit=${limit}`
		)
		return response.data.data
	}

	async addComment(chapterId: number, content: string) {
		const response = await AppService._axios.post(`/r/comments/${chapterId}`, {
			comment: content,
		})
		return response.data.data
	}

	async deleteComment(commentId: number) {
		const response = await AppService._axios.delete(`/r/comments/${commentId}`)
		return response.data.data
	}

  async getAuthorStats() {
    const response = await AppService._axios.get('/cms/author/stats')
    return response.data.data
  }
}
