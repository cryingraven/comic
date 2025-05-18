'use client'
import React, { useState } from 'react'
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
	TextField,
	Button,
	IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Comments } from '@/models/comments'
import moment from 'moment'
import useStore from '@/store'
import useSWRInfinite from 'swr/infinite'
import AppService from '@/services/app'
import { getImageUrl } from '@/utils/imageurl'

interface CommentsDrawerProps {
	chapterId: string
	onClose: () => void
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
	chapterId,
	onClose,
}: CommentsDrawerProps) => {
	const store = useStore()
	const [newComment, setNewComment] = useState('')

	const getKey = (pageIndex: number, previousPageData: Comments[]) => {
		if (previousPageData && !previousPageData.length) return null
		return `/r/comments/${chapterId}?skip=${pageIndex * 10}&limit=10`
	}

	const fetcher = async (url: string) => {
		const token = store.token
		const appService = AppService.instance(token)
		return appService.get(url)
	}

	const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

	const comments = data ? ([] as Comments[]).concat(...data) : []

	const handleAddComment = async () => {
		if (newComment.trim()) {
			const token = store.token
			const appService = AppService.instance(token)
			await appService.addComment(Number(chapterId), newComment)
			setNewComment('')
			setSize(size + 1)
		}
	}

	return (
		<div className="md:w-80 w-full z-50 relative h-full">
			<div className="flex justify-between items-center p-4 w-full">
				<Typography variant="h6">Comments</Typography>
				<IconButton onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</div>
			<List
				className="overflow-auto"
				style={{ maxHeight: 'calc(100% - 120px)' }}
			>
				{comments.map((comment: Comments) => (
					<ListItem key={comment.comment_id}>
						<Avatar
							src={getImageUrl(comment.user?.image || '')}
							key={comment.user?.fullname || 'User'}
							className="mr-2"
						/>
						<ListItemText
							primary={comment.user?.fullname || 'User'}
							secondary={`${comment.content} - ${moment(comment.created_at).fromNow()}`}
						/>
					</ListItem>
				))}
			</List>
			<div className="p-4 fixed bottom-0 md:w-80 w-full bg-white">
				<TextField
					fullWidth
					label="Add a comment"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					margin="normal"
				/>
				<Button
					variant="contained"
					color="warning"
					className="rounded-full"
					fullWidth
					onClick={handleAddComment}
				>
					Submit
				</Button>
			</div>
		</div>
	)
}

export default CommentsDrawer
