export interface Chapter {
	chapter_id: number
	comic_id: number
	title: string
	subtitle: string
	image: string
	price: number
	views: number
	likes: number
	comments: number
	shares: number
	created_at: Date
	updated_at: Date
}

export interface ChapterNavigation {
	previous?: Chapter | null
	next?: Chapter | null
}
