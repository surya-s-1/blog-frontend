import ProfileIcon from '@/../public/profile.svg'

import Link from 'next/link'

import { OwnerDetails } from '@/components/interfaces/Post'
import { formatDate } from '@/utility'

export default function Owner({ dp, username, firstName, middleName = null, lastName, timestamp, display }: OwnerDetails) {
    const long = display === 'long'

    return(
        <Link 
            className='flex flex-row justify-start items-center w-fit gap-2 p-2 pb-1' 
            href={`user/${username}`}
            onClick={e => e.stopPropagation()}
        >
            <div>
                {!dp && <img src={ProfileIcon.src} width={36} alt='Profile' className='rounded-full' />}
            </div>
            <div className='flex flex-col'>
                <div>
                    <strong>{firstName} {(long && middleName) ? middleName : ''} {lastName}</strong>
                </div>
                <div className='text-xs text-secondary-fg/50 font-semibold'>
                    {formatDate(timestamp, long ? 'long' : 'short')}
                </div>
            </div>
        </Link>
    )
}