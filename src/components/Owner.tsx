import ProfileIcon from '@/../public/profile.svg'

import Link from 'next/link'

import { OwnerDetails } from '@/components/interfaces/Post'

export default function Owner({ dp, username, firstName, lastName, display }: OwnerDetails) {
    if (display === 'short') {
        return(
            <Link 
                className='flex flex-row justify-start w-fit gap-2 p-2' 
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
                className='flex flex-row justify-start w-fit gap-2 p-2' 
                href={`user/${username}`}
                onClick={e => e.stopPropagation()}
            >
                {!dp && <img src={ProfileIcon.src} width={28} alt='Profile' className='rounded-full' />}
                <span><strong>{firstName} {lastName}</strong></span>
            </Link>
        )
    }
}