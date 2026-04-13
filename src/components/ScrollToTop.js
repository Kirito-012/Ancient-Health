import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const ScrollToTop = () => {
    const location = useLocation()
    const navigationType = useNavigationType()
    const scrollPositions = useRef(new Map())

    useLayoutEffect(() => {
        const positions = scrollPositions.current

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        return () => {
            positions.set(location.key, {
                x: window.scrollX,
                y: window.scrollY
            })
        }
    }, [location.key])

    useLayoutEffect(() => {
        const jumpToTop = () => {
            const savedPosition = scrollPositions.current.get(location.key)
            const shouldRestore = navigationType === 'POP' && savedPosition
            const targetY = shouldRestore ? savedPosition.y : 0
            const targetX = shouldRestore ? savedPosition.x : 0

            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                window.lenis.scrollTo(targetY, { immediate: true, force: true })
            }

            window.scrollTo({ top: targetY, left: targetX, behavior: 'auto' })
            document.documentElement.scrollTop = targetY
            document.body.scrollTop = targetY
        }

        requestAnimationFrame(jumpToTop)
    }, [location.key, navigationType])

    return null
}

export default ScrollToTop
