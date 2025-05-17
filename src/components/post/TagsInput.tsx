import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { RxCross1 } from 'react-icons/rx'

interface TagInputProps {
    onTagsChange: (tags: string[]) => void
    initialTags?: string[]
    placeholder?: string
}

const TagInput: React.FC<TagInputProps> = ({ onTagsChange, initialTags = [], placeholder = 'Enter tag and press Enter' }) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [tags, setTags] = useState<string[]>(initialTags)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()])
            setInputValue('')
            onTagsChange([...tags, inputValue.trim()])
        }
    }

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove)
        setTags(newTags)
        onTagsChange(newTags)
    }

    return (
        <div className='space-y-2'>
            <input
                type='text'
                className='w-full border border-secondary-bg rounded-md p-1 text-xs focus:outline-none'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
            />
            <div className='flex items-center gap-2 mb-2'>
                {tags.map((tag, index) => (
                    <div key={index} className='bg-primary-bg text-primary-fg text-xs flex items-center gap-2 p-1 rounded-sm'>
                        {tag}
                        <button
                            className='focus:outline-none cursor-pointer'
                            onClick={() => removeTag(index)}
                        >
                            <RxCross1 size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagInput