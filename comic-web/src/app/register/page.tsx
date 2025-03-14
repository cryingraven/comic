'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
type Inputs = {
	email: string
	password: string
	confirmPassword: string
}

const RegisterPage = () => {
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
					Register
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
