'use client'

import React from 'react'
import { Modal, Button, Typography, Paper } from '@mui/material'
import { Chapter } from '@/models/chapter'
import { Comic } from '@/models/comic'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'

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
	const router = useRouter()
	const { data } = useSWR('/users/me')
	const purchase = async () => {
		if (onPurchase) {
			onPurchase(comic.comic_id, chapter.chapter_id)
		}
	}

	console.log(data)

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
					Are you sure you want to purchase this comic episode ?
				</Typography>
				<div className="flex flex-col gap-2 mt-8">
					<Button
						variant="contained"
						color="warning"
						className="p-2 rounded-full"
						onClick={purchase}
						disabled={
							!data || !chapter || (data && data?.balance < chapter?.price)
						}
					>
						Pay Using {chapter?.price} Coins
					</Button>
					<Button
						variant="contained"
						color="primary"
						className="p-2 rounded-full"
						onClick={() =>
							router.push(`/payment/chapter/${chapter.chapter_id}`)
						}
					>
						Pay IDR {(chapter?.fiat_price).toLocaleString('id-ID')}
					</Button>
					<Button
						variant="outlined"
						color="info"
						className="p-2 rounded-full"
						onClick={onClose}
					>
						Cancel
					</Button>
				</div>
			</Paper>
		</Modal>
	)
}

export default PurchaseModal
