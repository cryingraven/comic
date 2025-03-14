'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

type Inputs = {
	email: string
	password: string
}

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data)
	}

	return (
		<Container className="flex items-center justify-center min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-8 rounded shadow-md w-full max-w-sm"
			>
				<Typography variant="h5" className="mb-4">
					Login
				</Typography>
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
					className="mt-2"
				>
					Login
				</Button>
				<Button
					href="/register"
					variant="outlined"
					color="primary"
					fullWidth
					className="mt-2"
				>
					Register
				</Button>
				<Typography variant="body2" className="my-4 text-center">
					Or
				</Typography>
				<Button
					variant="contained"
					color="info"
					fullWidth
					startIcon={<Google />}
				>
					Login with Google
				</Button>
			</form>
		</Container>
	)
}

export default LoginPage
