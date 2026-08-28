import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.SANITY_WRITE_TOKEN;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'k4vpp9e5';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

if (!token) {
  console.error('\n❌ Error: SANITY_WRITE_TOKEN is not defined in your .env file.');
  console.error('Please generate an API token with write permissions in your Sanity Manage dashboard:');
  console.error('1. Go to https://sanity.io/manage');
  console.error(`2. Select project ID: ${projectId}`);
  console.error('3. Go to API -> Add API token');
  console.error('4. Set name to "Migration Token" and select Role: Editor (or Contributor/Write)');
  console.error('5. Copy the token and add it to your .env file:');
  console.error('   SANITY_WRITE_TOKEN="your_token_here"\n');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
});

const fallbackServices = [
  {
    slug: 'security-guarding',
    title: 'Security Guarding',
    excerpt: 'Professional, SIA-licensed security guards to secure your premises, manage access control, and protect assets.',
    content: 'Our SIA-licensed security guards are trained to the highest standards. We provide manned guarding solutions tailored to your specific requirements, protecting your buildings, assets, and staff around the clock.',
    features: ['SIA Licensed Guards', '24/7 Patrols & Inspection', 'Access Control & Logbooks'],
    icon: 'shield',
    order: 1
  },
  {
    slug: 'waking-watch',
    title: 'Waking Watch',
    excerpt: 'Dedicated fire safety patrols to detect fire hazards, raise alarms, and ensure safe evacuation in residential or commercial buildings.',
    content: 'Our Waking Watch service provides dedicated fire safety wardens trained to spot fire hazards, maintain clear evacuation routes, and sound the alarm immediately in case of a fire, keeping occupants safe.',
    features: ['24/7 Fire Patrols', 'Evacuation Management', 'SIA Trained Fire Wardens'],
    icon: 'shield',
    order: 2
  },
  {
    slug: 'construction-security',
    title: 'Construction Security',
    excerpt: 'Specialized security solutions protecting high-value machinery, equipment, and preventing trespass on active building sites.',
    content: 'Construction sites are prime targets for theft and vandalism. We supply SIA-licensed gatehouse guards, perimeter patrols, and wireless CCTV solutions to secure your active development around the clock.',
    features: ['Perimeter Security', 'Asset & Tool Protection', 'Visitor & Contractor Access Control'],
    icon: 'building-2',
    order: 3
  },
  {
    slug: 'dog-handler-k9',
    title: 'Dog Handler / K9',
    excerpt: 'Highly trained security dog handlers providing a powerful visual deterrent and perimeter protection for high-risk sites.',
    content: 'Our canine security teams combine professional SIA handlers with guard dogs trained to detect intruders, search premises, and protect large perimeters that are difficult to secure with guards alone.',
    features: ['Canine Protection Teams', 'Powerful Visual Deterrent', 'Perimeter & Space Patrols'],
    icon: 'shield',
    order: 4
  },
  {
    slug: 'warehouse-security',
    title: 'Warehouse Security',
    excerpt: 'Comprehensive protection for inventory, logistics depots, and warehouse facilities to prevent theft and stock shrinkage.',
    content: 'SQS Security provides robust logistical and warehouse security. From gatehouse inspections and container seal checking to exit searches and randomized patrols, we minimize inventory loss.',
    features: ['Inventory Loss Prevention', 'Gatehouse & Delivery Checks', 'Randomized Exit Audits'],
    icon: 'briefcase',
    order: 5
  },
  {
    slug: 'office-security',
    title: 'Office Security',
    excerpt: 'Front-of-house concierge, reception guarding, and corporate access control tailormade for modern business premises.',
    content: 'Create a safe and welcoming environment with our corporate office security. We provide suited concierge officers who balance 5-star customer service with absolute vigilance.',
    features: ['Front-of-house Concierge', 'Corporate Access Management', 'Visitor Registration & Logs'],
    icon: 'briefcase',
    order: 6
  },
  {
    slug: 'void-property',
    title: 'Void Property',
    excerpt: 'Vigilant protection and inspections for vacant, unoccupied commercial or residential buildings to prevent squatting and vandalism.',
    content: 'Vacant buildings face massive risks of arson, theft, and squatting. SQS Security offers weekly property inspections, boarding services, and physical guarding to preserve your vacant real estate.',
    features: ['Weekly Site Audits & Logs', 'Squatter & Arson Prevention', 'Boarding & Utility Verifications'],
    icon: 'building-2',
    order: 7
  },
  {
    slug: 'emergency-cover',
    title: 'Emergency Cover',
    excerpt: 'Rapidly deployed 24/7 emergency security officers for urgent cover, alarm responses, or sudden security breaches.',
    content: 'If your site experiences a sudden security breach, system failure, or immediate threat, our 24/7 control room can deploy emergency security officers within hours to secure the premises.',
    features: ['Deployments within 2 Hours', '24/7 Operational Helpline', 'Immediate Crisis Resolution'],
    icon: 'bell',
    order: 8
  }
];

