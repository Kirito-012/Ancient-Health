import React from 'react'
import { Helmet } from 'react-helmet-async'

const JsonLd = ({ schema }) => {
  if (!schema) return null

  const payload = Array.isArray(schema)
    ? { '@context': 'https://schema.org', '@graph': schema }
    : schema

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(payload)}
      </script>
    </Helmet>
  )
}

export default JsonLd
