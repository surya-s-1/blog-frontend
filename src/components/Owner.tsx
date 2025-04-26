import ProfileIcon from '@/../public/profile.svg'

import Link from 'next/link'

import { OwnerDetails } from '@/components/interfaces/Post'

export default function Owner({ dp, username, firstName, middleName = null, lastName, display }: OwnerDetails) {
    if (display === 'short') {
        return(
            <Link 
                className='flex flex-row justify-start items-center w-fit gap-2 p-2 pb-1' 
                href={`user/${username}`}
                onClick={e => e.stopPropagation()}
            >
                {!dp && <img src={ProfileIcon.src} width={20} alt='Profile' className='rounded-full' />}
                <span className='text-sm'><strong>{firstName} {lastName}</strong></span>
            </Link>
        )
    } else {
        return(
            <Link 
                className='flex flex-row justify-start items-center w-fit gap-2 p-2 pb-1' 
                href={`user/${username}`}
                onClick={e => e.stopPropagation()}
            >
                {!dp && <img src={ProfileIcon.src} width={32} alt='Profile' className='rounded-full' />}
                <span><strong>{firstName} {middleName || ''} {lastName}</strong></span>
            </Link>
        )
    }
}