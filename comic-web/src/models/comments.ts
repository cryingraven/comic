import { Chapter } from './chapter'
import { User } from './user'

export interface Comments {
	comment_id: number
	user_id: number
	chapter_id: number
	content: string
	created_at: Date
	updated_at: Date
	user?: User
	chapter?: Chapter
}
