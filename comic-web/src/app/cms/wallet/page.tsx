'use client'

import React, { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { format } from 'date-fns'
import useStore from '@/store'
import AppService from '@/services/app'
import { InternalTransaction } from '@/models/transaction'
import moment from 'moment'
import clsx from 'clsx'

const WalletPage = () => {
	const store = useStore()
	const [balance, setBalance] = useState(0)
	const [transactions, setTransactions] = useState<InternalTransaction[]>([])
	const [startDate, setStartDate] = useState(moment().add(-7, 'days'))
	const [endDate, setEndDate] = useState(moment())
	const [skip, setSkip] = useState(0)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limit, setLimit] = useState(10)

	const fetchWalletBalance = async () => {
		const response = await AppService.instance(
			store.token || ''
		).getAuthorProfile()
		setBalance(response.wallet_balance)
	}

	const handleWithdraw = () => {}

	const fetchTransactions = async () => {
		const response = await AppService.instance(store.token || '').getWalletTxs(
			startDate.toDate(),
			endDate.toDate(),
			skip,
			limit
		)
		setTransactions(response)
		setSkip(skip + limit)
	}

	const resetTransactions = () => {
		setTransactions([])
		setSkip(0)
	}

	useEffect(() => {
		fetchWalletBalance()
		fetchTransactions()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Wallet</h1>
			<Card className="mb-4">
				<CardContent className="flex justify-between items-center">
					<div>
						<Typography variant="h5">Balance</Typography>
						<Typography variant="h6" className="text-green-500 font-bold">
							Rp. {balance.toLocaleString('id-ID')}
						</Typography>
					</div>
					<Button
						variant="contained"
						color="primary"
						onClick={handleWithdraw}
						className="rounded-full"
						disabled
					>
						Withdraw
					</Button>
				</CardContent>
			</Card>
			<Card className="mb-4">
				<CardContent>
					<Typography variant="h6">Transactions</Typography>
					<div className="flex space-x-4 mb-4">
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								label="Start Date"
								value={startDate}
								onChange={(date) => {
									setStartDate(date ? date : moment())
									resetTransactions()
								}}
							/>
							<DatePicker
								label="End Date"
								value={endDate}
								onChange={(date) => {
									setEndDate(date ? date : moment().add(7, 'days'))
									resetTransactions()
								}}
							/>
						</LocalizationProvider>
					</div>
					<List>
						{transactions.map((transaction) => (
							<ListItem key={transaction.transaction_id} className="border-b">
								<ListItemText
									primary={
										<span
											style={{
												color: transaction.amount > 0 ? 'green' : 'red',
											}}
										>
											Rp. {transaction.amount.toLocaleString('id-ID')}
										</span>
									}
									secondary={
										<>
											{format(transaction.created_at, 'dd MMM yyyy - HH:mm')}
											<br />
											{transaction.type
												.replaceAll('-', ' ')
												.toUpperCase()} -{' '}
											<span className="font-bold">
												{transaction.comic.title}
											</span>
										</>
									}
								/>
								<Typography
									variant="body2"
									className={clsx('font-bold ml-auto', {
										'text-green-500': transaction.status === 'success',
										'text-red-500': transaction.status === 'failed',
										'text-yellow-500': transaction.status === 'pending',
									})}
								>
									{transaction.status}
								</Typography>
							</ListItem>
						))}
					</List>
					{transactions.length > 0 && transactions.length % limit === 0 && (
						<Button
							variant="outlined"
							color="primary"
							fullWidth
							className="rounded-full"
							onClick={fetchTransactions}
						>
							More
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default WalletPage