const fallbackTestimonials = [
  {
    clientName: 'John Doe',
    clientTitle: 'Operations Manager',
    company: 'BuildTrust Construction',
    quote: 'SQS Security has serviced our sites for several years, always demonstrating professionalism with a personal touch. Problems are handled efficiently.',
    rating: 5,
    featured: true,
    location: 'Southampton'
  },
  {
    clientName: 'Sarah Mitchell',
    clientTitle: 'Facilities Director',
    company: 'Global Logistics Network',
    quote: 'Since changing our security systems over to SQS, we have built a great working relationship. Their guards are extremely professional. Response times are second to none.',
    rating: 5,
    featured: true,
    location: 'London'
  },
  {
    clientName: 'David Turner',
    clientTitle: 'Site Manager',
    company: 'Northern Build Ltd',
    quote: 'SQS provided our project with 24-hour security and access control. The service has been exemplary, from the standard of guards to emergency call outs.',
    rating: 5,
    featured: true,
    location: 'Manchester'
  },
  {
    clientName: 'Emma Hayes',
    clientTitle: 'Logistics Head',
    company: 'Midland Distribution',
    quote: 'Highly reliable and trustworthy security partner. We rely on their mobile patrols every night, and they have successfully prevented multiple intrusions.',
    rating: 5,
    featured: true,
    location: 'Birmingham'
  },
  {
    clientName: 'Richard Jones',
    clientTitle: 'Property Manager',
    company: 'Sussex Retail Co.',
    quote: 'The waking watch team from SQS was deployed within hours. Their rapid response and professional demeanor gave our residents total peace of mind.',
    rating: 5,
    featured: true,
    location: 'Brighton'
  }
];

const fallbackFaqs = [
  {
    question: "Are all your security guards SIA licensed?",
    answer: "Yes. Every security officer we deploy holds a current SIA (Security Industry Authority) licence. This is a legal requirement in the UK and ensures our personnel have passed rigorous identity checks, criminal record checks, and relevant security training.",
    category: "compliance",
    featured: true,
    order: 1
  },
  {
    question: "Do you provide emergency or short-notice cover?",
    answer: "Absolutely. We understand that security gaps happen without warning. SQS Security responds quickly to urgent cover requests, providing SIA-licensed officers without complicated procurement delays.",
    category: "services",
    featured: true,
    order: 2
  },
  {
    question: "What kind of reporting do you provide?",
    answer: "We provide clear, written reporting for every deployment. Shift reports, access logs, and incident records are delivered to clients after every assignment, so you never have to chase us for documentation.",
    category: "general",
    featured: true,
    order: 3
  },
  {
    question: "Do you cover my specific area?",
    answer: "While our headquarters is based in Southampton, we provide comprehensive, UK-wide deployment. Whether you are in London, Manchester, Brighton, or Birmingham, we have local experts ready to secure your premises.",
    category: "general",
    featured: true,
    order: 4
  }
];

const fallbackBlogs = [
  {
    slug: 'importance-of-sia-approved-contractors',
    type: 'blogPost',
    title: 'The Importance of SIA Approved Contractors',
    excerpt: 'Why choosing an SIA Approved Contractor is critical for ensuring high-quality, legally compliant security services for your business.',
    content: 'An Approved Contractor Status (ACS) under the Security Industry Authority ensures that the security firm adheres to rigorous industry guidelines, staff welfare, legal compliance, and customer service. Choosing an ACS certified company provides businesses with safety, consistency, and professional reliability.',
    category: 'compliance',
    publishedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    featured: true
  },
  {
    slug: '5-reasons-you-need-waking-watch',
    type: 'blogPost',
    title: '5 Reasons Your Property Needs a Waking Watch',
    excerpt: 'Discover why a waking watch is an essential fire safety measure for residential and commercial buildings awaiting cladding remediation or fire system upgrades.',
    content: 'A waking watch is a 24-hour physical patrol system designed specifically to monitor properties for potential fire outbreaks. This is critical for high-rise buildings with flammable cladding or malfunctioning central fire alarm systems, ensuring early warning and swift evacuation of tenants.',
    category: 'fire-safety',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    featured: false
  },
  {
    slug: 'benefits-of-mobile-security-patrols',
    type: 'blogPost',
    title: 'The Benefits of Mobile Security Patrols',
    excerpt: 'Explore how mobile security patrols provide a cost-effective, highly visible deterrent against crime and unauthorized access for large commercial sites.',
    content: 'Mobile patrols represent a flexible and highly visible deterrent for commercial premises. Security personnel sweep the area in branded vehicles, inspecting windows, entry points, and boundaries at randomized intervals, ensuring security without the cost of full-time manned guarding.',
    category: 'security-solutions',
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    featured: false
  }
];

