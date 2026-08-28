import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.SANITY_WRITE_TOKEN;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'k4vpp9e5';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

if (!token) {
  console.error('\n❌ Error: SANITY_WRITE_TOKEN is not defined in your .env file.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
});

const defaultCategories = [
  { slug: 'compliance', title: 'Compliance', description: 'Industry standards, SIA accreditations, and legal regulations.' },
  { slug: 'fire-safety', title: 'Fire Safety', description: 'Waking watch advice, fire alarm guidelines, and prevention.' },
  { slug: 'security-solutions', title: 'Security Solutions', description: 'Manned guarding, mobile patrols, and perimeter security advice.' },
  { slug: 'security-advice', title: 'Security Advice', description: 'General security best practices for business owners.' },
  { slug: 'business-protection', title: 'Business Protection', description: 'Safeguarding assets, inventory, and employees.' },
  { slug: 'event-security', title: 'Event Security', description: 'Crowd management and festival security tips.' },
];

async function migrate() {
  console.log('🚀 Migrating blog categories to Sanity...\n');

  // 1. Create categories
  for (const cat of defaultCategories) {
    const docId = `category-${cat.slug}`;
    const doc = {
      _id: docId,
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
    };
    await client.createOrReplace(doc);
    console.log(`✅ Category created: ${cat.title}`);
  }

  // 2. Link existing blog posts to categories
  console.log('\n--- Linking blog posts to category references ---');
  
  const mappings = {
    'importance-of-sia-approved-contractors': 'compliance',
    '5-reasons-you-need-waking-watch': 'fire-safety',
    'benefits-of-mobile-security-patrols': 'security-solutions',
  };

  for (const [blogSlug, catSlug] of Object.entries(mappings)) {
    const blogId = `blog-${blogSlug}`;
    const catId = `category-${catSlug}`;
    
    // Check if the blog post exists
    const blogPost = await client.getDocument(blogId);
    if (blogPost) {
      await client.patch(blogId)
        .set({
          categories: [
            {
              _type: 'reference',
              _ref: catId,
              _key: `catref-${catSlug}`
            }
          ]
        })
        .commit();
      console.log(`🔗 Linked blog "${blogPost.title}" to category "${catSlug}"`);
    } else {
      console.log(`⚠️ Blog post "${blogId}" not found in Sanity. Skipping link.`);
    }
  }

  console.log('\n🎉 Category migration and linking complete!');
}

migrate().catch((err) => {
  console.error('\n❌ Category migration failed:', err.message || err);
});
