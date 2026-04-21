import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index'
import { deskStructure } from './desk/deskStructure'

export default defineConfig({
  name: 'dmlegal',
  title: 'DM Legal — Blog Studio',

  projectId: '1rdqxnwm',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(), // GROQ query tester — remove in production if desired
  ],

  schema: {
    types: schemaTypes,
  },
})
