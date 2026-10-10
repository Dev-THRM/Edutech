/**
 * THRM EduTech — Certifications Engine & Assessment Center
 * "Learn. Get Assessed. Get Certified."
 */

// Helper function to resolve PDF path relative to current URL
function getPdfPath(filename) {
  if (!filename) return '#';
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/certifications/social-media-marketing/')) {
    return `../../assets/docs/${filename}`;
  } else if (path.includes('/certifications/')) {
    return `../assets/docs/${filename}`;
  } else {
    return `assets/docs/${filename}`;
  }
}

// ==========================================
// 1. MODULES & SLIDE DECKS DATA
// ==========================================
const CURRICULUM_MODULES = [
  {
    id: 1,
    title: "1. Introduction to Social Media Marketing",
    subtitle: "Core principles, digital brand ecosystems & consumer landscape",
    duration: "45 mins",
    tag: "Fundamentals",
    pdfAvailable: true,
    pdfFileName: "Module-1-Introduction-to-Social-Media-Marketing.pdf",
    slides: [
      {
        kicker: "Module 01 — Fundamentals",
        title: "1. Introduction to Social Media Marketing",
        lead: "Welcome to the THRM Certified Social Media Marketing Professional track. Understand the evolution from broadcast media to algorithmic attention economies.",
        boxes: [
          {
            title: "Traditional vs. Algorithmic Media",
            text: "Traditional advertising pushed one-way messages. Social media rewards engagement, retention, and community resonance.",
            bullets: ["Attention is earned, not bought by default", "Two-way conversation channels", "Algorithmic distribution replaces broadcast TV/print"]
          },
          {
            title: "The Brand Ecosystem",
            text: "Social media acts as the front door for your business, driving trust, authority, and demand down into conversions.",
            bullets: ["Top of funnel discovery", "Middle of funnel consideration and trust", "Bottom of funnel sales and repeat advocacy"]
          }
        ],
        callout: { type: "tip", text: "Pro Tip: Social media is not a megaphone for boring announcements; it is a digital handshake." }
      }
    ]
  },
  {
    id: 2,
    title: "2. Understanding Your Audience",
    subtitle: "Demographics, intent signals & behavioral segmentation",
    duration: "50 mins",
    tag: "Strategy",
    pdfAvailable: true,
    pdfFileName: "Module-2-Understanding-Your-Audience.pdf",
    slides: [
      {
        kicker: "Module 02 — Audience Research",
        title: "2. Understanding Your Audience",
        lead: "You cannot sell to everyone. Understanding customer pain points, aspirations, and triggers is the foundation of high-converting campaigns.",
        boxes: [
          {
            title: "Building Buyer Personas",
            text: "Go beyond age and gender. Identify desires, frustrations, lifestyle friction, and decision roadblocks.",
            bullets: ["Core pain points they search for daily", "What prevents them from buying today", "The exact language they use to describe problems"]
          },
          {
            title: "Intent Mapping",
            text: "Match your content to where the user is in their decision journey.",
            bullets: ["Unaware: Needs problem validation", "Problem-Aware: Wants educational insights", "Solution-Aware: Evaluating your specific brand"]
          }
        ],
        callout: { type: "tip", text: "When you speak to everyone, you speak to no one. Niche clarity drives engagement." }
      }
    ]
  },
  {
    id: 3,
    title: "3. Social Media Platforms",
    subtitle: "Instagram, LinkedIn, YouTube & Meta delivery algorithms",
    duration: "55 mins",
    tag: "Technical",
    pdfAvailable: true,
    pdfFileName: "Module-3-Social-Media-Platforms.pdf",
    slides: [
      {
        kicker: "Module 03 — Algorithms",
        title: "3. Social Media Platforms",
        lead: "Every social platform prioritizes one metric above all: session duration and user retention. Learn how the feed rewards content.",
        boxes: [
          {
            title: "Instagram & Meta Delivery",
            text: "Signals include watch time, sends/shares, saves, and comments within the first 60 minutes of posting.",
            bullets: ["Reels: Global non-follower discovery", "Carousels: High dwell time and save rate", "Stories: Direct follower retention and DM conversion"]
          },
          {
            title: "LinkedIn & Professional Feeds",
            text: "LinkedIn rewards comment depth, industry authority, and professional relevance over flashy aesthetics.",
            bullets: ["Dwell time on PDFs and carousels", "Meaningful multi-line discussions", "First 2 hours engagement velocity"]
          }
        ],
        callout: { type: "tip", text: "Algorithms do not hate you; they simply prioritize the viewer's screen time." }
      }
    ]
  },
  {
    id: 4,
    title: "4. Content Strategy",
    subtitle: "Positioning pillars, visual consistency & copy guidelines",
    duration: "40 mins",
    tag: "Branding",
    pdfAvailable: true,
    pdfFileName: "Module-4-Content-Strategy.pdf",
    slides: [
      {
        kicker: "Module 04 — Brand Strategy",
        title: "4. Content Strategy",
        lead: "Create an unmistakable brand presence that stands out across crowded feeds.",
        boxes: [
          {
            title: "The 3 Brand Voice Pillars",
            text: "Establish how your brand speaks, answers questions, and relates to culture.",
            bullets: ["Personality: Friendly, authoritative, or playful", "Vocabulary: Words you always and never use", "Stance: What does your brand take a stand for?"]
          },
          {
            title: "Visual Cohesion",
            text: "Consistency breeds recognition. A user should recognize your post before seeing your handle.",
            bullets: ["Distinct 3-color palette", "2 clean font pairings", "Standardized visual grid structure"]
          }
        ],
        callout: { type: "tip", text: "Brand recognition happens when your content looks familiar even with the logo covered." }
      }
    ]
  },
  {
    id: 5,
    title: "5. Instagram Marketing",
    subtitle: "Canva, Photoshop, CapCut & mobile-first production",
    duration: "60 mins",
    tag: "Creative",
    pdfAvailable: true,
    pdfFileName: "Instagram-Marketing-Module-5.pdf",
    slides: [
      {
        kicker: "Module 05 — Production",
        title: "5. Instagram Marketing",
        lead: "Learn practical production workflows for high-impact social media creatives on desktop and mobile.",
        boxes: [
          {
            title: "Mobile-First Framing",
            text: "94% of social media is consumed on mobile screens vertically. Design for thumbs and quick scans.",
            bullets: ["9:16 vertical video framing", "Keep key text inside the safe zone (middle 60%)", "High contrast typography readable on 6-inch screens"]
          },
          {
            title: "Production Tool Stack",
            text: "Tools that agencies use to produce content at scale.",
            bullets: ["Canva & Figma for carousel layouts", "CapCut & Premiere for snappy video editing", "Submagic or CapCut Auto-Captions for dynamic subtitles"]
          }
        ],
        callout: { type: "tip", text: "80% of mobile users watch without sound. Clear on-screen captions are mandatory." }
      }
    ]
  },
  {
    id: 6,
    title: "6. Creating Engaging Content",
    subtitle: "Hooks, CTAs, visual hierarchy, storytelling & 6-question framework",
    duration: "1 hr 15 mins",
    tag: "Core Module",
    pdfAvailable: true,
    pdfFileName: "Module-6-Creating-Engaging-Content.pdf",
    featured: true,
    slides: [
      {
        kicker: "Module 06 — THRM Social Media Training",
        title: "6. Creating Engaging Content",
        lead: "By the end of this module, you'll know how to create social media content that captures attention and drives real action — from stopping the scroll to generating leads, saves, shares, and sales.",
        boxes: [
          {
            title: "What Makes Content Engaging?",
            text: "Engaging content makes people want to do something. That action isn't always a like — it could be a save, a share, a DM, or a purchase.",
            bullets: ["Stop Scrolling: Must earn attention in first instant", "Like, Comment, Share: Traditional engagement signals", "Save: Deep value signal for reference", "Purchase or Enquire: Turning attention into revenue"]
          }
        ],
        callout: { type: "tip", text: "A simple formula: Attention → Interest → Value → Action. Get attention, give a reason to continue, provide something useful, then guide toward action." }
      },
      {
        kicker: "Module 06 — Slide 3 & 4",
        title: "What Is a Hook — and Why Does It Matter?",
        lead: "A hook is the opening moment of your content. For a Reel, it's the first few seconds. For a carousel, the first slide. For a caption, the very first line.",
        boxes: [
          {
            title: '<i class="fa-solid fa-circle-xmark text-danger"></i> Weak Hook',
            text: "'Today we're going to talk about Instagram marketing.'",
            bullets: ["Generic, predictable, and safe", "Gives the viewer no reason to stay", "Instantly scrollable"]
          },
          {
            title: '<i class="fa-solid fa-circle-check text-success"></i> Stronger Hook',
            text: "'Your Instagram isn't growing because you're making these 3 mistakes.'",
            bullets: ["Specific and problem-based", "Creates immediate curiosity", "Personal reason to keep watching"]
          }
        ],
        callout: { type: "warning", text: "5 Types of Hooks: 1. Problem-Based | 2. Curiosity | 3. Benefit | 4. Contrarian | 5. Direct Audience. Rule: Never clickbait — always deliver what the hook promises!" }
      },
      {
        kicker: "Module 06 — Slide 5 & 6",
        title: "Captions, CTAs & Visual Hierarchy",
        lead: "A caption is the written text engine accompanying your post. Visuals communicate before the caption is even read.",
        boxes: [
          {
            title: "Basic Caption Structure",
            text: "1. Hook (Stop scroll) → 2. Value/Story (Deliver useful content) → 3. CTA (Call to Action).",
            bullets: ["Educational post: 'Save this for later'", "Relatable Reel: 'Tag someone who does this'", "Product post: 'Shop now via link in bio'", "Lead content: 'DM us AUDIT to get started'"]
          },
          {
            title: "Visual Hierarchy Rules",
            text: "Guide the viewer's eye: primary message first, supporting detail second, CTA third.",
            bullets: ["Be Clear: Message understood in 1 second", "Be Relevant: Visual supports message", "Be Consistent: Fonts & brand colors", "Smartphone with good lighting & audio is enough!"]
          }
        ],
        callout: { type: "tip", text: "Avoid repeating the exact same CTA on every post — it becomes invisible when overused." }
      },
      {
        kicker: "Module 06 — Slide 7 & 8",
        title: "Storytelling & Trending vs. Evergreen Mix",
        lead: "Storytelling transforms information into emotional connection. Combine timely trending moments with timeless evergreen assets.",
        boxes: [
          {
            title: "Types of Brand Stories",
            text: "Even a 15-second Reel can have a beginning, problem, and resolution.",
            bullets: ["Founder Story: Why did the business start?", "Customer Story: How did the product help a real person?", "Transformation Story: Before and after results", "Behind-the-Scenes: What happens behind the brand"]
          },
          {
            title: "Recommended Content Mix",
            text: "A practical framework for a high-performing monthly calendar:",
            bullets: ["40% Evergreen Educational (Timeless tips & guides)", "30% Relatable / Entertaining (Builds connection)", "20% Trending (Timely formats & culture)", "10% Promotional (Direct offers & services)"]
          }
        ],
        callout: { type: "tip", text: "Without storytelling: 'Our café has opened.' With storytelling: 'We spent six months building a café we always wanted to visit ourselves. Today, the doors are finally open.'" }
      },
      {
        kicker: "Module 06 — Slide 9 & 10",
        title: "8 Common Mistakes & The 6-Question Framework",
        lead: "Before creating any piece of content, ask these 6 questions to give your content purpose, direction, and high engagement.",
        boxes: [
          {
            title: "Common Mistakes to Avoid",
            text: "Avoid weak hooks, too much text on graphics, no clear message, copying viral content without context, and focusing only on likes.",
            bullets: ["Cramming 10 points into one post", "Weak or missing call to action", "Chasing every trend and losing brand identity"]
          },
          {
            title: "The 6 Questions Before You Post",
            text: "Answer these 6 questions every time:",
            bullets: ["1. WHO? (Who am I creating this for?)", "2. WHY? (Awareness, education, leads, or sales?)", "3. HOOK? (How do I earn attention in second 1?)", "4. VALUE? (What will the viewer get?)", "5. CTA? (What should they do next?)", "6. FORMAT? (Reel, carousel, static post, or Story?)"]
          }
        ],
        callout: { type: "tip", text: "THRM Beginner Tip: Before you create content, don't ask 'What should I post?' Ask: 'Why would someone stop scrolling for this?'" }
      }
    ]
  },
  {
    id: 7,
    title: "7. Hashtags and Social Media SEO",
    subtitle: "Search-friendly captions, keywords vs hashtags & Instagram SEO",
    duration: "1 hour",
    tag: "Core Module",
    pdfAvailable: true,
    pdfFileName: "Module-7-Hashtags-and-Social-Media-SEO.pdf",
    featured: true,
    slides: [
      {
        kicker: "Module 07 — THRM Digital Beginner Course",
        title: "7. Hashtags and Social Media SEO",
        lead: "Master the tools that help your content get discovered — hashtags, keywords, Instagram SEO, and search-friendly captions.",
        boxes: [
          {
            title: "What Are Hashtags — And What They're Not",
            text: "A hashtag is a word or phrase preceded by #. It categorizes content around a topic, service, industry, or location.",
            bullets: ["#BridalMakeup — the service", "#MumbaiCafe — the location", "#FitnessTips — the topic", "#DigitalMarketing — the industry"]
          },
          {
            title: "The #1 Beginner Misconception",
            text: "Many beginners believe: 'If I add 30 hashtags, my Reel will go viral.'",
            bullets: ["Hashtags are a context signal, not a virality guarantee", "Content quality and retention signals matter far more", "Specific relevant hashtags beat massive generic tags"]
          }
        ],
        callout: { type: "tip", text: "Relevance over popularity: Broad tags like #Beauty drown in millions of posts. Targeted tags like #MumbaiMakeupArtist attract real buyers." }
      },
      {
        kicker: "Module 07 — Slide 5 & 6",
        title: "Keywords vs. Hashtags & Instagram SEO",
        lead: "Keywords are natural phrases people type in search bars. Optimize your profile and captions so both users and platform search algorithms find you.",
        boxes: [
          {
            title: "Where Keywords Live",
            text: "Keywords appear in multiple searchable surfaces across the app:",
            bullets: ["Profile Name & Username", "Bio description", "Captions", "Video On-Screen Text & Audio transcript", "Alt Text on images"]
          },
          {
            title: "Profile Optimization Case Study",
            text: "Profile A (Weak): Name: Riya | Bio: Makeup | Fashion | Creative (No service or location context).",
            bullets: ["Profile B (Strong SEO): Name: Riya | Bridal Makeup Artist Mumbai", "Bio: Bridal & Occasion Makeup Artist · Mumbai | Thane | Navi Mumbai · Bookings open", "Result: Appears at top of search when brides look for artists in Mumbai!"]
          }
        ],
        callout: { type: "tip", text: "The goal isn't to trick the algorithm — it's to make your content clear, relevant, and findable for real humans." }
      },
      {
        kicker: "Module 07 — Slide 7 & 8",
        title: "Writing Search Captions & Search Intent",
        lead: "Naturally weave keywords into captions without robotic keyword stuffing. Match content to what people actually want.",
        boxes: [
          {
            title: "Captions: Good vs Bad",
            text: "<i class=\"fa-solid fa-circle-xmark text-danger\"></i> Too Vague: 'Time to get stronger.' (Zero searchable signal)",
            bullets: [
              "<i class=\"fa-solid fa-triangle-exclamation text-warning\"></i> Keyword Stuffing: 'Mumbai makeup artist. Best Mumbai makeup artist. Bridal makeup artist Mumbai.' (Spammy, reduces trust)",
              "<i class=\"fa-solid fa-circle-check text-success\"></i> Search-Friendly: 'Looking for a beginner-friendly gym in Thane? Here are 3 things to check before choosing a fitness studio.'"
            ]
          },
          {
            title: "The 3 Types of Search Intent",
            text: "Understand why someone searches:",
            bullets: ["Informational: 'How does Instagram SEO work?' → Create tutorials & guides", "Commercial: 'Best digital marketing agency Mumbai' → Create case studies & client proof", "Transactional: 'Book bridal makeup artist Mumbai' → Share pricing packages & booking CTA"]
          }
        ],
        callout: { type: "warning", text: "Never write for the algorithm first. Write for the person searching. If humans don't find it useful, no amount of optimization will help." }
      }
    ]
  },
  {
    id: 8,
    title: "8. Growing a Social Media Account",
    subtitle: "Organic growth cycle, community building, collaborations & UGC",
    duration: "1 hr 15 mins",
    tag: "Core Module",
    pdfAvailable: true,
    pdfFileName: "Growing-a-Social-Media-Account-Module-8.pdf",
    featured: true,
    slides: [
      {
        kicker: "Module 08 — Growth Strategy",
        title: "8. Growing a Social Media Account",
        lead: "Most beginners define growth simply as getting more followers. But follower count is only one small piece of the picture.",
        boxes: [
          {
            title: "Account A vs. Account B",
            text: "Account A: 50,000 followers — almost zero engagement, no enquiries, no business impact.",
            bullets: ["Account B: 5,000 followers — regular comments, DMs, consistent leads and sales", "For a business, Account B is far more valuable!", "Audience quality matters infinitely more than follower quantity"]
          },
          {
            title: "A Healthier Growth Definition",
            text: "Real growth measures:",
            bullets: ["Relevant followers & reach", "Engagement, shares & saves", "Profile visits & website traffic", "DMs, leads & actual sales"]
          }
        ],
        callout: { type: "tip", text: "Organic growth means growing through unpaid methods — no purchased followers, no fake engagement pods. It builds an audience that actually cares." }
      },
      {
        kicker: "Module 08 — Slide 4 & 6",
        title: "The Organic Growth Cycle & Engagement Signals",
        lead: "Organic growth follows a 5-step journey: Content → Discovery → Engagement → Profile Visit → Follow.",
        boxes: [
          {
            title: "Why Saves & Shares Matter Most",
            text: "A like is passive. Saves and shares take conscious viewer effort:",
            bullets: ["Like: 'I enjoyed this for 2 seconds'", "Share: 'Someone else needs to see this' (Expands organic reach to new networks)", "Save: 'I want to return to this later' (Strong signal of high practical value)"]
          },
          {
            title: "Reading the Full Story",
            text: "A Reel with 10k views, 500 likes, 150 shares, and 300 saves is performing exceptionally well.",
            bullets: ["High saves mean people will reference your brand when making a buying decision", "High shares act as free word-of-mouth referral"]
          }
        ],
        callout: { type: "tip", text: "Example: A fitness Reel seen by a stranger → profile visit → reads 3 carousel guides → follows → engages for 3 weeks → buys personal training package." }
      },
      {
        kicker: "Module 08 — Slide 8 & 10",
        title: "Influencer Collabs & User-Generated Content (UGC)",
        lead: "A collaboration introduces you to a new but relevant audience. Relevance always beats reach.",
        boxes: [
          {
            title: "4 Influencer Categories",
            text: "Nano (<10k), Micro (10k-50k), Macro (50k-500k), Celebrity (>500k).",
            bullets: ["Relevance beats reach: A local Mumbai cafe gains more from a food creator with 15k local followers than a lifestyle influencer with 200k followers from Delhi!", "Nano & Micro influencers usually have the highest trust and conversion rates"]
          },
          {
            title: "User-Generated Content (UGC) & Social Proof",
            text: "Content created by real customers (unboxing, honest reviews, before-and-after).",
            bullets: ["Brand: 'Our product is amazing. Buy it today.' (Skeptical)", "Customer: 'Here is how this product solved my problem.' (High trust)", "Encourage UGC with branded hashtags, reposts, and rewarding customer stories"]
          }
        ],
        callout: { type: "warning", text: "6 Mistakes to Avoid: 1. Obsessing over follower count | 2. Buying followers | 3. Follow-unfollow tactics | 4. Engagement pods | 5. Posting only promotions | 6. Ignoring existing followers." }
      },
      {
        kicker: "Module 08 — Slide 12 & 13",
        title: "9-Step Framework & Local Café Case Study",
        lead: "A sustainable growth plan for a real-world local business (Kalyan Cafe).",
        boxes: [
          {
            title: "The 9-Step Organic Framework",
            text: "1. Understand Audience → 2. Create Valuable Content → 3. Use Multiple Formats → 4. Encourage Engagement → 5. Build Community → 6. Collaborate → 7. Encourage UGC → 8. Analyse & Improve → 9. Repeat.",
            bullets: ["Reply to every comment thoughtfully", "Use Stories interactively with polls & quizzes", "Turn happy customers into brand advocates"]
          },
          {
            title: "Practical Case: Kalyan Local Café",
            text: "Instead of buying 10,000 fake followers, the marketer built real community:",
            bullets: ["Food Reels + ambience behind-the-scenes", "Partnered with 3 local food bloggers", "Tracked reach, saves, profile visits, and table booking enquiries"]
          }
        ],
        callout: { type: "tip", text: "THRM Beginner Tip: Don't chase followers. Build a reason for the right people to follow you." }
      }
    ]
  },
  {
    id: 9,
    title: "9. Social Media Analytics",
    subtitle: "Formulas, reach vs impressions, vanity vs business metrics & reporting",
    duration: "1 hr 30 mins",
    tag: "Core Module",
    pdfAvailable: true,
    pdfFileName: "Module-9-Social-Media-Analytics.pdf",
    featured: true,
    slides: [
      {
        kicker: "Module 09 — THRM Analytics Training",
        title: "9. Social Media Analytics",
        lead: "The #1 Mindset Shift: Don't just report numbers. Understand what the numbers are telling you.",
        boxes: [
          {
            title: "What Is Social Media Analytics?",
            text: "The process of collecting and analyzing platform data to turn raw numbers into actionable marketing intelligence.",
            bullets: ["Visibility: How many people saw it? New vs existing followers?", "Engagement: Which posts sparked the most meaningful conversation?", "Audience Quality: Are you gaining relevant followers in the right geography?", "Business Results: Are posts generating leads, visits, bookings, or sales?"]
          }
        ],
        callout: { type: "tip", text: "The Basic Analytics Cycle: Create Content → Publish It → Measure Results → Improve Next Month. Analytics transform social media from guesswork into an informed, iterative strategy." }
      },
      {
        kicker: "Module 09 — Slide 4 & 5",
        title: "Reach vs. Impressions & Engagement Rate Formula",
        lead: "Understand the core distinction between unique people and total exposure.",
        boxes: [
          {
            title: "Reach vs. Impressions",
            text: "Reach: Number of UNIQUE accounts that saw your content. Ask: 'How many unique people did we reach?'",
            bullets: ["Impressions: Total number of times your content was displayed (includes multiple views by the same person)", "Key Rule: Impressions will always be >= Reach", "Example: Reel shown to 25k accounts = Reach 25,000. Displayed 35,000 times = Impressions 35,000"]
          },
          {
            title: "Core Engagement Rate Formula",
            text: "Engagement Rate = (Total Engagements ÷ Reach) × 100",
            bullets: ["Example: 500 engagements ÷ 10,000 reach × 100 = 5.0% Engagement Rate", "Follower Growth Rate = (New Followers ÷ Starting Followers) × 100", "Always check whether reach, impressions, or follower count is used as the denominator!"]
          }
        ],
        callout: { type: "warning", text: "A large gap between reach and impressions indicates repeated exposure among a loyal, concentrated audience." }
      },
      {
        kicker: "Module 09 — Slide 8 & 9",
        title: "Vanity Metrics vs. Business Metrics",
        lead: "Some numbers look impressive on a screenshot but don't pay agency clients' bills.",
        boxes: [
          {
            title: "Vanity Metrics",
            text: "Follower count, total likes, video views (in isolation).",
            bullets: ["A Reel with 500,000 views that generates zero enquiries, zero clicks, and zero purchases has failed its business goal", "Likes alone don't prove business viability"]
          },
          {
            title: "Business Metrics",
            text: "Leads, quote requests, bookings, conversion rate, cost per lead, revenue generated.",
            bullets: ["Qualified Prospects: Leads meeting buyer criteria", "Conversion: Desired action completed (purchase, booking, registration)", "The Right Question: Don't ask 'How many likes did we get?' Ask 'What did this content achieve for the business?'"]
          }
        ],
        callout: { type: "tip", text: "Real-world café comparison: A funny meme got 45,000 views and 0 enquiries. A customer testimonial got 10,000 views and generated 35 enquiries! The testimonial drove the business." }
      },
      {
        kicker: "Module 09 — Slide 11 & 12",
        title: "From Reporting to Insight: The Real Marketer Skill",
        lead: "Analytics are only useful if they lead to action. The difference between a weak report and a strong one isn't data — it's interpretation.",
        boxes: [
          {
            title: "Reporting Quality Comparison",
            text: "<i class=\"fa-solid fa-circle-xmark text-danger\"></i> Weak: 'Our Reel received 50,000 views this month.'",
            bullets: [
              "<i class=\"fa-solid fa-circle-check text-success\"></i> Better: 'Reels using problem-based hooks generated 35% higher average reach than generic educational introductions.'",
              "<i class=\"fa-solid fa-trophy text-gold\"></i> Best-in-Class: 'Problem-based hooks consistently drove stronger reach and engagement. We recommend using problem-focused openings in next month's educational Reels and A/B testing them across topics.'"
            ]
          },
          {
            title: "The 5 Questions for Every Post",
            text: "1. Did people see it? (Reach/Views) → 2. Did people interact? (Engagement) → 3. Did they take further action? (Profile visits/Clicks) → 4. Did it generate business results? (Leads) → 5. Why did it perform that way? (Hook, timing, topic).",
            bullets: ["The 'Why' is the most valuable question because it dictates next month's strategy"]
          }
        ],
        callout: { type: "tip", text: "The Analytics Mindset: Measure → Understand → Learn → Improve. A great marketer doesn't just say what happened; they explain why and what to do next." }
      }
    ]
  },
  {
    id: 10,
    title: "10. Introduction to Paid Social Media",
    subtitle: "Meta Ads, campaign objectives, CPM/CPC/CTR/CPL, targeting & budgets",
    duration: "1 hr 30 mins",
    tag: "Core Module",
    pdfAvailable: true,
    pdfFileName: "Module-10-Introduction-to-Paid-Social-Media.pdf",
    featured: true,
    slides: [
      {
        kicker: "Module 10 — Beginner-Friendly",
        title: "10. Introduction to Paid Social Media",
        lead: "By the end of this module, you will understand the difference between organic and paid social, how Meta Ads work, how to define your audience and budget, why creative testing matters, and the key metrics every advertiser needs to know.",
        boxes: [
          {
            title: '<i class="fa-solid fa-seedling text-green"></i> Organic Social',
            text: "Content published without directly paying the platform to distribute it as an ad. You earn attention through quality and consistency.",
            bullets: ["Instagram Reels, carousels, Stories", "Facebook & LinkedIn posts", "Builds trust and community over time"]
          },
          {
            title: '<i class="fa-solid fa-coins text-gold"></i> Paid Social',
            text: "You pay the platform to distribute your message to a specifically selected audience — faster, and at scale.",
            bullets: ["Targeted ads by location, interest, behavior", "Reach people who don't follow you yet", "Promote offers, drive traffic, generate leads"]
          }
        ],
        callout: { type: "tip", text: "Neither is automatically better. Organic builds trust and community. Paid accelerates reach and results. The strongest strategies combine both." }
      },
      {
        kicker: "Module 10 — Slide 3 & 4",
        title: "What Are Meta Ads & Boost vs. Campaign Structure",
        lead: "Meta Ads appear across Facebook, Instagram, Messenger, and Audience Network reaching billions of people globally.",
        boxes: [
          {
            title: "Boost vs. Campaign Structure",
            text: "A boosted post is a simplified shortcut for promoting existing content with minimal controls.",
            bullets: ["A properly structured Ads Manager campaign gives marketers control over: Objectives, detailed audiences, specific placements, budgets, creatives, and conversion measurement", "For serious agency results, learn campaign structure — not just the boost button!"]
          },
          {
            title: "The 3 Core Campaign Objectives",
            text: "Never launch an ad without defining what you want it to achieve:",
            bullets: ["Awareness: Introduce brand to maximum relevant people ('How many can we reach?')", "Traffic: Send people to website or landing page ('Can we get clicks?')", "Leads: Collect enquiries, phone numbers, and booking requests ('Can we create potential customers?')"]
          }
        ],
        callout: { type: "warning", text: "How a campaign works: Business Goal → Campaign Objective → Target Audience → Ad Creative → Budget & Delivery. A weak link at any stage breaks results." }
      },
      {
        kicker: "Module 10 — Slide 6 & 7",
        title: "Audience Targeting, Budgets & Creative Testing",
        lead: "Paid advertising becomes powerful when you define exactly who should see your ad and test what creative angle resonates.",
        boxes: [
          {
            title: "Targeting Signals",
            text: "Location & Demographics (City, radius, age, gender) | Interests & Behaviors | Custom & Retargeting lists.",
            bullets: ["Beginner Rule: Don't target everyone just because anyone could theoretically buy. A narrower relevant audience outperforms a massive irrelevant one!"]
          },
          {
            title: "Daily vs. Lifetime Budget & Testing",
            text: "Daily Budget: paces spend across 24h. Lifetime Budget: optimizes pacing over the entire campaign period.",
            bullets: ["Creative Testing: Test Ad A ('3 skincare mistakes ruining your routine') vs Ad B ('Build a simple routine in 3 steps')", "A bigger budget does not fix bad creative. More spend on a weak ad only amplifies wasted money!"]
          }
        ],
        callout: { type: "tip", text: "Real Example: GlowUp Salon Thane. Goal: Appointment enquiries. Objective: Leads. Audience: People within 5km interested in beauty. Creative: Short Reel with offer." }
      },
      {
        kicker: "Module 10 — Slide 8 & 10",
        title: "Key Paid Advertising Terminology & Pre-Launch Checklist",
        lead: "The four essential advertising formulas and the pre-flight checklist before spending budget.",
        boxes: [
          {
            title: "Key Paid Formulas",
            text: "Every digital media buyer must know these formulas by heart:",
            bullets: [
              "CPM (Cost Per 1,000 Impressions): Measures exposure cost efficiency",
              "CPC (Cost Per Click): Total Spend ÷ Clicks (e.g. ₹1,000 ÷ 200 clicks = ₹5 CPC)",
              "CTR (Click-Through Rate): (Clicks ÷ Impressions) × 100 (e.g. 30 clicks / 1,000 impr = 3% CTR)",
              "CPL (Cost Per Lead): Total Spend ÷ Leads (e.g. ₹5,000 ÷ 50 leads = ₹100 CPL)"
            ]
          },
          {
            title: "Pre-Launch Checklist",
            text: "Answer these 6 questions before hitting publish:",
            bullets: [
              '<i class="fa-solid fa-bullseye text-danger"></i> Goal: What exactly do we want the customer to do?',
              '<i class="fa-solid fa-users text-blue"></i> Audience: Who should see this ad, and where are they?',
              '<i class="fa-solid fa-gift text-gold"></i> Offer: What are we offering, and is it compelling?',
              '<i class="fa-solid fa-film text-purple"></i> Creative: Will the audience understand the message in 3 seconds?',
              '<i class="fa-solid fa-wallet text-green"></i> Budget: How much are we spending, and for how long?',
              '<i class="fa-solid fa-chart-line text-cyan"></i> Measurement: How will we define whether this campaign worked?'
            ]
          }
        ],
        callout: { type: "tip", text: "THRM Beginner Tip: Don't start with 'How much should I spend?' Start with 'What exactly do I want the customer to do?' Once the objective is clear, everything else follows." }
      }
    ]
  },
  {
    id: 11,
    title: "11. Social Media Strategy for a Business",
    subtitle: "Custom audiences, funnels, competitor audits & end-to-end plan",
    duration: "1 hr 15 mins",
    tag: "Strategy",
    pdfAvailable: true,
    pdfFileName: "Module-11-Social-Media-Strategy-for-a-Business.pdf",
    slides: [
      {
        kicker: "Module 11 — Business Strategy",
        title: "11. Social Media Strategy for a Business",
        lead: "Most people do not buy on first contact. Build multi-touch social media strategies that warm prospects, build authority, and drive revenue.",
        boxes: [
          {
            title: "The Strategic Blueprint",
            text: "Develop a cohesive strategy integrating brand goals, audience pain points, and distribution channels.",
            bullets: ["Audit existing assets & competitor positioning", "Define clear KPIs (Reach, Leads, Revenue)", "Map customer journey from discovery to conversion"]
          },
          {
            title: "Funnels: TOFU, MOFU, BOFU",
            text: "Top of Funnel: Broad awareness content. Middle of Funnel: Educational carousels and case studies.",
            bullets: ["Bottom of Funnel: Irresistible offer or testimonial posts converting intent into buyers", "Results in significantly higher conversion and measurable business ROI"]
          }
        ],
        callout: { type: "tip", text: "A strategy without execution is a daydream; execution without strategy is a nightmare." }
      }
    ]
  },
  {
    id: 12,
    title: "12. Becoming a Social Media Marketer",
    subtitle: "Portfolio building, agency roles, freelance pricing & career roadmap",
    duration: "2 hours",
    tag: "Career",
    pdfAvailable: true,
    pdfFileName: "Module-12-Becoming-a-Social-Media-Marketer.pdf",
    slides: [
      {
        kicker: "Module 12 — Career & Freelance",
        title: "12. Becoming a Social Media Marketer",
        lead: "Turn your skills into high-paying employment, agency roles, or a thriving freelance consulting practice.",
        boxes: [
          {
            title: "Your Marketer Portfolio",
            text: "Show, don't just tell. Employers and clients hire evidence over claims:",
            bullets: ["Case studies demonstrating before & after growth", "Sample content calendars with proven hooks & design hierarchy", "Ad campaign architecture with target CPM/CPL metrics", "Analytics reporting dashboards explaining business impact"]
          },
          {
            title: "Ready for the Certification Assessment",
            text: "You are now prepared to take the 60-question comprehensive certification exam.",
            bullets: ["60 rigorous questions covering all 12 modules", "70% minimum score required (42/60 correct)", "Unlocks the official verifiable THRM Certified certificate for your CV and LinkedIn"]
          }
        ],
        callout: { type: "tip", text: "Add this certification to your portfolio and LinkedIn profile to demonstrate verified, job-ready digital marketing mastery." }
      }
    ]
  }
];

