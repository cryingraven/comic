export function clearMarkdown(text: string): string {
	return text
		.replace(/\[.*?\]\(.*?\)/g, '') // Remove links
		.replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
		.replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, '$1') // Remove bold and italic
		.replace(/`(.*?)`/g, '$1') // Remove inline code
		.replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
		.replace(/^#+\s*/gm, '') // Remove headers
		.replace(/^\s*[-*+]\s+/gm, '') // Remove unordered list markers
		.replace(/^\s*\d+\.\s+/gm, '') // Remove ordered list markers
		.replace(/^\s*>\s+/gm, '') // Remove blockquotes
		.replace(/^\s*`{3}[\s\S]*?`{3}\s*$/gm, '') // Remove code blocks
		.replace(/^\s*~~~[\s\S]*?~~~\s*$/gm, '') // Remove fenced code blocks
		.replace(/^\s*---\s*$/gm, '') // Remove horizontal rules
		.trim() // Trim leading and trailing whitespace
}
