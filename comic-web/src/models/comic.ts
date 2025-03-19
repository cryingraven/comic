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
	views: number
	likes: number
	shares: number
	comments: number
	created_at: Date
	updated_at: Date
}
