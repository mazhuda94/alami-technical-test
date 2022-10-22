import React from "react"

export const useProgress = () => {
    const [progress, setProgress] = React.useState(0)
    const interval = React.useRef()

    const startProgress = React.useCallback((initialTime) => {
        let temp = initialTime
        interval.current = setInterval(() => {
            temp += 1
            setProgress(temp)
        }, 10)
    }, [])

    React.useEffect(() => {
        startProgress(progress)
        return () => clearInterval(interval.current)
    }, [])

    React.useEffect(() => {
        if (progress > 1000) {
            clearInterval(interval.current)
        }
    }, [progress])

    const percentage = Math.floor(progress / 10)

    return {
        progress,
        setProgress,
        percentage,
        startProgress,
        interval,
    }
}