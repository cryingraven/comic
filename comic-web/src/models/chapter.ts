import { Access } from './access'

export interface Chapter {
	chapter_id: number
	comic_id: number
	title: string
	subtitle: string
	image: string
	price: number
	fiat_price: number
	views: number
	likes: number
	comments: number
	shares: number
	accesses?: Access[]
	published_at: Date
	created_at: Date
	updated_at: Date
}

export interface ChapterNavigation {
	previous?: Chapter | null
	next?: Chapter | null
}
