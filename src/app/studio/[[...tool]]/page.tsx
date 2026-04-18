'use client'

/**
 * This route is responsible for the built-in Sanity Studio
 * All routes under /studio will be handled by this component
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}



