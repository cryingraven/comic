'use client'

import React, { useState } from 'react'
import {
	Card,
	CardContent,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material'
import { format } from 'date-fns'

const WalletPage = () => {
	const [balance, setBalance] = useState(1000)
	const [transactions, setTransactions] = useState([
		{
			id: 1,
			amount: -50,
			date: '2023-10-01 - 10:00 AM',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 2,
			amount: 200,
			date: '2023-10-02 - 10:00 AM',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 3,
			amount: -30,
			date: '2023-10-03 - 10:00 AM',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
	])
	const [filterDate, setFilterDate] = useState('')

	const handleWithdraw = () => {
		setBalance(balance - 100)
		setTransactions([
			...transactions,
			{
				id: transactions.length + 1,
				amount: -100,
				date: format(new Date(), 'yyyy-MM-dd'),
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			},
		])
	}

	const filteredTransactions = filterDate
		? transactions.filter((transaction) => transaction.date === filterDate)
		: transactions

	return (
		<div className="p-4 w-full">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Wallet</h1>
			<Card className="mb-4">
				<CardContent className="flex justify-between items-center">
					<div>
						<Typography variant="h5">Balance</Typography>
						<Typography variant="h6">${balance}</Typography>
					</div>
					<Button
						variant="contained"
						color="primary"
						onClick={handleWithdraw}
						className="rounded-full"
					>
						Withdraw $100
					</Button>
				</CardContent>
			</Card>
			<Card className="mb-4">
				<CardContent>
					<Typography variant="h6">Transactions</Typography>
					<TextField
						label="Filter by Date"
						type="date"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
						InputLabelProps={{ shrink: true }}
						className="mb-4"
					/>
					<List>
						{filteredTransactions.map((transaction) => (
							<ListItem key={transaction.id} className="border-b">
								<ListItemText
									primary={
										<span
											style={{
												color: transaction.amount > 0 ? 'green' : 'red',
											}}
										>
											${transaction.amount}
										</span>
									}
									secondary={
										<>
											{transaction.date}
											<br />
											{transaction.description}
										</>
									}
								/>
							</ListItem>
						))}
					</List>
					<Button
						variant="outlined"
						color="primary"
						fullWidth
						className="rounded-full"
					>
						More
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

export default WalletPage
