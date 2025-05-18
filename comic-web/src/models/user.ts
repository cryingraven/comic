export interface User {
	user_id: number
	firebase_uid: string
	email: string | null
	fullname: string | null
	phone_number: string | null
	balance: number
	wallet_balance: number
	image: string | null
	is_verified: boolean
	is_verified_author: boolean
	has_notification: boolean
	created_at: Date
	updated_at: Date
}
