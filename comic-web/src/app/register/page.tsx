'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
import useStore from '@/store'
import { useState } from 'react'
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
type Inputs = {
	email: string
	password: string
	confirmPassword: string
}

const RegisterPage = () => {
	const store = useStore()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setIsLoading(true)
		try {
			const cred = await createUserWithEmailAndPassword(
				firebaseAuth,
				data.email,
				data.password
			)
			const token = await cred.user.getIdToken()
			await sendEmailVerification(cred.user)
			store.setUser(cred.user)
			store.setToken(token)
		} catch (error: unknown) {
			console.log(error)
			setError('Failed to register user')
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
					Register
				</Typography>
				{error && (
					<Typography variant="body2" className="mt-2 text-red-500 text-center">
						{error}
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
				<TextField
					{...register('password', { required: 'Password is required' })}
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
				<TextField
					{...register('confirmPassword', {
						required: 'Confirm Password is required',
					})}
					label="Confirm Password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					className="mt-2"
					disabled={isLoading}
				>
					Register
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

export default RegisterPage