// ==========================================
// 2. THE 60-QUESTION CERTIFICATION ASSESSMENT
// ==========================================
const EXAM_QUESTIONS = [
  // Module 6: Content Creation & Hooks
  {
    id: 1,
    category: "Content Strategy",
    question: "What is the primary definition of a 'Hook' in social media content creation?",
    options: [
      "The concluding call to action at the end of a video",
      "The opening moment that captures attention and stops the viewer from scrolling",
      "The list of hashtags placed in the first comment",
      "The background music selected from the trending audio library"
    ],
    answer: 1,
    explanation: "A hook is the opening moment of your content (the first few seconds of a Reel or first line of a caption) that earns attention and prevents the viewer from scrolling away."
  },
  {
    id: 2,
    category: "Content Strategy",
    question: "Why is 'Today we are going to talk about Instagram marketing' considered a weak hook?",
    options: [
      "It contains too many technical marketing keywords",
      "It is generic, safe, and gives the audience no compelling personal reason to continue",
      "It exceeds the maximum character count for a hook",
      "It is contrary to platform community guidelines"
    ],
    answer: 1,
    explanation: "It is predictable and generic. A strong hook must be specific, problem-based, or spark immediate curiosity."
  },
  {
    id: 3,
    category: "Content Strategy",
    question: "'Your Instagram isn't growing because you're making these 3 mistakes' is an example of which hook type?",
    options: [
      "Contrarian Hook",
      "Curiosity Hook",
      "Problem-Based Hook",
      "Direct Audience Hook"
    ],
    answer: 2,
    explanation: "It speaks directly to a specific pain point that the viewer is currently experiencing (lack of growth)."
  },
  {
    id: 4,
    category: "Content Strategy",
    question: "According to THRM's content framework, what is the golden rule regarding hooks?",
    options: [
      "Always use clickbait to maximize initial views regardless of content",
      "Never clickbait; if your hook promises 5 tips, your content must actually deliver those 5 tips",
      "Hooks must only be in video format, never in carousel or captions",
      "Hooks should always mention the brand's pricing upfront"
    ],
    answer: 1,
    explanation: "Never clickbait. False promises destroy audience trust and retention metrics."
  },
  {
    id: 5,
    category: "Content Strategy",
    question: "What is the recommended 4-step sequence in THRM's engagement formula?",
    options: [
      "Attention → Interest → Value → Action",
      "Action → Attention → Value → Sales",
      "Budget → Creative → Objective → Analytics",
      "Hashtags → Audio → Thumbnail → Conversion"
    ],
    answer: 0,
    explanation: "The formula is Attention → Interest → Value → Action: Get attention first, give a reason to continue, deliver useful value, then guide toward action."
  },
  {
    id: 6,
    category: "Content Strategy",
    question: "What happens when a creator repeats the exact same Call to Action (CTA) on every single post?",
    options: [
      "The algorithm prioritizes the post in search results",
      "The CTA becomes invisible to the audience through overuse fatigue",
      "It automatically doubles the engagement rate",
      "It converts 100% of viewers into paying customers"
    ],
    answer: 1,
    explanation: "Repeating identical CTAs causes audience blindness. CTAs should vary depending on whether the post is educational, relatable, lead-driven, or community-focused."
  },
  {
    id: 7,
    category: "Content Strategy",
    question: "What is the recommended content mix ratio for a balanced, high-performing social media calendar?",
    options: [
      "90% Promotional, 10% Educational",
      "40% Evergreen Educational, 30% Relatable/Entertaining, 20% Trending, 10% Promotional",
      "50% Trending memes, 50% Sales discounts",
      "25% each across all four formats regardless of industry"
    ],
    answer: 1,
    explanation: "40% Evergreen Educational builds authority; 30% Relatable builds connection; 20% Trending leverages timely discovery; 10% Promotional drives revenue."
  },
  {
    id: 8,
    category: "Content Strategy",
    question: "Why is evergreen content essential in a social media strategy?",
    options: [
      "It uses trending audio that expires in 48 hours",
      "It remains useful weeks or months after posting and continues to perform well in search and saves",
      "It requires zero production effort",
      "It can only be viewed by existing followers"
    ],
    answer: 1,
    explanation: "Evergreen content provides timeless value (e.g. 'How to write an Instagram bio') that continues delivering saves and search traffic over months."
  },
  {
    id: 9,
    category: "Content Strategy",
    question: "Which of the following is considered one of the 8 common content mistakes in Module 6?",
    options: [
      "Using high-contrast typography",
      "Cramming 10 complex points into a single post instead of breaking it into a series",
      "Including clear captions on videos",
      "Focusing on business enquiries instead of likes"
    ],
    answer: 1,
    explanation: "Cramming too much information into one post overwhelms the audience. It's better to break complex topics into a carousel or multiple Reels."
  },
  {
    id: 10,
    category: "Content Strategy",
    question: "What does visual hierarchy on social media creatives achieve?",
    options: [
      "It forces the viewer to watch the video at 2x speed",
      "It guides the viewer's eye: primary message first, supporting detail second, and CTA third",
      "It automatically bypasses copyright filters on music",
      "It increases the file size of the image"
    ],
    answer: 1,
    explanation: "Visual hierarchy establishes clear visual priority so the viewer instantly comprehends the key takeaway without cognitive friction."
  },

  // Module 7: Hashtags & Social Media SEO
  {
    id: 11,
    category: "SEO & Discoverability",
    question: "What is the primary function of a hashtag on modern social media platforms?",
    options: [
      "To guarantee that every post goes viral within 24 hours",
      "To categorize content around a topic, service, industry, or location as a context signal",
      "To replace the need for writing high-quality captions",
      "To increase ad budget efficiency on Facebook"
    ],
    answer: 1,
    explanation: "Hashtags are context signals that help platforms categorize content around topics, industries, and locations."
  },
  {
    id: 12,
    category: "SEO & Discoverability",
    question: "Why is using broad hashtags like #Beauty and #Fashion generally ineffective for small local businesses?",
    options: [
      "Platforms charge money for using popular hashtags",
      "High competition causes your content to drown immediately in millions of competing posts",
      "They are permanently banned by Meta",
      "They prevent followers from sending DMs"
    ],
    answer: 1,
    explanation: "Broad hashtags have millions of posts every hour. Niche, targeted tags like #MumbaiMakeupArtist connect with relevant prospective clients."
  },
  {
    id: 13,
    category: "SEO & Discoverability",
    question: "What is the key difference between a keyword and a hashtag on social media?",
    options: [
      "A hashtag is paid, while keywords are free",
      "A hashtag uses the # symbol, while a keyword is a natural searchable phrase woven into captions, bios, and on-screen text",
      "Keywords only work on Google, never on Instagram or TikTok",
      "Hashtags can only be written in capital letters"
    ],
    answer: 1,
    explanation: "Keywords are natural search terms (e.g. 'bridal makeup artist Mumbai') woven into names, bios, captions, and speech, while hashtags are tag markers."
  },
  {
    id: 14,
    category: "SEO & Discoverability",
    question: "Where should strategic keywords be placed on an Instagram profile for maximum discoverability?",
    options: [
      "Exclusively in the comments section of old posts",
      "In the Name field, Bio description, Captions, and Video on-screen text",
      "Only in private direct messages",
      "In the account password settings"
    ],
    answer: 1,
    explanation: "The Name field, bio, captions, spoken audio, and on-screen text are all indexed by platform search engines."
  },
  {
    id: 15,
    category: "SEO & Discoverability",
    question: "Why was Profile B ('Riya | Bridal Makeup Artist Mumbai') more effective than Profile A ('Riya' with bio 'Makeup | Fashion | Lifestyle')?",
    options: [
      "Profile B paid Meta for a verified blue checkmark",
      "Profile B clearly communicated what she does, where she operates, and targeted search terms used by local clients",
      "Profile B posted 10 times more photos per day",
      "Profile B hid her location from competitors"
    ],
    answer: 1,
    explanation: "Profile B includes the service and location keywords directly in the name and bio, making the profile discoverable when users search for wedding makeup in Mumbai."
  },
  {
    id: 16,
    category: "SEO & Discoverability",
    question: "What is 'Keyword Stuffing' and why should marketers avoid it?",
    options: [
      "Using only 1 keyword in an entire post",
      "Unnaturally repeating keywords repeatedly in captions, which damages readability, looks spammy, and reduces brand credibility",
      "Translating keywords into multiple languages",
      "Paying influencers to mention keywords on stories"
    ],
    answer: 1,
    explanation: "Keyword stuffing (e.g. 'Mumbai makeup artist best Mumbai makeup artist bridal artist') degrades user trust and creates a terrible reading experience."
  },
  {
    id: 17,
    category: "SEO & Discoverability",
    question: "A user searching 'How does Instagram SEO work?' exhibits which type of search intent?",
    options: [
      "Transactional Intent",
      "Commercial Comparison Intent",
      "Informational Intent",
      "Navigational Intent"
    ],
    answer: 2,
    explanation: "Informational intent occurs when the user wants to learn concepts, requiring educational guides, tips, and tutorials."
  },
  {
    id: 18,
    category: "SEO & Discoverability",
    question: "Which content type best satisfies 'Transactional Search Intent' (e.g. 'Book bridal makeup artist Mumbai')?",
    options: [
      "A 30-minute documentary on the history of cosmetics",
      "Clear packages, availability calendar, testimonial proof, and a direct booking CTA",
      "A relatable comedy meme about waking up late",
      "A poll asking followers their favorite lipstick color"
    ],
    answer: 1,
    explanation: "When intent is transactional, the user is ready to buy or book. Provide pricing, packages, availability, and a clear call to action."
  },
  {
    id: 19,
    category: "SEO & Discoverability",
    question: "What is the core principle taught in THRM's SEO module regarding writing for algorithms vs humans?",
    options: [
      "Always write for the algorithm first, even if the text sounds like robotic code",
      "Write for the person searching first; if humans don't find it useful, no amount of optimization will help",
      "Never use complete sentences in captions",
      "Delete posts that don't rank #1 within 10 minutes"
    ],
    answer: 1,
    explanation: "Algorithms are designed to reward human satisfaction. If humans don't find content useful or engaging, SEO tricks cannot sustain performance."
  },
  {
    id: 20,
    category: "SEO & Discoverability",
    question: "Why should local businesses include location names (e.g. 'Thane', 'Kalyan', 'Bandra') in captions and bios?",
    options: [
      "It enables international users to book local services",
      "Search engines match local intent, ensuring the business appears for nearby customers who can actually visit",
      "Platforms provide advertising discounts to accounts with cities in their bio",
      "It prevents users outside the city from seeing the post"
    ],
    answer: 1,
    explanation: "Local SEO signals allow platforms to recommend physical businesses to nearby users searching for local services."
  },

  // Module 8: Growing a Social Media Account & Community
  {
    id: 21,
    category: "Organic Growth",
    question: "In the comparison between Account A (50k followers, 0 enquiries) and Account B (5k followers, regular enquiries & sales), which is more valuable to a business?",
    options: [
      "Account A, because vanity numbers impress venture capitalists unconditionally",
      "Account B, because audience quality and revenue generation matter far more than follower count",
      "Both are equally valuable according to Meta metrics",
      "Neither account can succeed without paid advertising"
    ],
    answer: 1,
    explanation: "Account B generates real business value. An engaged, relevant audience that buys is vastly superior to 50,000 passive ghost followers."
  },
  {
    id: 22,
    category: "Organic Growth",
    question: "What are the 5 sequential stages of the THRM Organic Growth Cycle?",
    options: [
      "Content → Discovery → Engagement → Profile Visit → Follow",
      "Follow → Content → Sales → Unfollow → Ad",
      "Budget → Ad Creative → Impressions → Clicks → Leads",
      "Hashtag → Viral Reel → Sponsorship → Agency → Exit"
    ],
    answer: 0,
    explanation: "A stranger discovers valuable content, interacts with it, visits the profile, consumes more value, and chooses to follow."
  },
  {
    id: 23,
    category: "Organic Growth",
    question: "Why is a 'Save' considered one of the highest content-quality signals by platform algorithms?",
    options: [
      "It sends an automated notification to all the user's contacts",
      "It signals that the content is so useful, educational, or reference-worthy that the user wants to return to it later",
      "It charges the user's credit card for bookmarking",
      "It immediately downloads the video to their camera roll"
    ],
    answer: 1,
    explanation: "A save indicates practical utility and value. People only bookmark content they find reference-worthy or educational."
  },
  {
    id: 24,
    category: "Organic Growth",
    question: "What does a 'Share' communicate compared to a 'Save'?",
    options: [
      "A save says 'Someone else needs to see this', while a share says 'I will watch this next year'",
      "A save says 'I want to return to this', while a share says 'Someone else needs to see this'",
      "Both actions trigger identical algorithmic weight with zero distinction",
      "Shares only work on private personal profiles"
    ],
    answer: 1,
    explanation: "A save signals personal utility; a share signals that the user found the content relatable, insightful, or entertaining enough to send to a friend."
  },
  {
    id: 25,
    category: "Organic Growth",
    question: "What is the golden rule when building real community in comment sections?",
    options: [
      "Never reply to comments to maintain an aura of mystery",
      "Don't just say 'Thank you'; continue the conversation with an open question to create genuine dialogue",
      "Copy and paste identical emojis on every comment within 5 seconds",
      "Only reply to verified accounts"
    ],
    answer: 1,
    explanation: "Community is built through conversation. Asking a thoughtful question turns passive commenters into engaged community advocates."
  },
  {
    id: 26,
    category: "Organic Growth",
    question: "Which type of influencer typically possesses between 1,000 to 10,000 followers and exceptionally high niche trust?",
    options: [
      "Mega / Celebrity Influencer",
      "Macro Influencer",
      "Nano Influencer",
      "Affiliate Publisher"
    ],
    answer: 2,
    explanation: "Nano influencers have under 10k followers and often possess tight-knit, highly loyal, and engaged communities with high credibility."
  },
  {
    id: 27,
    category: "Organic Growth",
    question: "Why does 'Relevance beat reach' when selecting influencer collaboration partners?",
    options: [
      "Local relevant creators cost 10x more than Bollywood celebrities",
      "A local creator with 15k local followers drives far more actual customers for a city business than a lifestyle creator with 200k followers from another state",
      "Platforms shadowban influencers with over 50k followers",
      "Reach is illegal to measure under FTC regulations"
    ],
    answer: 1,
    explanation: "Relevance ensures the viewers can actually buy or visit. Irrelevant reach from other cities or demographics does not convert into customers."
  },
  {
    id: 28,
    category: "Organic Growth",
    question: "What is User-Generated Content (UGC) and why is it so powerful?",
    options: [
      "AI-generated text created by automated bots",
      "Content created by real customers sharing honest experiences, providing authentic social proof that branded ads cannot replicate",
      "Stock video clips purchased from royalty-free libraries",
      "Copyrighted music uploaded without licensing"
    ],
    answer: 1,
    explanation: "UGC feels trustworthy because it comes from real customers rather than a brand praising its own products."
  },
  {
    id: 29,
    category: "Organic Growth",
    question: "Why are 'Engagement Pods' (groups who reciprocally like and comment on each other's posts) harmful?",
    options: [
      "They artificially inflate numbers and distort analytics without representing genuine audience interest or generating sales",
      "They cost over ₹50,000 per month in platform fees",
      "They permanently lock your phone from opening social media",
      "They are mandatory for all verified accounts"
    ],
    answer: 0,
    explanation: "Engagement pods distort data, fool no algorithms, and never produce actual buying customers."
  },
  {
    id: 30,
    category: "Organic Growth",
    question: "Why should marketers avoid buying fake followers?",
    options: [
      "Fake followers boost engagement rates to over 90%",
      "They destroy engagement rates, corrupt analytics, damage brand credibility, and never become paying customers",
      "They are automatically converted into Meta ad credits",
      "They increase reach across international timezones"
    ],
    answer: 1,
    explanation: "Fake followers cannot view, like, save, or buy. They dilute your engagement percentage and trigger algorithmic penalties."
  },

  // Module 9: Social Media Analytics & Metrics
  {
    id: 31,
    category: "Analytics & ROI",
    question: "What is the primary mindset shift taught in THRM's analytics module?",
    options: [
      "Report every number possible on a 50-page spreadsheet",
      "Don't just report numbers; understand what the numbers are telling you and what action to take next",
      "Only look at like counts once every 6 months",
      "Ignore analytics completely and rely entirely on intuition"
    ],
    answer: 1,
    explanation: "Marketers interpret numbers into actionable marketing intelligence: what happened, why it happened, and what to do next."
  },
  {
    id: 32,
    category: "Analytics & ROI",
    question: "What is the fundamental difference between 'Reach' and 'Impressions'?",
    options: [
      "Reach counts total ad spend, while Impressions counts clicks",
      "Reach is the number of UNIQUE accounts that saw content, while Impressions is the TOTAL times it was displayed (including repeated views)",
      "Reach can only be measured on videos, while Impressions applies to images",
      "Reach is always equal to or greater than Impressions"
    ],
    answer: 1,
    explanation: "Reach = unique people who saw the post. Impressions = total views. Impressions are always >= Reach."
  },
  {
    id: 33,
    category: "Analytics & ROI",
    question: "A post is shown to 1,000 unique people, and some view it twice, resulting in 1,400 total views. What is the Reach and Impressions?",
    options: [
      "Reach = 1,400 | Impressions = 1,000",
      "Reach = 1,000 | Impressions = 1,400",
      "Reach = 2,400 | Impressions = 400",
      "Reach = 400 | Impressions = 1,000"
    ],
    answer: 1,
    explanation: "1,000 unique accounts = 1,000 Reach; 1,400 total displays = 1,400 Impressions."
  },
  {
    id: 34,
    category: "Analytics & ROI",
    question: "What is the standard formula for calculating Engagement Rate based on Reach?",
    options: [
      "Engagement Rate = (Total Engagements ÷ Reach) × 100",
      "Engagement Rate = Total Engagements × Total Followers",
      "Engagement Rate = (Reach ÷ Impressions) × 100",
      "Engagement Rate = Total Spend ÷ Total Clicks"
    ],
    answer: 0,
    explanation: "Engagement Rate = (Total Engagements / Reach) * 100. (e.g. 500 engagements / 10,000 reach * 100 = 5%)."
  },
  {
    id: 35,
    category: "Analytics & ROI",
    question: "If a Reel receives 500 total engagements and reaches 10,000 unique accounts, what is the engagement rate?",
    options: [
      "0.5%",
      "5.0%",
      "50.0%",
      "2.0%"
    ],
    answer: 1,
    explanation: "500 / 10,000 = 0.05. Multiplied by 100 gives 5.0%."
  },
  {
    id: 36,
    category: "Analytics & ROI",
    question: "What is the Follower Growth Rate formula?",
    options: [
      "Growth Rate = Total Followers ÷ New Followers",
      "Growth Rate = (New Followers ÷ Starting Followers) × 100",
      "Growth Rate = (Impressions ÷ Followers) × 100",
      "Growth Rate = Total Likes × 100"
    ],
    answer: 1,
    explanation: "Growth Rate = (New Followers / Starting Followers) * 100. For example, 500 new followers / 5,000 starting followers * 100 = 10% growth rate."
  },
  {
    id: 37,
    category: "Analytics & ROI",
    question: "Which of the following is considered a 'Vanity Metric' when reported in isolation?",
    options: [
      "Appointment enquiries and qualified leads",
      "Total likes and total follower count without revenue context",
      "Conversion rate from website visitors to purchases",
      "Cost Per Lead (CPL)"
    ],
    answer: 1,
    explanation: "Follower count and likes are vanity metrics when untied to business objectives. A post with 500k views that brings 0 sales failed the business."
  },
  {
    id: 38,
    category: "Analytics & ROI",
    question: "In the café case study, a meme got 45,000 views & 0 enquiries, while a customer testimonial got 10,000 views & 35 enquiries. What is the smart marketer's takeaway?",
    options: [
      "Delete both posts immediately",
      "Different formats serve different objectives: memes drive top-of-funnel reach, while testimonials drive bottom-of-funnel conversions",
      "Never post video testimonials again because views were lower",
      "Only memes should be posted going forward"
    ],
    answer: 1,
    explanation: "Different content formats serve distinct stages of the funnel. Evaluating solely on view count would misidentify the highest-converting asset."
  },
  {
    id: 39,
    category: "Analytics & ROI",
    question: "What differentiates 'Weak Reporting' from 'Best-in-Class Reporting'?",
    options: [
      "Weak reporting includes charts, while best-in-class has only bullet points",
      "Weak reporting merely states what happened ('We got 50k views'), while best-in-class explains WHY it happened and what strategic action to take next",
      "Best-in-class reporting takes over 3 months to write",
      "Weak reporting mentions revenue and profit"
    ],
    answer: 1,
    explanation: "Great marketers connect the dots: What happened → Why it mattered → What we should do next month."
  },
  {
    id: 40,
    category: "Analytics & ROI",
    question: "Why is comparing Instagram metrics directly to LinkedIn metrics a common mistake?",
    options: [
      "LinkedIn does not have an analytics dashboard",
      "Instagram and LinkedIn have entirely different audience mindsets, content formats, and platform usage behaviors",
      "Both platforms have identical algorithms owned by Meta",
      "LinkedIn only allows video posts"
    ],
    answer: 1,
    explanation: "Cross-platform comparisons mislead because audience expectations, interaction patterns, and conversion values differ substantially."
  },

  // Module 10: Paid Social Media & Meta Ads
  {
    id: 41,
    category: "Paid Advertising",
    question: "What is the primary difference between Organic Social and Paid Social?",
    options: [
      "Organic requires a minimum daily budget of ₹500",
      "Organic earns attention through quality and consistency without paying platforms, while Paid pays the platform to distribute messages to targeted audiences faster and at scale",
      "Paid social only works on weekends",
      "Organic social is only visible on laptops"
    ],
    answer: 1,
    explanation: "Organic is unpaid content distribution that earns trust over time; Paid social exchanges money for immediate targeted reach and scale."
  },
  {
    id: 42,
    category: "Paid Advertising",
    question: "Why do professional digital marketers use Meta Ads Manager instead of simply clicking the 'Boost Post' button?",
    options: [
      "The Boost button requires an advanced computer science degree",
      "Ads Manager provides deep campaign structure, custom conversion objectives, detailed audience layering, placement selection, and rigorous A/B creative testing",
      "The Boost button cannot accept payment via credit cards",
      "Ads Manager is only accessible outside India"
    ],
    answer: 1,
    explanation: "Boost is a simplified shortcut with limited parameters. Ads Manager gives total control over objectives, bidding, placements, audiences, and measurement."
  },
  {
    id: 43,
    category: "Paid Advertising",
    question: "Which Meta Ads objective is best suited for introducing a brand new product to the widest relevant audience?",
    options: [
      "Leads Objective",
      "Awareness Objective",
      "Catalogue Sales Objective",
      "Direct Message Objective"
    ],
    answer: 1,
    explanation: "The Awareness objective is designed to introduce your brand to the maximum number of relevant people efficiently."
  },
  {
    id: 44,
    category: "Paid Advertising",
    question: "For a local dental clinic or salon seeking new appointment bookings, which campaign objective is most appropriate?",
    options: [
      "Traffic to a 404 page",
      "Leads Objective",
      "Brand Awareness with reach optimization",
      "Video Views with 2-second view optimization"
    ],
    answer: 1,
    explanation: "Service businesses need customer contact info and appointments, which the Leads objective specifically optimizes for."
  },
  {
    id: 45,
    category: "Paid Advertising",
    question: "What does the abbreviation 'CPM' stand for in paid advertising?",
    options: [
      "Cost Per Million impressions",
      "Cost Per 1,000 Impressions (Cost Per Mille)",
      "Cost Per Month",
      "Clicks Per Minute"
    ],
    answer: 1,
    explanation: "CPM is Cost Per Mille (thousand impressions), measuring how cost-effectively an ad campaign generates audience exposure."
  },
  {
    id: 46,
    category: "Paid Advertising",
    question: "If an advertiser spends ₹1,000 and generates 200 link clicks, what is the Cost Per Click (CPC)?",
    options: [
      "₹20 CPC",
      "₹5 CPC",
      "₹0.20 CPC",
      "₹50 CPC"
    ],
    answer: 1,
    explanation: "Formula: Total Spend ÷ Clicks = ₹1,000 ÷ 200 = ₹5 CPC."
  },
  {
    id: 47,
    category: "Paid Advertising",
    question: "What is the formula for Click-Through Rate (CTR)?",
    options: [
      "CTR = (Clicks ÷ Impressions) × 100",
      "CTR = Total Spend ÷ Total Leads",
      "CTR = (Reach ÷ Clicks) × 100",
      "CTR = Total Impressions ÷ Total Spend"
    ],
    answer: 0,
    explanation: "Formula: (Clicks / Impressions) * 100. (e.g. 30 clicks from 1,000 impressions = 3% CTR)."
  },
  {
    id: 48,
    category: "Paid Advertising",
    question: "If an advertiser spends ₹5,000 on a Meta Lead campaign and collects 50 qualified lead enquiries, what is the Cost Per Lead (CPL)?",
    options: [
      "₹50 CPL",
      "₹100 CPL",
      "₹250 CPL",
      "₹500 CPL"
    ],
    answer: 1,
    explanation: "Formula: Total Spend ÷ Leads = ₹5,000 ÷ 50 = ₹100 CPL."
  },
  {
    id: 49,
    category: "Paid Advertising",
    question: "What is the difference between a Daily Budget and a Lifetime Budget on Meta Ads?",
    options: [
      "Daily budget must be at least ₹10,000 per day",
      "Daily Budget sets an approximate spend per day paced across 24h, while Lifetime Budget sets a total amount for the full campaign period and optimizes delivery dynamically",
      "Lifetime budget expires after 48 hours",
      "Daily budget does not allow targeting by location"
    ],
    answer: 1,
    explanation: "Daily budget regulates daily pacing; Lifetime budget lets the platform spend more on high-opportunity days over the campaign duration."
  },
  {
    id: 50,
    category: "Paid Advertising",
    question: "What does 'Creative Testing' mean in paid advertising?",
    options: [
      "Asking friends if they like the color palette",
      "Running multiple versions of an ad (testing different hooks, video formats, offers, or CTAs) to let real data determine what resonates",
      "Submitting creatives to the government for censorship approval",
      "Redesigning your company logo every 48 hours"
    ],
    answer: 1,
    explanation: "Creative testing compares different hooks, angles, and visuals under identical conditions so audience data reveals the winner."
  },
  {
    id: 51,
    category: "Paid Advertising",
    question: "Why doesn't increasing ad spend automatically fix a poorly performing ad campaign?",
    options: [
      "Meta limits ad spend to ₹1,000 for accounts under 5 years old",
      "If the target audience is wrong, the creative is weak, or the offer is uncompelling, higher spend only amplifies the wasted budget",
      "Algorithms stop delivering ads when budgets exceed ₹10,000",
      "Ad spend has zero relationship to audience delivery"
    ],
    answer: 1,
    explanation: "Budget amplifies your creative. If an ad doesn't convert at ₹500/day, spending ₹50,000 simply burns cash 100x faster."
  },
  {
    id: 52,
    category: "Paid Advertising",
    question: "Why is 'Chasing Cheap Leads' often a costly beginner mistake?",
    options: [
      "Cheap leads take longer to download as CSV files",
      "A ₹50 lead that never converts is more expensive than a ₹150 lead that becomes a loyal paying customer",
      "Meta charges penalty taxes on leads under ₹100",
      "Cheap leads cannot receive emails"
    ],
    answer: 1,
    explanation: "Lead quality trumps lead quantity. Low-cost leads that have no buying intent or invalid contact info waste sales team time and money."
  },
  {
    id: 53,
    category: "Paid Advertising",
    question: "Why should media buyers avoid judging campaign results within the first 12 to 24 hours?",
    options: [
      "Meta ad servers do not turn on until midnight",
      "The platform's machine learning requires time in the learning phase to gather conversion signals and optimize delivery",
      "Ads are only shown to employees on day one",
      "Campaigns cannot be edited once launched"
    ],
    answer: 1,
    explanation: "Premature modifications reset the learning phase. Algorithms need sufficient data before stable performance metrics emerge."
  },
  {
    id: 54,
    category: "Paid Advertising",
    question: "In the 5-stage paid campaign chain, what is the correct logical flow?",
    options: [
      "Budget & Delivery → Ad Creative → Target Audience → Campaign Objective → Business Goal",
      "Business Goal → Campaign Objective → Target Audience → Ad Creative → Budget & Delivery",
      "Ad Creative → Budget → Business Goal → Audience → Analytics",
      "Target Audience → Budget → Logo Design → Campaign → Objective"
    ],
    answer: 1,
    explanation: "Start with the Business Goal, select the Campaign Objective, define the Target Audience, produce the Ad Creative, and set the Budget & Delivery."
  },
  {
    id: 55,
    category: "Paid Advertising",
    question: "What is a 'Custom Audience' in Meta Ads Manager?",
    options: [
      "An audience randomly selected by artificial intelligence without inputs",
      "An audience built from existing business assets, such as uploaded customer email lists, website visitors tracked by Pixel, or past post engagers",
      "An audience composed exclusively of verified public figures",
      "A list of people who blocked your brand"
    ],
    answer: 1,
    explanation: "Custom audiences allow warm retargeting of existing leads, past website visitors, or people who engaged with your social accounts."
  },
  {
    id: 56,
    category: "Paid Advertising",
    question: "What is the purpose of the Meta Pixel on a client's website?",
    options: [
      "To speed up the website loading time by 50%",
      "To track visitor actions, measure conversions, and build retargeting audiences for ad optimization",
      "To replace the website's payment gateway",
      "To prevent unauthorized screenshots of website images"
    ],
    answer: 1,
    explanation: "The Meta Pixel tracks user behavior on your site (page views, add to cart, purchase) so Meta can optimize ads for actual buyers."
  },
  {
    id: 57,
    category: "Paid Advertising",
    question: "What is the recommended THRM beginner tip before launching any paid campaign?",
    options: [
      "Don't start with 'How much should I spend?' Start with 'What exactly do I want the customer to do?'",
      "Always spend your entire quarterly marketing budget on day 1",
      "Target the entire population of the country to ensure no one is missed",
      "Run ads without text or images"
    ],
    answer: 0,
    explanation: "Clarifying the customer action dictates the objective, audience, landing page, and measurement criteria."
  },
  {
    id: 58,
    category: "Strategy & Capstone",
    question: "What evidence does the THRM Certified Certificate provide on a student's CV or LinkedIn?",
    options: [
      "Proof of attendance at a free 10-minute webinar",
      "Verified evidence of completing 12 rigorous modules, passing the 60-question comprehensive assessment, and mastering practical agency-level social media marketing",
      "A guaranteed job offer at Meta headquarters",
      "Exemption from all college degree requirements"
    ],
    answer: 1,
    explanation: "The THRM certificate validates comprehensive training, practical knowledge, and passing the rigorous 60-question 70% threshold exam."
  },
  {
    id: 59,
    category: "Strategy & Capstone",
    question: "What is the minimum passing score required to earn the THRM Certified credential?",
    options: [
      "50% (30 out of 60 correct)",
      "70% (42 out of 60 correct)",
      "95% (57 out of 60 correct)",
      "100% with no errors"
    ],
    answer: 1,
    explanation: "Students must achieve at least 70% (42 out of 60 questions correct) on the certification assessment to earn the credential."
  },
  {
    id: 60,
    category: "Strategy & Capstone",
    question: "How can students maximize the career impact of their THRM Certified credential?",
    options: [
      "Keep the credential secret from prospective employers",
      "Add the verified credential to their LinkedIn certifications, include their Capstone portfolio on their CV, and cite real case studies in job and internship interviews",
      "Only print it on paper and never share digital credentials",
      "Change their name to match the certificate"
    ],
    answer: 1,
    explanation: "Showcasing the credential on LinkedIn, adding the verification ID to resumes, and presenting real case studies proves job-readiness to employers."
  }
];

