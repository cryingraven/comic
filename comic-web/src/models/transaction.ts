import { Chapter } from './chapter'
import { Comic } from './comic'
import { User } from './user'

export interface InternalTransaction {
	transaction_id: number
	user_id: number
	user: User
	comic_id: number
	comic: Comic
	chapter_id: number
	chapter: Chapter
	amount: number
	type: string
	created_at: Date
	updated_at: Date
	status: string
}
