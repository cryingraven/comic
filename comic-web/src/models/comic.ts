import { User } from './user'

export interface Comic {
	comic_id: number
	title: string
	description: string
	image: string
	cover: string
	banner: string
	comic_type: string
	status: string
	user_id: number
	author?: User
	genre: string
	subgenres: string
	views: number
	likes: number
	total_chapters: number | null
	shares: number
	comments: number
	published_at: Date
	created_at: Date
	updated_at: Date
}
