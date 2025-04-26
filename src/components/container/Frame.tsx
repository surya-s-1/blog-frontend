import React from 'react'

interface FrameProps {
    left?: React.ReactNode
    middle?: React.ReactNode
    right?: React.ReactNode
    width?: {
        left: number
        middle: number
        right: number
    }
}

export default function Frame({ left, middle, right, width = { left: 30, middle: 40, right: 30 }}: FrameProps) {
    return (
        <div className='flex flex-row w-full min-h-screen bg-primary-bg'>
            <div style={{ width: `${width.left}%` }}>
                {left ?? null}
            </div>
            <div style={{ width: `${width.middle}%` }}>
                {middle ?? null}
            </div>
            <div style={{ width: `${width.right}%` }}>
                {right ?? null}
            </div>
        </div>
    )
}