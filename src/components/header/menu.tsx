import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { IoHome, IoSearch, IoClose } from 'react-icons/io5'

function Tab({ icon, href }: { icon: any, href: string }) {
    const path = usePathname()

    return (
        <div className={`flex flex-col items-center justify-center px-6 cursor-pointer text-default-fg ${href === path && 'border-b-4 border-default-fg'}`}>
            {icon}
        </div>
    )
}

export default function MiddleSection() {
    const router = useRouter()
    const [searchMode, setSearchMode] = useState(false)
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        if (query.trim() !== '') {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            {!searchMode ? (
                <div className='flex flex-row w-full h-full'>
                    <Tab
                        icon={
                            <Link className='h-full flex flex-col justify-center' href='/'>
                                <IoHome className='text-primary-fg' size={24} />
                            </Link>
                        }
                        href='/'
                    />
                    <Tab
                        icon={
                            <button className='cursor-pointer h-full' onClick={() => setSearchMode(true)}>
                                <IoSearch className='text-primary-fg' size={24} />
                            </button>
                        }
                        href='/search'
                    />
                </div>
            ) : (
                <div className='flex items-center w-full h-full rounded-md px-4 shadow-sm bg-secondary-bg text-secondary-fg'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='w-full h-full bg-transparent outline-none'
                    />
                    <button
                        onClick={() => {
                            setSearchMode(false)
                            setQuery('')
                        }}
                        className='text-primary-fg/50 ml-2 h-full cursor-pointer'
                    >
                        <IoClose size={24} />
                    </button>
                    <button
                        onClick={handleSearch}
                        className='text-primary-fg ml-1 h-full cursor-pointer'
                    >
                        <IoSearch size={24} />
                    </button>
                </div>
            )}
        </>
    )
}