
import React, { useCallback } from 'react'
import DOMPurify from 'isomorphic-dompurify'

const NAVBAR_OFFSET = 120

const sanitizeConfig = {
    ADD_ATTR: ['id', 'aria-label'],
    ALLOW_UNKNOWN_PROTOCOLS: false,
}

const HTMLContent = ({ content, className }) => {
    const sanitizedContent = DOMPurify.sanitize(content || '', sanitizeConfig)

    const handleClick = useCallback((e) => {
        const anchor = e.target.closest('a')
        if (!anchor) return
        const href = anchor.getAttribute('href')
        if (!href || !href.startsWith('#') || href.length < 2) return

        const id = decodeURIComponent(href.slice(1))
        const target = document.getElementById(id)
        if (!target) return

        e.preventDefault()
        const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
        if (window.history?.replaceState) {
            window.history.replaceState(null, '', `#${id}`)
        }
    }, [])

    return (
        <div
            className={className}
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    )
}

export default HTMLContent