// ==========================================
// 3. APPLICATION STATE & LOCALSTORAGE
// ==========================================
const SMM_STORAGE_KEY = 'thrm_smm_cert_state_v3';

let appState = {
  studentName: "Sahil Bijlani",
  completedModules: [], // By default no modules completed (0/12)
  activeModuleId: 1,
  activeSlideIdx: 0,
  examStatus: "not_started", // not_started | in_progress | completed
  examAnswers: {}, // { [questionIdx]: selectedOptionIdx }
  examFlagged: {}, // { [questionIdx]: true/false }
  examCurrentQ: 0,
  examTimeRemaining: 60 * 60, // 60 minutes
  examTimerInterval: null,
  examScore: null,
  examPassed: false,
  certId: "THRM-CSMMP-2026-8942",
  certIssueDate: "October 8, 2026"
};

// Load saved state (User Account or LocalStorage)
function loadSavedState() {
  try {
    // 1. If user is logged in via AuthManager, restore their personal progress!
    if (typeof AuthManager !== 'undefined' && AuthManager.isLoggedIn()) {
      const user = AuthManager.getCurrentUser();
      const userProgress = AuthManager.getUserProgress('social-media-marketing');
      if (userProgress) {
        appState.completedModules = userProgress.completedModules || [];
        appState.activeModuleId = userProgress.activeModuleId || 1;
        appState.examStatus = userProgress.examStatus || "not_started";
        appState.examScore = userProgress.examScore || null;
        appState.examPassed = userProgress.examPassed || false;
        appState.certId = userProgress.certId || ("THRM-CSMMP-2026-" + Math.floor(1000 + Math.random() * 9000));
        appState.certIssueDate = userProgress.certIssueDate || "October 8, 2026";
      } else {
        // Check if there was guest progress to migrate into new account
        const raw = localStorage.getItem(SMM_STORAGE_KEY);
        if (raw) {
          try {
            const guestState = JSON.parse(raw);
            if (guestState) {
              appState.completedModules = guestState.completedModules || [];
              appState.examScore = guestState.examScore || null;
              appState.examPassed = guestState.examPassed || false;
              saveState(); // save to newly created account immediately
            }
          } catch (e) {}
        }
      }
      appState.studentName = user.name || "Student Name";
      return;
    }

    // 2. Otherwise fallback to device session storage
    const raw = localStorage.getItem(SMM_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState = { ...appState, ...parsed };
    }
  } catch (e) {
    console.warn("Could not load state", e);
  }
}

