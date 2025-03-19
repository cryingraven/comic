import React, { useState } from 'react'
import { Container } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

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

				{files.length === 0 && oldImage && (
					<div className="mt-4 flex w-full">
						<Image
							src={
								oldImage.includes('http')
									? oldImage
									: `https://images.24comic.com/${oldImage}`
							}
							alt="Old Image"
							className="w-full"
							width={100}
							height={100}
						/>
					</div>
				)}
			</div>
		</Container>
	)
}

export default UploadInput
