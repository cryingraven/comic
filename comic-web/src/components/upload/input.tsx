import React, { useState } from 'react'
import { Avatar, Container } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { getImageUrl } from '@/utils/imageurl'

interface UploadInputProps {
	oldImage?: string
	onChange: (files: File[]) => void
}

const UploadInput = ({ oldImage, onChange }: UploadInputProps) => {
	const [files, setFiles] = useState<File[]>([])
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 2, // 4MB
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
					border: '2px dashed gray',
					padding: '20px',
					textAlign: 'center',
				}}
			>
				<input {...getInputProps()} />
				{files.length === 0 && (
					<p>Drag and drop files here, or click to select file (Max. 2MB)</p>
				)}
				{files.length > 0 && (
					<div>
						{files.map((file, index) => (
							<div
								key={index}
								className="mt-4 flex w-full items-center justify-center"
							>
								<Avatar
									src={URL.createObjectURL(file)}
									sx={{ width: 100, height: 100 }}
									className="border border-gray-300"
								/>
							</div>
						))}
					</div>
				)}

				{files.length === 0 && oldImage && (
					<div className="justify-center items-center mt-4 flex w-full">
						<Avatar
							src={getImageUrl(oldImage) || ''}
							sx={{ width: 100, height: 100 }}
							className="border border-gray-300"
						/>
					</div>
				)}
			</div>
		</Container>
	)
}

export default UploadInput
