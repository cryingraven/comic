'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
import { convertFirebaseAuthErrorToMessage } from '@/utils/error'

type Inputs = {
	email: string
}

const ForgotPasswordPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsLoading(true)
		setError('')
		setSuccess('')
		try {
			await sendPasswordResetEmail(firebaseAuth, data.email)
			setSuccess('Password reset email sent!')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const errorMessage = convertFirebaseAuthErrorToMessage(error)
			setError(errorMessage)
		}
		setIsLoading(false)
	}

	return (
		<Container className="flex items-center justify-center min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-8 rounded shadow-md w-full max-w-sm"
			>
				<Typography variant="h5" className="mb-4">
					Forgot Password
				</Typography>
				{error && (
					<Typography variant="body2" className="mt-2 text-red-500 text-center">
						{error}
					</Typography>
				)}
				{success && (
					<Typography
						variant="body2"
						className="mt-2 text-green-500 text-center"
					>
						{success}
					</Typography>
				)}
				<TextField
					{...register('email', { required: 'Email is required' })}
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					className="mt-2"
					disabled={isLoading}
				>
					Send Reset Email
				</Button>
				<Button
					href="/login"
					variant="outlined"
					color="primary"
					fullWidth
					className="mt-2"
				>
					Back to Login
				</Button>
			</form>
		</Container>
	)
}

export default ForgotPasswordPage
