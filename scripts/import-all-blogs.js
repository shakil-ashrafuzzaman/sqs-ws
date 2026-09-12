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

const allBlogPosts = [
  {
    slug: 'importance-of-sia-approved-contractors',
    title: 'The Importance of SIA Approved Contractors',
    excerpt: 'Why choosing an SIA Approved Contractor is critical for ensuring high-quality, legally compliant security services for your business.',
    categorySlug: 'compliance',
    publishedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    featured: true,
    authorName: 'SQS Security Expert',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'When securing your business, cutting corners is never an option. Partnering with an SIA (Security Industry Authority) Approved Contractor guarantees that your security provider meets the highest standards of professionalism and compliance. SQS Security is proud to hold this accreditation, ensuring our operatives are fully vetted, extensively trained, and legally compliant.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'An Approved Contractor Status (ACS) is only awarded to companies that undergo rigorous independent assessments. By choosing an ACS accredited firm, you are protecting your assets, your reputation, and most importantly, your people.' }]
      }
    ]
  },
  {
    slug: '5-reasons-you-need-waking-watch',
    title: '5 Reasons Your Property Needs a Waking Watch',
    excerpt: 'Discover why a waking watch is an essential fire safety measure for residential and commercial buildings awaiting cladding remediation or fire system upgrades.',
    categorySlug: 'fire-safety',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    featured: false,
    authorName: 'SQS Operations Team',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Fire safety regulations are stricter than ever. For buildings with compromised cladding or failing fire alarm systems, a Waking Watch provides immediate, 24/7 human surveillance. Our highly trained fire wardens continuously patrol the premises, ensuring any sign of fire is detected instantly.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'A Waking Watch not only ensures regulatory compliance but provides peace of mind to residents and building owners alike. From coordinating safe evacuations to liaising with emergency services, our wardens are the frontline of fire safety.' }]
      }
    ]
  },
  {
    slug: 'benefits-of-mobile-security-patrols',
    title: 'The Benefits of Mobile Security Patrols',
    excerpt: 'Explore how mobile security patrols provide a cost-effective, highly visible deterrent against crime and unauthorized access for large commercial sites.',
    categorySlug: 'security-solutions',
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    featured: false,
    authorName: 'SQS Mobile Unit',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Not every site requires a static guard presence 24/7. Mobile security patrols offer a dynamic, unpredictable, and highly cost-effective alternative. By conducting randomized patrols throughout the night or weekend, mobile units create a strong visual deterrent against vandalism, theft, and squatting.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'In addition to external perimeter checks, mobile guards can perform internal lock-down procedures, monitor environmental systems, and respond rapidly to alarm activations. It is a flexible solution tailored to the unique risks of your site.' }]
      }
    ]
  },
  {
    slug: 'cost-to-hire-a-security-guard-uk',
    title: 'How Much Does It Cost to Hire a Security Guard in the UK?',
    excerpt: 'Understanding the pricing models and factors that influence the cost of hiring professional, SIA-licensed security guards for your business.',
    categorySlug: 'security-advice',
    publishedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    featured: false,
    authorName: 'SQS Commercial Team',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'When budgeting for security, one of the most common questions we receive is: "How much does it cost to hire a security guard?" The answer depends on several factors including the type of security required, the location, the duration of the contract, and the specific skills needed (e.g., K9 handling or medical training).' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'On average, standard manned guarding rates in the UK can vary, but it is crucial to remember that unusually low rates often mean compromised quality or non-compliance with SIA regulations. Investing in a reputable, ACS-accredited provider like SQS Security ensures you get reliable, trained professionals who truly protect your assets.' }]
      }
    ]
  },
  {
    slug: 'duties-and-responsibilities-of-a-security-guard',
    title: 'What Are the Key Duties of a Professional Security Guard?',
    excerpt: 'A detailed look into the daily responsibilities, from access control to emergency response, that define a professional security officer.',
    categorySlug: 'security-solutions',
    publishedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    featured: false,
    authorName: 'SQS Training Team',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'The modern security guard is much more than just a physical presence. Their duties encompass a wide range of responsibilities critical to maintaining a safe environment. This includes rigorous access control, regular perimeter patrols, monitoring CCTV feeds, and maintaining detailed incident logs.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'Furthermore, security officers are often the first responders in an emergency. Whether managing a fire evacuation, providing first aid, or de-escalating a conflict, their extensive training equips them to handle high-pressure situations professionally and calmly.' }]
      }
    ]
  },
  {
    slug: 'signs-your-business-needs-security',
    title: '5 Signs Your Business Needs Professional Security',
    excerpt: 'Is your business at risk? Learn the top indicators that it is time to invest in professional manned guarding or mobile patrols.',
    categorySlug: 'business-protection',
    publishedAt: new Date(Date.now() - 86400000 * 25).toISOString(),
    featured: false,
    authorName: 'SQS Risk Assessment',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Many businesses wait until after a major incident to hire security. However, recognizing the early signs can save you significant financial loss and protect your staff. If you are experiencing increased local crime rates, frequent unauthorized access, or employee safety concerns, it is time to act.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'Other signs include expanding your operations, holding valuable inventory on-site, or hosting frequent high-profile visitors. A professional risk assessment from SQS Security can identify vulnerabilities you might have missed and propose tailored solutions to mitigate them.' }]
      }
    ]
  },
  {
    slug: 'how-to-hire-event-security',
    title: 'The Ultimate Guide to Hiring Event Security Guards',
    excerpt: 'Planning an event? Learn the essential steps for assessing risks, determining guard ratios, and hiring the right event security team.',
    categorySlug: 'event-security',
    publishedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    featured: false,
    authorName: 'SQS Events Division',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'From corporate conferences to music festivals, effective event security requires meticulous planning. The first step is always a comprehensive site survey and risk assessment. You must consider crowd demographics, venue layout, and potential emergency scenarios.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'When hiring event guards, ensure they are SIA licensed and trained in crowd management and conflict resolution. SQS Security provides bespoke event security teams that integrate seamlessly with your event organizers, ensuring a safe and enjoyable experience for all attendees.' }]
      }
    ]
  },
  {
    slug: 'cctv-monitoring-vs-manned-guarding',
    title: 'CCTV Monitoring vs. Manned Guarding: Which is Best?',
    excerpt: 'Comparing the benefits of electronic surveillance systems with the physical presence of professional security guards.',
    categorySlug: 'security-solutions',
    publishedAt: new Date(Date.now() - 86400000 * 35).toISOString(),
    featured: false,
    authorName: 'SQS Technology Integration',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'The debate between investing in CCTV monitoring versus physical manned guarding is common. CCTV provides excellent forensic evidence and remote oversight, acting as a strong psychological deterrent. However, cameras cannot physically intervene to stop a crime in progress or assist an injured person.' }]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'The most robust security strategies do not choose one over the other; they integrate both. Manned guards can instantly verify and respond to CCTV alerts, while cameras act as a force multiplier for guards on patrol. SQS Security specializes in this hybrid approach, providing maximum protection for your premises.' }]
      }
    ]
  }
];