function saveState() {
  try {
    const progressData = {
      completedModules: appState.completedModules,
      activeModuleId: appState.activeModuleId,
      examStatus: appState.examStatus,
      examScore: appState.examScore,
      examPassed: appState.examPassed,
      certId: appState.certId,
      certIssueDate: appState.certIssueDate
    };

    // If user is logged in, save under their user account in DB
    if (typeof AuthManager !== 'undefined' && AuthManager.isLoggedIn()) {
      AuthManager.saveUserProgress('social-media-marketing', progressData);
      AuthManager.renderNavbarAuth();
    }

    // Also persist device session
    localStorage.setItem(SMM_STORAGE_KEY, JSON.stringify({
      studentName: appState.studentName,
      ...progressData
    }));
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

// Subscribe to Auth state changes (Login, Register, Logout)
if (typeof AuthManager !== 'undefined') {
  AuthManager.onAuthStateChange((user) => {
    if (user) {
      loadSavedState();
      renderModulesList();
      updateCertificateUI();
      updateCertificateLockState();
      showToast(`Welcome, ${user.name}! Progress loaded (${appState.completedModules.length}/12 modules).`, true);
    } else {
      // User logged out: clear view and reset to guest
      appState.completedModules = [];
      appState.activeModuleId = 1;
      appState.examStatus = "not_started";
      appState.examScore = null;
      appState.examPassed = false;
      appState.studentName = "Guest Student";
      localStorage.removeItem(SMM_STORAGE_KEY);

      renderModulesList();
      updateCertificateUI();
      updateCertificateLockState();
      showToast("Logged out. Sign in anytime to resume where you left off.", true);
    }
  });
}

// Toast notification helper
function showToast(message, isSuccess = true) {
  let toast = document.getElementById('certToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'certToast';
    toast.className = 'cert-toast';
    document.body.appendChild(toast);
  }
  toast.className = `cert-toast ${isSuccess ? 'success' : ''} show`;
  toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-info'}"></i><span>${message}</span>`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ==========================================
// 4. MODULES & SLIDE DECK VIEWER ENGINE
// ==========================================
function renderModulesList() {
  const container = document.getElementById('modulesContainer');
  if (!container) return;

  container.innerHTML = CURRICULUM_MODULES.map(mod => {
    const isCompleted = appState.completedModules.includes(mod.id);
    const escapedTitle = (mod.title || '').replace(/'/g, "\\'");
    return `
      <div class="module-card-item ${isCompleted ? 'completed' : ''}" id="module-item-${mod.id}">
        <div class="module-left">
          <div class="module-number-badge ${isCompleted ? 'completed-badge' : 'pdf-badge'}">
            <span style="font-size:0.68rem;opacity:0.7">MOD</span>
            <span>${String(mod.id).padStart(2, '0')}</span>
          </div>
          <div class="module-details" onclick="openProtectedPdfViewer('${mod.pdfFileName}', '${escapedTitle}')" style="cursor:pointer;" title="View ${mod.title} on website">
            <h4>${mod.title}</h4>
            <p>${mod.subtitle}</p>
          </div>
        </div>
        <div class="module-actions">
          ${mod.pdfFileName ? `
          <button type="button" class="btn-sm btn-view-pdf" onclick="openProtectedPdfViewer('${mod.pdfFileName}', '${escapedTitle}')" title="View PDF Document (Protected On-Site)">
            <i class="fa-solid fa-file-pdf"></i>
            <span>View PDF</span>
          </button>` : ''}
          <button class="btn-sm btn-check-complete ${isCompleted ? 'done' : ''}" onclick="toggleModuleComplete(${mod.id})">
            <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
            <span>${isCompleted ? 'Done' : 'Mark as done'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  updateProgressIndicator();
}

function updateProgressIndicator() {
  const total = CURRICULUM_MODULES.length;
  const completed = appState.completedModules.length;
  const pct = Math.round((completed / total) * 100);

  const fillEl = document.getElementById('trackProgressFill');
  const countEl = document.getElementById('trackProgressCount');
  const pctEl = document.getElementById('trackProgressPct');

  if (fillEl) fillEl.style.width = `${pct}%`;
  if (countEl) countEl.innerText = `${completed} / ${total} Modules`;
  if (pctEl) pctEl.innerText = `${pct}% Complete`;
}

function toggleModuleComplete(moduleId) {
  const idx = appState.completedModules.indexOf(moduleId);
  if (idx > -1) {
    appState.completedModules.splice(idx, 1);
    showToast(`Module ${moduleId} marked as pending`, false);
  } else {
    appState.completedModules.push(moduleId);
    if (typeof AuthManager !== 'undefined' && AuthManager.isLoggedIn()) {
      showToast(`Module ${moduleId} completed! Saved to your account.`, true);
    } else {
      showToast(`Module ${moduleId} marked as done! (Pass assessment with 70%+ to earn certificate)`, true);
    }
  }
  saveState();
  renderModulesList();
  updateCertificateLockState();
}

// Open slide deck modal
function openSlideDeck(moduleId) {
  const mod = CURRICULUM_MODULES.find(m => m.id === moduleId);
  if (!mod) return;

  appState.activeModuleId = moduleId;
  appState.activeSlideIdx = 0;

  const modal = document.getElementById('slideModalBackdrop');
  if (modal) {
    modal.classList.add('active');
    renderSlideContent();
  }
}

function closeSlideDeck() {
  const modal = document.getElementById('slideModalBackdrop');
  if (modal) modal.classList.remove('active');
}

function renderSlideContent() {
  const mod = CURRICULUM_MODULES.find(m => m.id === appState.activeModuleId);
  if (!mod || !mod.slides || mod.slides.length === 0) return;

  const slide = mod.slides[appState.activeSlideIdx];
  const totalSlides = mod.slides.length;

  // Update top bar
  const titleEl = document.getElementById('slideModalTitle');
  const tagEl = document.getElementById('slideModalTag');
  if (titleEl) titleEl.innerText = mod.title;
  if (tagEl) tagEl.innerText = `Slide ${appState.activeSlideIdx + 1} of ${totalSlides}`;

  // Update PDF direct link in slide modal header if present (opens on-site protected viewer)
  const pdfBtn = document.getElementById('slideModalPdfLink') || document.getElementById('slideModalPdfBtn');
  if (pdfBtn && mod.pdfFileName) {
    pdfBtn.onclick = (e) => {
      e.preventDefault();
      openProtectedPdfForCurrentModule();
    };
  }

  // Update slide body
  const canvas = document.getElementById('slideCanvasPresentation');
  if (canvas) {
    let boxesHtml = '';
    if (slide.boxes && slide.boxes.length > 0) {
      boxesHtml = `
        <div class="slide-columns-row">
          ${slide.boxes.map(box => `
            <div class="slide-box-card ${box.isDark ? 'dark-theme' : ''}">
              <h4>${box.title}</h4>
              <p>${box.text}</p>
              ${box.bullets ? `<ul>${box.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    let calloutHtml = '';
    if (slide.callout) {
      calloutHtml = `
        <div class="slide-callout-strip ${slide.callout.type || 'tip'}">
          <i class="fa-solid fa-lightbulb"></i>
          <div>${slide.callout.text}</div>
        </div>
      `;
    }

    canvas.innerHTML = `
      <div class="slide-header-content">
        <div class="slide-module-kicker">
          <i class="fa-solid fa-layer-group"></i> ${slide.kicker || `Module ${mod.id}`}
        </div>
        <h2 class="slide-heading-main">${slide.title}</h2>
        <p class="slide-lead-desc">${slide.lead || ''}</p>
      </div>
      ${boxesHtml}
      ${calloutHtml}
    `;
  }

  // Update footer navigation
  const prevBtn = document.getElementById('btnPrevSlide');
  const nextBtn = document.getElementById('btnNextSlide');
  const counterBadge = document.getElementById('slideCounterBadge');
  const dotsContainer = document.getElementById('slideProgressDots');

  if (prevBtn) prevBtn.disabled = appState.activeSlideIdx === 0;
  if (nextBtn) nextBtn.disabled = appState.activeSlideIdx === totalSlides - 1;
  if (counterBadge) counterBadge.innerText = `${appState.activeSlideIdx + 1} / ${totalSlides}`;

  if (dotsContainer) {
    dotsContainer.innerHTML = mod.slides.map((_, i) => `
      <div class="slide-dot ${i === appState.activeSlideIdx ? 'active' : ''}" onclick="goToSlide(${i})"></div>
    `).join('');
  }
}

function nextSlide() {
  const mod = CURRICULUM_MODULES.find(m => m.id === appState.activeModuleId);
  if (!mod) return;
  if (appState.activeSlideIdx < mod.slides.length - 1) {
    appState.activeSlideIdx++;
    renderSlideContent();
  }
}

function prevSlide() {
  if (appState.activeSlideIdx > 0) {
    appState.activeSlideIdx--;
    renderSlideContent();
  }
}

function goToSlide(idx) {
  appState.activeSlideIdx = idx;
  renderSlideContent();
}

// ==========================================
// ON-SITE PROTECTED PDF VIEWER (DOWNLOAD DISABLED)
// ==========================================
function injectProtectedPdfModal() {
  if (document.getElementById('thrmProtectedPdfModal')) return;

  const modal = document.createElement('div');
  modal.id = 'thrmProtectedPdfModal';
  modal.className = 'pdf-reader-modal-backdrop';
  modal.innerHTML = `
    <div class="pdf-reader-modal-card" id="pdfReaderModalCard" role="dialog" aria-modal="true">
      <div class="pdf-reader-topbar">
        <div class="pdf-reader-topbar-left">
          <span class="pdf-reader-pill"><i class="fa-solid fa-file-pdf"></i> PDF Document</span>
          <h3 class="pdf-reader-title" id="pdfReaderModalTitle">Course Module</h3>
        </div>
        <div class="pdf-reader-topbar-right">
          <button class="pdf-reader-ctrl-btn" onclick="togglePdfFullscreen()" title="Toggle Fullscreen">
            <i class="fa-solid fa-expand" id="pdfFullscreenIcon"></i>
          </button>
          <button class="pdf-reader-close-btn" onclick="closeProtectedPdfViewer()" aria-label="Close PDF Viewer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="pdf-reader-body" id="pdfReaderContainer" oncontextmenu="return false;">
        <iframe id="pdfReaderIframe" src="" class="pdf-reader-frame" allow="fullscreen"></iframe>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProtectedPdfViewer();
  });
}

function openProtectedPdfViewer(pdfFileName, title) {
  if (!pdfFileName) return;
  injectProtectedPdfModal();
  const modal = document.getElementById('thrmProtectedPdfModal');
  const iframe = document.getElementById('pdfReaderIframe');
  if (iframe) {
    iframe.removeAttribute('sandbox');
  }

  // Remove the watermark tag if present from any previous DOM node
  if (modal) {
    const watermarkTag = modal.querySelector('.pdf-reader-watermark-tag');
    if (watermarkTag) watermarkTag.remove();
  }

  const titleEl = document.getElementById('pdfReaderModalTitle');
  if (titleEl) titleEl.innerText = decodeURIComponent(title || 'Course Module');

  // Load PDF with parameters disabling browser toolbar (hides download & print controls)
  const rawPath = getPdfPath(pdfFileName);
  const securePath = `${rawPath}#toolbar=0&navpanes=0&scrollbar=1`;
  if (iframe) iframe.src = securePath;

  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProtectedPdfViewer() {
  const modal = document.getElementById('thrmProtectedPdfModal');
  const iframe = document.getElementById('pdfReaderIframe');
  if (iframe) iframe.src = 'about:blank';
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function togglePdfFullscreen() {
  const card = document.getElementById('pdfReaderModalCard');
  const icon = document.getElementById('pdfFullscreenIcon');
  if (!card) return;
  card.classList.toggle('fullscreen-mode');
  if (icon) {
    icon.className = card.classList.contains('fullscreen-mode') ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
  }
}

function openProtectedPdfForCurrentModule() {
  const mod = CURRICULUM_MODULES.find(m => m.id === appState.activeModuleId);
  if (mod && mod.pdfFileName) {
    openProtectedPdfViewer(mod.pdfFileName, mod.title);
  }
}

function printCurrentModuleSlides() {
  openProtectedPdfForCurrentModule();
}

// Global protection: Prevent keyboard shortcut save/print inside active reader
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('thrmProtectedPdfModal');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeProtectedPdfViewer();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'S' || e.key === 'P')) {
      e.preventDefault();
      showToast("Download and printing are restricted. Content is limited to THRM EduTech portal only.", false);
    }
  }
});

// ==========================================
// 5. 60-QUESTION CERTIFICATION ASSESSMENT
// ==========================================
function startCertificationExam() {
  appState.examStatus = "in_progress";
  appState.examAnswers = {};
  appState.examFlagged = {};
  appState.examCurrentQ = 0;
  if (appState.examTimerInterval) clearInterval(appState.examTimerInterval);

  document.getElementById('examIntroCard').style.display = 'none';
  document.getElementById('examResultCard').classList.remove('active');
  const workspace = document.getElementById('examWorkspace');
  workspace.classList.add('active');

  renderExamQuestion(0);
  renderQuestionPalette();

  // Scroll smoothly to workspace
  workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startExamTimer() {
  // Time limit removed — self-paced assessment
  if (appState.examTimerInterval) clearInterval(appState.examTimerInterval);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('examTimerDisplay');
  if (!timerEl) return;

  const mins = Math.floor(appState.examTimeRemaining / 60);
  const secs = appState.examTimeRemaining % 60;
  timerEl.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function renderExamQuestion(index) {
  appState.examCurrentQ = index;
  const q = EXAM_QUESTIONS[index];
  if (!q) return;

  const total = EXAM_QUESTIONS.length;
  document.getElementById('examQCounter').innerText = `Question ${index + 1} of ${total}`;
  document.getElementById('examCategoryPill').innerText = q.category;
  document.getElementById('examQuestionText').innerText = q.question;

  const selectedOpt = appState.examAnswers[index];
  const isFlagged = !!appState.examFlagged[index];

  const flagBtn = document.getElementById('examFlagBtn');
  if (flagBtn) {
    flagBtn.innerHTML = `<i class="fa-solid fa-flag"></i> <span>${isFlagged ? 'Flagged' : 'Flag for Review'}</span>`;
    flagBtn.style.color = isFlagged ? '#F59E0B' : 'inherit';
  }

  const optionsList = document.getElementById('examOptionsList');
  const letters = ['A', 'B', 'C', 'D'];
  optionsList.innerHTML = q.options.map((opt, i) => `
    <div class="exam-option-card ${selectedOpt === i ? 'selected' : ''}" onclick="selectExamOption(${index}, ${i})">
      <div class="option-letter">${letters[i]}</div>
      <div class="option-content">${opt}</div>
    </div>
  `).join('');

  // Update Prev / Next buttons
  const prevBtn = document.getElementById('examPrevBtn');
  const nextBtn = document.getElementById('examNextBtn');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    if (index === total - 1) {
      nextBtn.innerHTML = `<span>Review & Submit</span> <i class="fa-solid fa-check-double"></i>`;
    } else {
      nextBtn.innerHTML = `<span>Next Question</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
  }

  renderQuestionPalette();
}

function selectExamOption(qIndex, optIndex) {
  appState.examAnswers[qIndex] = optIndex;
  renderExamQuestion(qIndex);
}

function toggleFlagCurrentQuestion() {
  const cur = appState.examCurrentQ;
  appState.examFlagged[cur] = !appState.examFlagged[cur];
  renderExamQuestion(cur);
}

function nextExamQuestion() {
  if (appState.examCurrentQ < EXAM_QUESTIONS.length - 1) {
    renderExamQuestion(appState.examCurrentQ + 1);
  } else {
    confirmSubmitExam();
  }
}

function prevExamQuestion() {
  if (appState.examCurrentQ > 0) {
    renderExamQuestion(appState.examCurrentQ - 1);
  }
}

function renderQuestionPalette() {
  const palette = document.getElementById('examPaletteGrid');
  if (!palette) return;

  palette.innerHTML = EXAM_QUESTIONS.map((_, i) => {
    const isAnswered = appState.examAnswers[i] !== undefined;
    const isFlagged = !!appState.examFlagged[i];
    const isCurrent = appState.examCurrentQ === i;

    let cls = 'palette-btn';
    if (isCurrent) cls += ' current';
    if (isFlagged) cls += ' flagged';
    else if (isAnswered) cls += ' answered';

    return `<button class="${cls}" onclick="renderExamQuestion(${i})">${i + 1}</button>`;
  }).join('');

  // Update answered count
  const answeredCount = Object.keys(appState.examAnswers).length;
  const countEl = document.getElementById('paletteAnsweredCount');
  if (countEl) countEl.innerText = `${answeredCount} / ${EXAM_QUESTIONS.length} Answered`;
}

function confirmSubmitExam() {
  const answeredCount = Object.keys(appState.examAnswers).length;
  const total = EXAM_QUESTIONS.length;
  const unanswered = total - answeredCount;

  let msg = `You have answered ${answeredCount} of ${total} questions.`;
  if (unanswered > 0) {
    msg += ` You have ${unanswered} unanswered questions.`;
  }
  msg += ` Are you sure you want to finish and submit for grading?`;

  if (confirm(msg)) {
    submitExam();
  }
}

function submitExam() {
  if (appState.examTimerInterval) clearInterval(appState.examTimerInterval);

  let correctCount = 0;
  EXAM_QUESTIONS.forEach((q, i) => {
    if (appState.examAnswers[i] === q.answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
  const passed = percentage >= 70; // 70% threshold

  appState.examScore = {
    correct: correctCount,
    total: EXAM_QUESTIONS.length,
    percentage: percentage
  };
  appState.examPassed = passed;
  appState.examStatus = "completed";
  saveState();

  // Hide workspace, show results
  document.getElementById('examWorkspace').classList.remove('active');
  const resultCard = document.getElementById('examResultCard');
  resultCard.classList.add('active');

  const iconEl = document.getElementById('resultBadgeIcon');
  const titleEl = document.getElementById('resultTitle');
  const scoreNum = document.getElementById('resultScoreNumber');
  const scoreSub = document.getElementById('resultScoreSub');
  const actionBtn = document.getElementById('resultActionBtn');

  if (passed) {
    iconEl.className = 'result-badge-icon pass';
    iconEl.innerHTML = `<i class="fa-solid fa-trophy"></i>`;
    titleEl.innerHTML = `Congratulations! You Passed! <i class="fa-solid fa-trophy text-gold ms-2"></i>`;
    scoreNum.innerText = `${percentage}%`;
    scoreSub.innerText = `You scored ${correctCount} out of 60 questions correctly (Minimum required: 70%). Your THRM Certified certificate is officially unlocked!`;
    actionBtn.innerHTML = `<i class="fa-solid fa-certificate"></i> View & Claim Verified Certificate`;
    actionBtn.onclick = () => switchTab('certificate');
    triggerConfetti();
  } else {
    iconEl.className = 'result-badge-icon fail';
    iconEl.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
    titleEl.innerText = `Assessment Incomplete`;
    scoreNum.innerText = `${percentage}%`;
    scoreSub.innerText = `You scored ${correctCount} out of 60. A minimum score of 70% is required to earn the THRM Certified credential. Review the slide modules and try again.`;
    actionBtn.innerHTML = `<i class="fa-solid fa-arrow-rotate-right"></i> Retake Certification Assessment`;
    actionBtn.onclick = () => startCertificationExam();
  }

  // Update certificate preview & lock state
  updateCertificateUI();
  updateCertificateLockState();

  resultCard.scrollIntoView({ behavior: 'smooth' });
}

// Subtle confetti effect on passing
function triggerConfetti() {
  try {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#F59E0B', '#10B981'];

    (function frame() {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.zIndex = '9999';
      particle.style.width = '10px';
      particle.style.height = '10px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.top = '-10px';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '1';
      particle.style.pointerEvents = 'none';
      particle.style.transition = 'transform 2.5s ease-out, opacity 2.5s ease-out';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = '0';
      }, 20);

      setTimeout(() => particle.remove(), 2600);

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {}
}

// ==========================================
// 6. CERTIFICATE GENERATION, LOCKING & SHARING
// ==========================================

function getCourseProgressPct() {
  const total = CURRICULUM_MODULES.length; // 12
  const completed = (appState.completedModules || []).length;
  return Math.round((completed / total) * 100);
}

function isCertificateUnlocked() {
  const percentage = (typeof appState.examScore === 'object' && appState.examScore !== null)
    ? (appState.examScore.percentage ?? 0)
    : (typeof appState.examScore === 'number' ? appState.examScore : 0);
  return appState.examPassed === true || percentage >= 70;
}

function updateCertificateUI() {
  const nameInput = document.getElementById('certStudentNameInput');
  const nameDisplay = document.getElementById('certRecipientNameDisplay');
  const idDisplay = document.getElementById('certIdDisplay');
  const dateDisplay = document.getElementById('certDateDisplay');

  if (nameInput) {
    nameInput.value = appState.studentName || "Sahil Bijlani";
  }
  if (nameDisplay) {
    nameDisplay.innerText = appState.studentName || "Student Name";
  }
  if (idDisplay) {
    idDisplay.innerText = appState.certId || "THRM-CSMMP-2026-8942";
  }
  if (dateDisplay) {
    dateDisplay.innerText = appState.certIssueDate || "October 8, 2026";
  }

  updateCertificateLockState();
}

function updateCertificateLockState() {
  const unlocked = isCertificateUnlocked();
  const examScorePct = (typeof appState.examScore === 'object' && appState.examScore !== null)
    ? (appState.examScore.percentage ?? 0)
    : (typeof appState.examScore === 'number' ? appState.examScore : 0);
  const hasAttemptedExam = appState.examScore !== null || appState.examStatus === 'completed';

  // 1. Update Tab Button Badges
  const certTabBadges = document.querySelectorAll('#certTabLockBadge, .cert-tab-lock-badge');
  certTabBadges.forEach(badge => {
    if (unlocked) {
      badge.className = 'badge-count badge-unlocked';
      badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Unlocked (${examScorePct}%)`;
    } else {
      badge.className = 'badge-count badge-locked';
      badge.innerHTML = hasAttemptedExam 
        ? `<i class="fa-solid fa-lock"></i> Locked (${examScorePct}% / 70%)`
        : `<i class="fa-solid fa-lock"></i> Locked (Exam Required)`;
    }
  });

  // 2. Update/Inject Lock Banner in Certificate Section
  const previewWrapper = document.getElementById('verification-section');
  if (previewWrapper) {
    let lockBanner = document.getElementById('certLockStatusBanner');
    if (!lockBanner) {
      lockBanner = document.createElement('div');
      lockBanner.id = 'certLockStatusBanner';
      previewWrapper.insertBefore(lockBanner, previewWrapper.firstChild);
    }

    if (unlocked) {
      lockBanner.className = 'cert-lock-banner unlocked';
      lockBanner.innerHTML = `
        <div class="cert-lock-banner-left">
          <div class="cert-lock-icon unlocked">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <h3 style="color:#059669;font-size:1.1rem;font-weight:800;margin:0 0 3px 0;">Official Certificate Unlocked</h3>
            <p style="color:#475569;font-size:0.86rem;margin:0;">
              Assessment successfully passed with <strong>${examScorePct}%</strong> (Minimum required: 70%). You can now customize your legal name and download your verified PDF certificate below.
            </p>
          </div>
        </div>
        <div class="cert-lock-banner-actions">
          <span style="font-size:0.82rem;font-weight:700;color:#059669;background:rgba(16,185,129,0.12);padding:6px 14px;border-radius:9999px;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-shield-halved"></i> Verified &amp; Passed
          </span>
        </div>
      `;
    } else {
      lockBanner.className = 'cert-lock-banner locked';
      const pctTowards70 = Math.min(100, Math.round((examScorePct / 70) * 100));
      const description = hasAttemptedExam
        ? `Your assessment score was <strong>${examScorePct}%</strong>. You must score at least <strong>70%</strong> on the final assessment to unlock and download your official certificate.`
        : `The official certificate is only unlocked after completing the final assessment with a score of at least <strong>70%</strong>. Module completion prepares you for the test.`;

      lockBanner.innerHTML = `
        <div class="cert-lock-banner-left">
          <div class="cert-lock-icon locked">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
              <h3 style="color:#D97706;font-size:1.1rem;font-weight:800;margin:0;">Certificate &amp; PDF Download Locked</h3>
              <span style="font-size:0.75rem;font-weight:800;color:#D97706;background:rgba(245,158,11,0.15);padding:3px 10px;border-radius:9999px;border:1px solid rgba(245,158,11,0.3);">
                Assessment 70%+ Required
              </span>
            </div>
            <p style="color:#64748B;font-size:0.86rem;margin:0 0 8px 0;line-height:1.45;">
              ${description}
            </p>
            <div class="cert-lock-progress-track">
              <div class="cert-lock-progress-bar" style="width:${pctTowards70}%;"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:700;color:#94A3B8;margin-top:4px;">
              <span>Assessment Score: ${hasAttemptedExam ? (examScorePct + '%') : 'Not Yet Taken'}</span>
              <span>Passing Target: 70% Minimum</span>
            </div>
          </div>
        </div>
        <div class="cert-lock-banner-actions">
          <button class="btn btn-primary btn-sm" onclick="switchTab('exam')">
            <i class="fa-solid fa-pen-nib"></i> ${hasAttemptedExam ? 'Retake Assessment' : 'Take Assessment Now'}
          </button>
        </div>
      `;
    }
  }

  // 3. Update Certificate Visual State (Blur & Lock Overlay)
  const certContainer = document.getElementById('thrmCertificatePrintArea');
  if (certContainer) {
    let overlay = document.getElementById('certLockPreviewOverlay');
    const parent = certContainer.parentElement;
    if (parent) parent.style.position = 'relative';

    if (unlocked) {
      certContainer.classList.remove('is-locked');
      if (overlay) overlay.style.display = 'none';
    } else {
      certContainer.classList.add('is-locked');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'certLockPreviewOverlay';
        overlay.className = 'cert-lock-overlay';
        if (parent) parent.appendChild(overlay);
      }
      overlay.style.display = 'flex';
      overlay.innerHTML = `
        <div class="cert-lock-card">
          <div class="cert-lock-card-icon">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h3>Official Certificate Locked</h3>
          <p>
            Complete and pass the final certification assessment with a score of <strong>70% or higher</strong> to unlock your verified credential and download the official PDF.
          </p>
          <div class="cert-lock-card-stats">
            <span class="stat-pill stat-pill-current"><i class="fa-solid fa-square-poll-vertical"></i> Score: ${hasAttemptedExam ? (examScorePct + '%') : 'Not Taken'}</span>
            <span class="stat-pill stat-pill-target"><i class="fa-solid fa-bullseye"></i> 70% Target</span>
          </div>
          <button class="btn-unlock-action" onclick="switchTab('exam')">
            <i class="fa-solid fa-pen-nib"></i> ${hasAttemptedExam ? 'Retake Assessment (Score 70%+)' : 'Take Assessment to Unlock'}
          </button>
        </div>
      `;
    }
  }

  // 4. Update Official Certificate Action Button (On-Site View Only, Download Disabled)
  const printBtns = document.querySelectorAll('.btn-print-cert');
  printBtns.forEach(btn => {
    btn.onclick = viewCertificateOnSite;
    if (unlocked) {
      btn.disabled = false;
      btn.classList.remove('btn-locked');
      btn.innerHTML = `<i class="fa-solid fa-award"></i> <span>View Verified Certificate (On-Site Portal)</span>`;
      btn.title = "View Official Verified Digital Certificate (Hosted on THRM Portal)";
    } else {
      btn.disabled = true;
      btn.classList.add('btn-locked');
      btn.innerHTML = `<i class="fa-solid fa-lock"></i> <span>Certificate Locked (Assessment 70%+ Required)</span>`;
      btn.title = `Locked: You must score at least 70% on the final assessment to unlock certificate`;
    }
  });

  // 5. Disable name editing if locked
  const nameInput = document.getElementById('certStudentNameInput');
  if (nameInput) {
    nameInput.disabled = !unlocked;
    if (!unlocked) {
      nameInput.title = "Pass the assessment with 70%+ to personalize and view certificate";
    } else {
      nameInput.removeAttribute('title');
    }
  }
}

function viewCertificateOnSite() {
  if (!isCertificateUnlocked()) {
    const examScorePct = (typeof appState.examScore === 'object' && appState.examScore !== null)
      ? appState.examScore.percentage
      : null;
    if (examScorePct !== null) {
      showToast(`Certificate is locked! Your assessment score was ${examScorePct}% (70% minimum passing score required).`, false);
    } else {
      showToast(`Certificate is locked! Please take the final assessment and score at least 70% to unlock.`, false);
    }
    return;
  }
  const certEl = document.getElementById('thrmCertificatePrintArea');
  if (certEl) {
    certEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    certEl.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
    certEl.style.boxShadow = '0 0 0 6px rgba(37, 99, 235, 0.35), 0 25px 60px rgba(15, 23, 42, 0.25)';
    setTimeout(() => {
      certEl.style.boxShadow = '';
    }, 2000);
  }
  showToast(`Official Certificate Verified! Credential ID: ${appState.certId}. Authenticated on THRM EduTech portal (download restricted).`, true);
}

const downloadCertificatePdf = viewCertificateOnSite;

function onStudentNameChange(value) {
  if (!isCertificateUnlocked()) return;
  appState.studentName = value.trim() || "Student Name";
  const nameDisplay = document.getElementById('certRecipientNameDisplay');
  if (nameDisplay) nameDisplay.innerText = appState.studentName;
  saveState();
}

function addToLinkedIn() {
  if (!isCertificateUnlocked()) {
    showToast("Certificate locked! Pass the final assessment with 70%+ to claim on LinkedIn.", false);
    return;
  }
  const certName = encodeURIComponent("THRM Certified Social Media Marketing Professional");
  const orgName = encodeURIComponent("THRM EduTech");
  const certUrl = encodeURIComponent("https://thrmdigitalmarketing.in/certifications/verify?id=" + appState.certId);
  const issueYear = "2026";
  const issueMonth = "10";

  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${certUrl}&certId=${appState.certId}`;
  window.open(linkedInUrl, '_blank');
}

function copyCVResumeSnippet() {
  if (!isCertificateUnlocked()) {
    showToast("Certificate locked! Pass the final assessment with 70%+ to unlock CV credential.", false);
    return;
  }
  const snippet = `• THRM Certified Social Media Marketing Professional — THRM EduTech (Score: ${appState.examScore ? appState.examScore.percentage : 88}%, Credential ID: ${appState.certId}). Mastered 12 modules covering Meta Ads Strategy, Organic Growth, Content Architecture, Social SEO & Performance Analytics.`;
  navigator.clipboard.writeText(snippet).then(() => {
    showToast("CV Snippet copied to clipboard! Paste it into your resume.", true);
  }).catch(() => {
    showToast("CV text ready: Check preview card.", true);
  });
}

function verifyCredentialModal() {
  if (!isCertificateUnlocked()) {
    showToast("Credential is still locked. Passing the final assessment with 70%+ is required for official verification.", false);
    return;
  }
  alert(`Credential Status: VERIFIED & ACTIVE\n\nRecipient: ${appState.studentName}\nCredential: THRM Certified Social Media Marketing Professional\nID: ${appState.certId}\nModules Completed: ${appState.completedModules.length}/12\nScore: ${appState.examScore ? appState.examScore.percentage : 88}%\nIssued By: THRM EduTech Academic Board`);
}

// ==========================================
// 7. TAB & FILTER SWITCHING
// ==========================================
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.track-tab-btn');
  tabs.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.querySelector(`.track-tab-btn[data-tab="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const modulesSection = document.getElementById('modulesSectionTab');
  const examSection = document.getElementById('examSectionTab');
  const certSection = document.getElementById('certSectionTab');

  if (modulesSection) modulesSection.style.display = tabName === 'curriculum' ? 'block' : 'none';
  if (examSection) examSection.style.display = tabName === 'exam' ? 'block' : 'none';
  if (certSection) certSection.style.display = tabName === 'certificate' ? 'block' : 'none';
}

function filterCourses(category) {
  const btns = document.querySelectorAll('.cert-filter-btn');
  btns.forEach(b => b.classList.remove('active'));

  const clickedBtn = document.querySelector(`.cert-filter-btn[data-cat="${category}"]`);
  if (clickedBtn) clickedBtn.classList.add('active');

  const cards = document.querySelectorAll('.cert-course-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-cat') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Keyboard shortcuts for slide viewer
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('slideModalBackdrop');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeSlideDeck();
  }
});

// ==========================================
// 8. DYNAMIC COURSES CATALOG LOADER
// ==========================================
async function initDynamicCatalog() {
  const grid = document.getElementById('certCoursesGrid') || document.querySelector('.cert-courses-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/courses');
    if (!res.ok) return;
    const data = await res.json();
    const courses = Array.isArray(data) ? data : (data.courses || []);
    if (!Array.isArray(courses) || courses.length === 0) return;

    const inSub = window.location.pathname.includes('/certifications/');

    grid.innerHTML = courses.map((c, idx) => {
      const numStr = (idx + 1) < 10 ? `0${idx + 1}` : `${idx + 1}`;
      const gradients = ['bg-gradient-purple', 'bg-gradient-blue', 'bg-gradient-dark'];
      const bannerGrad = gradients[idx % gradients.length];
      const targetUrl = c.slug === 'social-media-marketing'
        ? (inSub ? 'social-media-marketing.html' : 'certifications/social-media-marketing.html')
        : (inSub ? `../course.html?slug=${c.slug}` : `course.html?slug=${c.slug}`);

      let topicsList = (c.key_topics || 'Foundations, Strategy, Execution, Optimization, Analytics')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // Clean up duration so it does not repeat modules count
      const cleanDuration = (c.duration || 'Self-Paced').replace(/\s*\(\d+\s*Modules?\)/i, '').trim();
      const cleanModules = c.module_count || (c.duration && c.duration.match(/(\d+)\s*Modules?/i) ? c.duration.match(/(\d+)\s*Modules?/i)[1] : 12);

      return `
        <div class="track-card-flip-wrap">
          <div class="track-card-inner">
            <!-- FRONT FACE -->
            <div class="track-card card-face-front">
              <div class="track-banner ${bannerGrad}">
                <span class="track-level">COURSE ${numStr}</span>
                <i class="fa-solid fa-hashtag track-bg-icon"></i>
              </div>
              <div class="track-body">
                <div class="cert-card-main-content">
                  <h3 class="track-title">${c.title}</h3>
                  <div class="cert-meta-tags">
                    <span class="cert-meta-tag"><i class="fa-regular fa-clock"></i> ${cleanDuration}</span>
                    <span class="cert-meta-tag"><i class="fa-solid fa-layer-group"></i> ${cleanModules} Modules</span>
                    <span class="cert-meta-tag"><i class="fa-solid fa-signal"></i> ${c.level || 'All Levels'}</span>
                  </div>
                  <p class="track-desc">${c.description || c.subtitle || ''}</p>
                  <ul class="course-feature-list">
                    ${topicsList.slice(0, 3).map(top => `<li><i class="fa-solid fa-check"></i> ${top}</li>`).join('')}
                  </ul>
                </div>
                <div class="cert-card-bottom">
                  <span class="iso-badge">
                    <i class="fa-solid fa-award"></i> ISO Certified
                  </span>
                  <span class="flip-hint" title="Click to view syllabus">
                    <span>View Syllabus</span> <i class="fa-solid fa-arrows-rotate"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- BACK FACE -->
            <div class="track-card card-face-back">
              <div class="track-banner ${bannerGrad}">
                <span class="track-level">SYLLABUS &amp; OUTCOMES</span>
                <i class="fa-solid fa-graduation-cap track-bg-icon"></i>
              </div>
              <div class="track-body">
                <div>
                  <h3 class="track-title">Curriculum Highlights</h3>
                  <ul class="course-syllabus-list">
                    ${topicsList.map(top => `<li><i class="fa-solid fa-check-circle"></i> ${top}</li>`).join('')}
                    <li><i class="fa-solid fa-award text-gold"></i> Final Assessment (70% Pass Benchmark)</li>
                  </ul>
                </div>
                <div class="track-footer">
                  <a href="${targetUrl}" class="btn btn-primary magnetic-btn w-100 text-center">
                    <span>Explore Full Curriculum</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Wire flip handlers on dynamic cards
    grid.querySelectorAll('.track-card-flip-wrap').forEach(wrap => {
      wrap.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          wrap.classList.toggle('flipped');
        }
      });
    });
  } catch (err) {
    console.warn("Could not load dynamic courses catalog", err);
  }
}

// ==========================================
// 9. LIVE SYNC CURRICULUM FROM DATABASE
// ==========================================
async function syncCurriculumFromApi() {
  try {
    const res = await fetch('/api/courses/social-media-marketing');
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && data.course) {
      const c = data.course;
      if (c.title) {
        const titleEl = document.querySelector('.track-main-info h2');
        if (titleEl) titleEl.innerText = c.title;
        const certTitleEl = document.getElementById('certAwardTitleDisplay');
        if (certTitleEl && c.cert_title) certTitleEl.innerText = c.cert_title;
      }
      if (Array.isArray(c.modules) && c.modules.length > 0) {
        c.modules.forEach(m => {
          const modId = m.module_num || m.id;
          const existing = CURRICULUM_MODULES.find(mod => mod.id === modId);
          if (existing) {
            existing.title = m.title;
            existing.subtitle = m.subtitle;
          }
        });
        renderModulesList();
      }
      if (Array.isArray(c.questions) && c.questions.length > 0) {
        c.questions.forEach((q, idx) => {
          if (EXAM_QUESTIONS[idx]) {
            EXAM_QUESTIONS[idx].question = q.question;
            if (Array.isArray(q.options) && q.options.length > 0) {
              EXAM_QUESTIONS[idx].options = q.options;
            }
            if (q.answer_index !== undefined) {
              EXAM_QUESTIONS[idx].answer = q.answer_index;
            }
          }
        });
      }
    }
  } catch (e) {
    // offline mode fallback
  }
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  renderModulesList();
  updateCertificateUI();
  initDynamicCatalog();
  syncCurriculumFromApi();

  // Tab buttons click listeners
  document.querySelectorAll('.track-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // Filter buttons click listeners
  document.querySelectorAll('.cert-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      filterCourses(cat);
    });
  });

  // Mobile & Touch 3D Flip Card Click Handler
  const flipWrappers = document.querySelectorAll('.track-card-flip-wrap');
  flipWrappers.forEach(wrap => {
    wrap.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        wrap.classList.toggle('flipped');
      }
    });
  });

  // Handle URL hash direct tab selection (e.g. #exam or #certificate)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (['curriculum', 'exam', 'certificate'].includes(hash)) {
      switchTab(hash);
    }
  }
});
