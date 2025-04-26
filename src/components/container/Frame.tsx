import React from 'react'

interface FrameProps {
    left?: React.ReactNode
    middle?: React.ReactNode
    right?: React.ReactNode
}

export default function Frame({ left, middle, right}: FrameProps) {
    return (
        <div className='flex flex-row w-full min-h-screen'>
            <div className="w-[30%]">
                {left ?? null}
            </div>
            <div className="w-[40%]">
                {middle ?? null}
            </div>
            <div className="w-[30%]">
                {right ?? null}
            </div>
        </div>
    )
}