import { useState, useEffect, useRef, ChangeEvent } from 'react'

interface AutoExpandingTextareaProps {
  placeholder?: string
  className?: string
  text: string
  setText: (val:string) => void
}

const AutoExpandingTextarea: React.FC<AutoExpandingTextareaProps> = ({ placeholder, className, text, setText }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      className={`w-full h-auto max-h-[70vh] p-2 border border-secondary-bg rounded-md focus:outline-none focus:border-secondary-fg resize-none ${className || ''}`}
      placeholder={placeholder}
    />
  )
}

export default AutoExpandingTextarea