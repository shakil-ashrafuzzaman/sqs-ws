import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function run() {
  const data = await client.fetch(`*[_type == "service"] | order(order asc)[0...8] { title }`);
  console.log('Fetched:', data);
}

run().catch(console.error);
