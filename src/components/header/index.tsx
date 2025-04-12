import LightLogo from '../../../public/light-theme-logo.svg'
import DarkLogo from '../../../public/dark-theme-logo.svg'
import PlaceholderProfileIcon from '../../../public/profile.svg'

import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import HeaderDropdown from './dropdown'
import MiddleMenu from './menu'

export default function Header() {
    const appState = useSelector((state: RootState) => state.app)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    return (
        <header className='top-0 sticky z-10 bg-white/50 backdrop-blur-sm shadow-md h-16 flex flex-row justify-between items-center'>
            {appState.theme === 'light' ? (
                <img className='mx-4' src={LightLogo.src} width={72} />
            ) : (
                <img className='mx-4' src={DarkLogo.src} width={72} />
            )}

            <div className='w-[40%] h-full mx-auto'>
                <MiddleMenu />
            </div>

            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className='flex items-center bg-transparent rounded-full cursor-pointer p-4'
                >
                    <img src={PlaceholderProfileIcon.src} width={36} alt='Profile' className='rounded-full' />
                </button>

                {dropdownOpen && (
                    <HeaderDropdown />
                )}
            </div>
        </header>
    )
}