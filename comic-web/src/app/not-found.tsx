'use client'

import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material'

const NotFoundPage = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			<Container className="flex flex-col justify-center items-center">
				<Typography variant="h1">404</Typography>
				<Typography variant="h5">Page Not Found</Typography>
				<Typography variant="body1">
					The page you are looking for does not exist.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => window.history.back()}
				>
					Go Back
				</Button>
			</Container>
		</Box>
	)
}

export default NotFoundPage
