import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { RootState } from '@/store'
import { toggleTheme } from '@/store/slices/appSlice'

import PlaceholderProfileIcon from '../../../public/profile.svg'

import { CiLight, CiDark } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi'

interface ElProps {
    label: string;
    func: () => void;
    icon: any;
    type?: 'reg' | 'warn' | 'danger'
}

function DropdownEl({icon, label, func, type = 'reg'}: ElProps) {
    return (
        <button 
            className={`flex flex-row gap-4 cursor-pointer px-8 py-4 text-left hover:bg-primary-bg-dull ${type === 'warn' ? 'text-warn-fg' : type === 'danger' ? 'text-danger-fg' : 'text-default-fg'}`}
            onClick={() => func()}
        >
            {icon}
            {label}
        </button>
    )
}

export default function HeaderDropdown() {
    const appState = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()

    const router = useRouter()

    return(
        <div className='absolute right-4 w-max bg-primary-bg rounded-lg overflow-hidden shadow-lg z-20 flex flex-col'>
            <DropdownEl 
                icon={<img src={PlaceholderProfileIcon.src} width={24} alt='Profile' className='rounded-full' />}
                label='Profile'
                func={() => { router.push('/you') }}
            />
            <DropdownEl 
                icon={appState.theme === 'light' ? <CiLight size={24} /> : <CiDark size={24} />}
                label={appState.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                func={() => { dispatch(toggleTheme()) }}
            />
            <DropdownEl 
                icon={<FiLogOut size={24} />}
                label='Logout'
                func={() => {}}
                type='danger'
            />
        </div>
    )
}