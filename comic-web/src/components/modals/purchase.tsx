import React from 'react'
import { Modal, Button, Typography, Paper } from '@mui/material'
import { Chapter } from '@/models/chapter'
import { Comic } from '@/models/comic'

interface PurchaseModalProps {
	chapter: Chapter
	comic: Comic
	onPurchase?: (comicId: number, chapterId: number) => void
	onClose: () => void
	showModal: boolean
}

const PurchaseModal = ({
	chapter,
	comic,
	showModal,
	onClose,
	onPurchase,
}: PurchaseModalProps) => {
	const purchase = async () => {
		if (onPurchase) {
			onPurchase(comic.comic_id, chapter.chapter_id)
		}
	}

	return (
		<Modal
			className="flex md:items-center items-end justify-center"
			open={showModal}
			onClose={() => onClose()}
		>
			<Paper className="p-4 w-full md:w-96 mx-auto">
				<Typography variant="h6" component="h2">
					Purchase {comic?.title}&apos;s Episode
				</Typography>
				<Typography variant="body1">
					Are you sure you want to purchase this comic episode using{' '}
					{chapter?.price} coins?
				</Typography>
				<div className="flex md:flex-row flex-col gap-2 my-2">
					<Button variant="contained" color="primary" onClick={purchase}>
						Confirm
					</Button>
					<Button variant="outlined" color="secondary" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</Paper>
		</Modal>
	)
}

export default PurchaseModal
