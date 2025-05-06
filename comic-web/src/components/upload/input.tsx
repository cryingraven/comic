import React, { useState } from 'react'
import { Avatar, Container, IconButton } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { getImageUrl } from '@/utils/imageurl'
import { Edit } from '@mui/icons-material'
import Image from 'next/image'

interface UploadInputProps {
	mode?: 'div' | 'avatar'
	label?: string
	showLabel?: boolean
	oldImage?: string
	onChange: (files: File[]) => void
}

const UploadInput = ({
	oldImage,
	onChange,
	showLabel,
	label,
	mode,
}: UploadInputProps) => {
	const [files, setFiles] = useState<File[]>([])
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 2, // 2MB
		onError: (error) => {
			console.error(error)
			alert('Error uploading file. (Upload file max. 2MB)')
		},
		onDrop: (acceptedFiles: File[]) => {
			setFiles(acceptedFiles)
			onChange(acceptedFiles)
		},
	})

	return (
		<Container className="max-w-96 mx-auto">
			<div
				{...getRootProps()}
				style={{
					border: !showLabel ? 'none' : '2px dashed gray',
					padding: '20px',
					textAlign: 'center',
				}}
			>
				<input {...getInputProps()} />
				{files.length === 0 && showLabel && (
					<p>
						{label ||
							'Drag and drop files here, or click to select file (Max. 2MB)'}
					</p>
				)}
				{files.length > 0 && (
					<div>
						{files.map((file, index) => (
							<div
								key={index}
								className="relative justify-center items-center mt-4 flex w-full"
							>
								{!mode || mode === 'div' ? (
									<Image
										src={URL.createObjectURL(file)}
										alt={file.name}
										width={1024}
										height={1024}
										className="w-full"
									/>
								) : (
									<Avatar
										src={URL.createObjectURL(file)}
										sx={{ width: 100, height: 100 }}
										className="border border-gray-300"
									/>
								)}
								{mode === 'avatar' && (
									<IconButton
										sx={{
											position: 'absolute',
											bottom: 0,
											right: 100,
											backgroundColor: 'gray',
											borderRadius: '50%',
											padding: '4px',
											color: 'white',
										}}
									>
										<Edit fontSize="small" />
									</IconButton>
								)}
							</div>
						))}
					</div>
				)}

				{files.length === 0 && oldImage && (
					<div className="relative justify-center items-center mt-4 flex w-full">
						{!mode || mode === 'div' ? (
							<Image
								src={getImageUrl(oldImage) || ''}
								alt={oldImage}
								width={1024}
								height={1024}
								className="w-full"
							/>
						) : (
							<Avatar
								src={getImageUrl(oldImage) || ''}
								sx={{ width: 100, height: 100 }}
								className="border border-gray-300"
							/>
						)}
						{mode === 'avatar' && (
							<IconButton
								sx={{
									position: 'absolute',
									bottom: 0,
									right: 100,
									backgroundColor: 'gray',
									borderRadius: '50%',
									padding: '4px',
									color: 'white',
								}}
							>
								<Edit fontSize="small" />
							</IconButton>
						)}
					</div>
				)}
			</div>
		</Container>
	)
}

export default UploadInput
