import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? 'k4vpp9e5',
    dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  },
  studioHost: 'sqs-security',
})
