import { useState } from 'react'
import { IoMdGlobe, IoMdFlag } from 'react-icons/io'

interface DropdownProps {
    postPublic: boolean
    setPostPublic: (value: boolean) => void
}

const PostVisibilityDropdown: React.FC<DropdownProps> = ({ postPublic, setPostPublic }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (value: 'public' | 'private') => {
        setPostPublic(value === 'public')
        setIsOpen(false)
    }

    return (
        <div className='relative text-xs'>
            <button
                type='button'
                className='cursor-pointer border border-secondary-bg p-1 rounded focus:outline-none'
                onClick={toggleDropdown}
            >
                {postPublic ? 
                <span className='flex items-center gap-2'>Public <IoMdGlobe size={16} /></span> : 
                <span className='flex items-center gap-2'>Private <IoMdFlag size={16} /></span>}
            </button>

            {isOpen && (
                <div className='absolute bg-primary-bg z-10 mt-1 rounded'>
                    <div
                        className={`p-1 hover:bg-secondary-bg text-secondary-fg cursor-pointer`}
                        onClick={() => handleOptionClick('public')}
                    >
                        <span className='flex items-center gap-2'>Public <IoMdGlobe size={16} /></span>
                    </div>
                    <div
                        className={`p-1 hover:bg-secondary-bg text-secondary-fg cursor-pointer`}
                        onClick={() => handleOptionClick('private')}
                    >
                        <span className='flex items-center gap-2'>Private <IoMdFlag size={16} /></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostVisibilityDropdown