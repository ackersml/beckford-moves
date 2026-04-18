'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

// Update these with your actual Sanity project details
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'beckford-moves-studio',
  title: 'Beckford Moves CMS',
  
  projectId,
  dataset,
  
  plugins: [
    structureTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})

