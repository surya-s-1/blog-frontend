export function formatDate(dateInput: string | number | Date, display: 'short' | 'long'): string {
    const date = new Date(dateInput)
    const now = new Date()

    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    const isToday = date.toDateString() === now.toDateString()
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString()

    const ordinalSuffix = (n: number) => {
        const s = ['th', 'st', 'nd', 'rd'], v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }

    if (display === 'short') {
        if (isToday) return 'Today'
        if (isYesterday) return 'Yesterday'

        if (diffDays < 7) return `${diffDays}d`
        if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7)
            const days = diffDays % 7
            return days > 0 ? `${weeks}w ${days}d` : `${weeks}w`
        }

        if (diffDays < 365) {
            return `${diffMonths}m`
        }

        const remainingMonths = diffMonths % 12
        return remainingMonths > 0 ? `${diffYears}y ${remainingMonths}m` : `${diffYears}y`
    }

    if (display === 'long') {
        return date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return ''
}