const fallbackCaseStudies = [
  {
    slug: 'case-study-construction-site-southampton',
    title: 'Securing a £50M Commercial Development in Southampton',
    client: 'BuildTrust Construction',
    challenge: 'The client faced continuous theft of high-value materials. We deployed 24/7 manned guarding, mobile CCTV towers, and access control.',
    content: 'SQS Security resolved the theft issue by deploying experienced, SIA-licensed guards and integrating temporary wireless CCTV towers for full perimeter coverage.',
    results: [
      'Zero theft incidents recorded post-deployment',
      'Perimeter secured within 24 hours',
      'Full visitor/contractor audit logging active'
    ]
  },
  {
    slug: 'case-study-logistics-hub-cctv',
    title: 'Upgrading Perimeter Security for a National Logistics Hub',
    client: 'Global Logistics Network',
    challenge: 'Frequent unauthorized access attempts during night shifts. SQS installed long-range thermal CCTV and initiated rapid response mobile patrols.',
    content: 'Our team performed a comprehensive perimeter risk assessment and deployed thermal-imaging CCTV combined with scheduled night-shift mobile patrol sweeps.',
    results: [
      'Unauthorized access attempts eliminated',
      'Continuous real-time thermal monitoring',
      'Response times reduced to under 15 minutes'
    ]
  }
];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function importData() {
  console.log('🚀 Starting content migration to Sanity CMS...\n');

  // 1. Services
  console.log('--- Migrating Security Services ---');
  for (const s of fallbackServices) {
    const doc = {
      _id: `service-${s.slug}`,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      excerpt: s.excerpt,
      icon: s.icon,
      order: s.order,
      features: s.features,
      faqs: [],
      body: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: s.content
            }
          ]
        }
      ]
    };
    await client.createOrReplace(doc);
    console.log(`✅ Service imported: ${s.title}`);
  }

  // 2. Testimonials
  console.log('\n--- Migrating Testimonials ---');
  for (const t of fallbackTestimonials) {
    const docId = `testimonial-${slugify(t.clientName)}`;
    const doc = {
      _id: docId,
      _type: 'testimonial',
      clientName: t.clientName,
      clientTitle: t.clientTitle,
      company: t.company,
      quote: t.quote,
      rating: t.rating,
      featured: t.featured,
      location: t.location
    };
    await client.createOrReplace(doc);
    console.log(`✅ Testimonial imported: ${t.clientName} (${t.company})`);
  }

  // 3. FAQs
  console.log('\n--- Migrating FAQs ---');
  for (const f of fallbackFaqs) {
    const docId = `faq-${slugify(f.question).substring(0, 40)}`;
    const doc = {
      _id: docId,
      _type: 'faq',
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
      featured: f.featured
    };
    await client.createOrReplace(doc);
    console.log(`✅ FAQ imported: ${f.question}`);
  }

  // 4. Blogs
  console.log('\n--- Migrating Blog Posts ---');
  for (const b of fallbackBlogs) {
    const doc = {
      _id: `blog-${b.slug}`,
      _type: 'blogPost',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      excerpt: b.excerpt,
      publishedAt: b.publishedAt,
      featured: b.featured,
      body: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: b.content
            }
          ]
        }
      ]
    };
    await client.createOrReplace(doc);
    console.log(`✅ Blog Post imported: ${b.title}`);
  }

  // 5. Case Studies
  console.log('\n--- Migrating Case Studies ---');
  for (const cs of fallbackCaseStudies) {
    const doc = {
      _id: `casestudy-${cs.slug}`,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      client: cs.client,
      challenge: cs.challenge,
      results: cs.results,
      solution: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: cs.content
            }
          ]
        }
      ]
    };
    await client.createOrReplace(doc);
    console.log(`✅ Case Study imported: ${cs.title}`);
  }

  console.log('\n🎉 Content migration finished successfully! All records are now manageable inside Sanity Studio.');
}

importData().catch((err) => {
  console.error('\n❌ Migration failed:', err.message || err);
});
