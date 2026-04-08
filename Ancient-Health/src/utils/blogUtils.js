export const blogCache = {
    blogs: null,
    categories: null
}

export const getBlogImageAlt = (blog, fallback = 'Blog image') => {
    return blog?.imageAlt?.trim() || blog?.metaTitle?.trim() || blog?.title?.trim() || fallback
}

export const getBlogInfographicAlt = (blog, fallback = 'Blog infographic') => {
    const explicitAlt = blog?.infographicImageAlt?.trim()
    if (explicitAlt) return explicitAlt

    const baseAlt = blog?.metaTitle?.trim() || blog?.title?.trim()
    return baseAlt ? `${baseAlt} infographic` : fallback
}