const allCaseStudies = [
  {
    slug: 'case-study-construction-site-southampton',
    title: 'Securing a £50M Commercial Development in Southampton',
    client: 'BuildTrust Construction',
    challenge: 'The client faced continuous theft of high-value materials. We deployed 24/7 manned guarding, mobile CCTV towers, and access control.',
    solution: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'SQS Security resolved the theft issue by deploying experienced, SIA-licensed guards and integrating temporary wireless CCTV towers for full perimeter coverage.' }]
      }
    ],
    results: [
      '100% reduction in theft incidents within the first month',
      'Enhanced site health and safety compliance',
      'Project completed on time without further security-related disruptions'
    ]
  },
  {
    slug: 'case-study-logistics-hub-cctv',
    title: 'Upgrading Perimeter Security for a National Logistics Hub',
    client: 'Global Logistics Network',
    challenge: 'Frequent unauthorized access attempts during night shifts. SQS installed long-range thermal CCTV and initiated rapid response mobile patrols.',
    solution: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Our team performed a comprehensive perimeter risk assessment and deployed thermal-imaging CCTV combined with scheduled night-shift mobile patrol sweeps.' }]
      }
    ],
    results: [
      'Intrusion detection time reduced to under 3 seconds',
      '40% reduction in overall security costs compared to full static guarding',
      'Zero successful cargo thefts since implementation'
    ]
  }
];

async function syncAllBlogs() {
  console.log('🚀 Syncing all blog post types & categories to Sanity CMS...\n');

  // 1. Categories
  console.log('--- Ensuring Blog Categories ---');
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
    console.log(`✅ Category confirmed: ${cat.title} (${docId})`);
  }

  // 2. Blog Posts
  console.log('\n--- Importing/Updating All Blog Posts in Sanity ---');
  for (const b of allBlogPosts) {
    const docId = `blog-${b.slug}`;
    const catId = `category-${b.categorySlug}`;
    const doc = {
      _id: docId,
      _type: 'blogPost',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      excerpt: b.excerpt,
      publishedAt: b.publishedAt,
      featured: b.featured,
      categories: [
        {
          _type: 'reference',
          _ref: catId,
          _key: `catref-${b.categorySlug}`
        }
      ],
      body: b.body
    };
    await client.createOrReplace(doc);
    console.log(`✅ Blog Post created/updated: "${b.title}" [Category: ${b.categorySlug}]`);
  }

  // 3. Case Studies
  console.log('\n--- Importing/Updating All Case Studies in Sanity ---');
  for (const cs of allCaseStudies) {
    const docId = `casestudy-${cs.slug}`;
    const doc = {
      _id: docId,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      client: cs.client,
      challenge: cs.challenge,
      results: cs.results,
      solution: cs.solution
    };
    await client.createOrReplace(doc);
    console.log(`✅ Case Study created/updated: "${cs.title}"`);
  }

  // 4. Update any loose blog posts in Sanity to ensure they have valid category references
  console.log('\n--- Auditing existing loose posts ---');
  const loosePosts = await client.fetch(`*[_type == "blogPost" && (!defined(categories) || length(categories) == 0)]{ _id, title }`);
  for (const p of loosePosts) {
    await client.patch(p._id).set({
      categories: [{ _type: 'reference', _ref: 'category-security-advice', _key: 'catref-security-advice' }]
    }).commit();
    console.log(`🔗 Patched category for loose post: "${p.title}"`);
  }

  console.log('\n🎉 Successfully synced all blog types and articles to Sanity CMS!');
}

syncAllBlogs().catch((err) => {
  console.error('\n❌ Sync failed:', err.message || err);
});
