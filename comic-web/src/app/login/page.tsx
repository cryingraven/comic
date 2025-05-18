'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import useStore from '@/store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
import AppService from '@/services/app'
import { convertFirebaseAuthErrorToMessage } from '@/utils/error'

type Inputs = {
	email: string
	password: string
}

const LoginPage = () => {
	const router = useRouter()
	const store = useStore()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true)
		setError(null)
		try {
			const cred = await signInWithEmailAndPassword(
				firebaseAuth,
				data.email,
				data.password
			)
			const user = cred.user
			const token = await user.getIdToken()

			store.setUser(user)
			store.setToken(token)

			await AppService.instance(token).saveProfile({})
			router.push('/')
		} catch (error) {
			const errorMessage = convertFirebaseAuthErrorToMessage(error)
			setError(errorMessage)
		}
		setLoading(false)
	}

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const cred = await signInWithPopup(firebaseAuth, provider)
			const user = cred.user
			const token = await user.getIdToken()
			store.setUser(user)
			store.setToken(token)

			await AppService.instance(token).saveProfile({})
			router.push('/')
		} catch (error) {
			const errorMessage = convertFirebaseAuthErrorToMessage(error)
			setError(errorMessage)
		}
	}

	return (
		<Container className="flex items-center justify-center md:mt-0 mt-10 md:min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-4 md:p-8 rounded shadow-md w-full max-w-sm"
			>
				<Typography variant="h5" className="mb-4">
					Login
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
				<Typography variant="body2" className="mt-2 text-right">
					<a href="/forgot-password" className="text-blue-500 hover:underline">
						Forgot Password?
					</a>
				</Typography>
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
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					className="mt-2 rounded-full"
					disabled={loading}
				>
					Login
				</Button>
				<Button
					href="/register"
					variant="outlined"
					color="primary"
					fullWidth
					className="mt-2  rounded-full"
				>
					Register
				</Button>
				<Typography variant="body2" className="my-4 text-center">
					Or
				</Typography>
				<Button
					className="rounded-full"
					variant="contained"
					color="info"
					fullWidth
					onClick={signInWithGoogle}
					startIcon={<Google />}
				>
					Continue with Google
				</Button>
			</form>
		</Container>
	)
}

export default LoginPage
