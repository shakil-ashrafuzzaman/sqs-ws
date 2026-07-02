import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'sqs-security',
  title: 'SQS Security CMS',

  projectId: (typeof process !== 'undefined' && process.env.PUBLIC_SANITY_PROJECT_ID) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_SANITY_PROJECT_ID) || 'k4vpp9e5',
  dataset: (typeof process !== 'undefined' && process.env.PUBLIC_SANITY_DATASET) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_SANITY_DATASET) || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
