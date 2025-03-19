import React, { useState } from 'react'
import { Container } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface UploadInputProps {
	existingFiles?: File[]
	onChange: (files: File[]) => void
}

const UploadInput = ({ existingFiles, onChange }: UploadInputProps) => {
	const [files, setFiles] = useState<File[]>(existingFiles || [])
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
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
					border: '2px dashed gray',
					padding: '20px',
					textAlign: 'center',
				}}
			>
				<input {...getInputProps()} />
				{files.length === 0 && (
					<p>Drag and drop files here, or click to select files</p>
				)}
				{files.length > 0 && (
					<div>
						{files.map((file, index) => (
							<div key={index} className="mt-4 flex w-full">
								<Image
									src={URL.createObjectURL(file)}
									alt={file.name}
									className="w-full"
									width={100}
									height={100}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</Container>
	)
}

export default UploadInput
