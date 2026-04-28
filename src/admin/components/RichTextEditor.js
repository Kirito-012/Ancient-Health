import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Strikethrough,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Heading3,
	Link as LinkIcon,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Undo2,
	Redo2,
	Eraser,
} from 'lucide-react'

const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
	<button
		type='button'
		onClick={onClick}
		disabled={disabled}
		title={title}
		className={`p-1.5 rounded transition-colors flex items-center justify-center ${
			active
				? 'bg-[#2d5f4f] text-white'
				: 'text-slate-600 hover:bg-slate-100 hover:text-[#2d5f4f]'
		} disabled:opacity-40 disabled:cursor-not-allowed`}>
		{children}
	</button>
)

const Divider = () => <div className='w-px h-5 bg-slate-200 mx-0.5' />

const RichTextEditor = ({
	value = '',
	onChange,
	placeholder = '',
	className = '',
	minHeight = '180px',
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				openOnClick: false,
				autolink: true,
				HTMLAttributes: { class: 'text-[#d4a574] underline' },
			}),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Placeholder.configure({ placeholder }),
		],
		content: value || '',
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			// Tiptap returns <p></p> for empty docs — normalise to '' so required validation works
			onChange?.(html === '<p></p>' ? '' : html)
		},
	})

	// Keep editor in sync when parent value changes externally (e.g., loading edit modal)
	useEffect(() => {
		if (!editor) return
		const current = editor.getHTML()
		const next = value || ''
		if (next !== current && next !== (current === '<p></p>' ? '' : current)) {
			editor.commands.setContent(next || '', false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, editor])

	if (!editor) return null

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href
		const url = window.prompt('URL', previousUrl || 'https://')
		if (url === null) return
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
	}

	return (
		<div
			className={`border border-slate-300 rounded-lg bg-white overflow-hidden ${className}`}>
			{/* Toolbar */}
			<div className='flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-slate-50 border-b border-slate-200 sticky top-0 z-10'>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					active={editor.isActive('heading', { level: 1 })}
					title='Heading 1'>
					<Heading1 className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					active={editor.isActive('heading', { level: 2 })}
					title='Heading 2'>
					<Heading2 className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					active={editor.isActive('heading', { level: 3 })}
					title='Heading 3'>
					<Heading3 className='w-4 h-4' />
				</ToolbarButton>
				<Divider />
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBold().run()}
					active={editor.isActive('bold')}
					title='Bold'>
					<Bold className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleItalic().run()}
					active={editor.isActive('italic')}
					title='Italic'>
					<Italic className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					active={editor.isActive('underline')}
					title='Underline'>
					<UnderlineIcon className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleStrike().run()}
					active={editor.isActive('strike')}
					title='Strikethrough'>
					<Strikethrough className='w-4 h-4' />
				</ToolbarButton>
				<Divider />
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					active={editor.isActive('bulletList')}
					title='Bullet List'>
					<List className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					active={editor.isActive('orderedList')}
					title='Numbered List'>
					<ListOrdered className='w-4 h-4' />
				</ToolbarButton>
				<Divider />
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
					active={editor.isActive({ textAlign: 'left' })}
					title='Align Left'>
					<AlignLeft className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
					active={editor.isActive({ textAlign: 'center' })}
					title='Align Center'>
					<AlignCenter className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
					active={editor.isActive({ textAlign: 'right' })}
					title='Align Right'>
					<AlignRight className='w-4 h-4' />
				</ToolbarButton>
				<Divider />
				<ToolbarButton
					onClick={setLink}
					active={editor.isActive('link')}
					title='Insert / edit link'>
					<LinkIcon className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() =>
						editor
							.chain()
							.focus()
							.unsetAllMarks()
							.clearNodes()
							.run()
					}
					title='Clear formatting'>
					<Eraser className='w-4 h-4' />
				</ToolbarButton>
				<Divider />
				<ToolbarButton
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					title='Undo'>
					<Undo2 className='w-4 h-4' />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					title='Redo'>
					<Redo2 className='w-4 h-4' />
				</ToolbarButton>
			</div>

			{/* Editor */}
			<div
				className='px-3 py-2 prose prose-sm max-w-none focus-within:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[var(--rte-min-h)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0'
				style={{ '--rte-min-h': minHeight }}>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}

export default RichTextEditor
