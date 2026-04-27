export type PricingPlan = { name: string; price: string; interval: string; desc: string; features: string[]; popular: boolean; };
export type TechStackItem = { name: string; icon: string; };
export type ServiceData = { slug: string; title: string; tagline: string; description: string; iconKey: "web"|"cart"|"mobile"|"design"|"ai"|"data"|"cloud"|"shield"|"search"|"chat"; colorGradient: string; themeColor: "cyan"|"emerald"|"fuchsia"|"indigo"|"amber"|"rose"; deliverables: string[]; techStack: TechStackItem[]; pricingPlans: PricingPlan[]; };

const T_CYAN = { colorGradient: "from-cyan-400 via-blue-500 to-indigo-600", themeColor: "cyan" as const };
const T_EMERALD = { colorGradient: "from-emerald-400 via-teal-500 to-cyan-500", themeColor: "emerald" as const };
const T_FUCHSIA = { colorGradient: "from-fuchsia-400 via-purple-500 to-pink-500", themeColor: "fuchsia" as const };
const T_INDIGO = { colorGradient: "from-indigo-400 via-violet-500 to-purple-500", themeColor: "indigo" as const };
const T_AMBER = { colorGradient: "from-amber-400 via-orange-500 to-red-500", themeColor: "amber" as const };
const T_ROSE = { colorGradient: "from-rose-400 via-red-500 to-orange-500", themeColor: "rose" as const };

// --- THE 40 EXACT SERVICES (UK/US OFFSHORE ARBITRAGE RATES) ---
export const servicesConfig: ServiceData[] = [
  // --- WEB & SOFTWARE ---
  {
    slug: "custom-websites", title: "Custom Websites", tagline: "Fast, beautiful websites built to grow your business.", description: "We build custom websites that load instantly, rank well on Google, and are perfectly designed to match your brand.", iconKey: "web", ...T_CYAN,
    deliverables: ["Custom UI/UX Wireframing", "Responsive Frontend Dev", "CMS Integration", "Speed Optimization"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"React",icon:"⚛️"},{name:"WordPress",icon:"📝"},{name:"Tailwind",icon:"🌊"},{name:"Framer",icon:"✨"},{name:"Vercel",icon:"☁️"}],
    pricingPlans: [
      { name: "Business Site", price: "$1,500", interval: "starting at", desc: "A clean, professional website to get your business online.", features: ["5-Page Custom Design", "Mobile Optimization", "Basic SEO Setup", "Contact Forms"], popular: false },
      { name: "Premium Platform", price: "$4,500", interval: "starting at", desc: "A larger website with advanced features for growing companies.", features: ["Up to 15 Pages", "CMS Blog Integration", "Smooth Animations", "Advanced SEO Setup", "1 Month Support"], popular: true },
      { name: "Enterprise Portal", price: "$10k+", interval: "tailored scope", desc: "Massive websites for large corporations.", features: ["100+ Pages Architecture", "Multi-Language Support", "Custom API Integrations", "Custom SLA", "24/7 Support"], popular: false }
    ]
  },
  {
    slug: "ecommerce", title: "E-Commerce Stores", tagline: "Online stores designed to sell more products.", description: "We build fast, secure online stores that make it easy for your customers to buy and easy for you to manage inventory.", iconKey: "cart", ...T_EMERALD,
    deliverables: ["Custom Storefront Design", "Payment Gateway Setup", "Inventory Management", "Abandoned Cart Logic"],
    techStack: [{name:"Shopify",icon:"🛍️"},{name:"WooCommerce",icon:"🛒"},{name:"Stripe API",icon:"💳"},{name:"Next.js",icon:"▲"},{name:"Node.js",icon:"🟩"},{name:"PostgreSQL",icon:"🐘"}],
    pricingPlans: [
      { name: "Store Setup", price: "$2,500", interval: "starting at", desc: "A great starting point for selling products online.", features: ["Premium Theme Setup", "Stripe & PayPal Config", "Up to 50 Products", "Standard Shipping Rules"], popular: false },
      { name: "Custom E-Commerce", price: "$7,500", interval: "starting at", desc: "A highly customized store for serious sellers.", features: ["Custom UI/UX Design", "Smart Product Search", "Abandoned Cart Emails", "CRM Integration", "Priority Support"], popular: true },
      { name: "Headless Retail", price: "$18k+", interval: "tailored scope", desc: "Lightning-fast decoupled architecture for massive brands.", features: ["Next.js Frontend", "ERP/Warehouse Sync", "Multi-Currency APIs", "Custom SLA", "24/7 Response"], popular: false }
    ]
  },
  {
    slug: "ios-apps", title: "Mobile Apps (iOS)", tagline: "High-quality Apple mobile apps.", description: "We design and build smooth, easy-to-use apps specifically for iPhones and iPads that your customers will love.", iconKey: "mobile", ...T_FUCHSIA,
    deliverables: ["Native iOS Development", "App Store Optimization", "Push Notifications", "Apple Pay Setup"],
    techStack: [{name:"Swift",icon:"🍎"},{name:"React Native",icon:"📱"},{name:"Flutter",icon:"🦋"},{name:"Node.js",icon:"🟩"},{name:"Firebase",icon:"🔥"},{name:"GraphQL",icon:"📊"}],
    pricingPlans: [
      { name: "MVP App", price: "$3,500", interval: "starting at", desc: "A simple, clean app to get your idea on the App Store.", features: ["Core App Features", "Apple Sign-In", "Clean UI Design", "App Store Submission"], popular: false },
      { name: "Professional App", price: "$9,500", interval: "starting at", desc: "A feature-rich app built for thousands of active users.", features: ["Smooth Animations", "In-App Purchases", "Push Notifications", "Admin Control Panel", "3 Months Support"], popular: true },
      { name: "Enterprise App", price: "$25k+", interval: "tailored scope", desc: "Apps designed for millions of users and big companies.", features: ["Dedicated iOS Team", "Complex Features", "Zero-Downtime Backend", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "android-apps", title: "Mobile Apps (Android)", tagline: "Smooth and reliable Android mobile apps.", description: "We build great Android apps that work perfectly on all shapes and sizes of phones and tablets.", iconKey: "mobile", ...T_INDIGO,
    deliverables: ["Native Android Dev", "Google Play Optimization", "Hardware Integration", "Offline Capabilities"],
    techStack: [{name:"Kotlin",icon:"🤖"},{name:"React Native",icon:"📱"},{name:"Flutter",icon:"🦋"},{name:"Node.js",icon:"🟩"},{name:"Firebase",icon:"🔥"},{name:"GraphQL",icon:"📊"}],
    pricingPlans: [
      { name: "MVP App", price: "$3,500", interval: "starting at", desc: "A clean, simple app ready for the Google Play Store.", features: ["Core App Features", "Google Login", "Material Design UI", "Play Store Submission"], popular: false },
      { name: "Professional App", price: "$9,500", interval: "starting at", desc: "A large app with advanced features and smooth performance.", features: ["Hardware Connections", "In-App Subscriptions", "Push Notifications", "Admin Control Panel", "3 Months Support"], popular: true },
      { name: "Enterprise App", price: "$25k+", interval: "tailored scope", desc: "Apps built for huge companies and massive user bases.", features: ["Dedicated Android Team", "Company Security Rules", "Zero-Downtime Backend", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "saas", title: "Custom Software (SaaS)", tagline: "Software platforms you can sell as subscriptions.", description: "Turn your idea into a real software business. We build secure platforms with user logins and automatic monthly billing.", iconKey: "web", ...T_AMBER,
    deliverables: ["Multi-Tenant Architecture", "Stripe Subscription Logic", "Role-Based Access Control", "Analytics Dashboard"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"TypeScript",icon:"📘"},{name:"Prisma",icon:"◬"},{name:"PostgreSQL",icon:"🐘"},{name:"Stripe API",icon:"💳"},{name:"AWS",icon:"☁️"}],
    pricingPlans: [
      { name: "SaaS MVP", price: "$5,000", interval: "starting at", desc: "A working version 1.0 to start getting paying customers.", features: ["Database Setup", "Core App Features", "Secure User Login", "Basic Stripe Setup"], popular: false },
      { name: "Production SaaS", price: "$15,000", interval: "starting at", desc: "A highly-scalable software built for thousands of users.", features: ["Advanced User Roles", "Complex Billing/Invoices", "Fast User Dashboard", "High Security", "Priority Support"], popular: true },
      { name: "Enterprise System", price: "$35k+", interval: "tailored scope", desc: "Massive software to replace old systems at big companies.", features: ["Dedicated Coding Team", "Legacy Data Migration", "Strict Compliance", "Custom SLA", "24/7 Tech Support"], popular: false }
    ]
  },
  {
    slug: "landing-pages", title: "Landing Pages", tagline: "Single pages designed to turn visitors into customers.", description: "Running paid ads? We build simple, fast single-page websites designed specifically to get people to buy or call you.", iconKey: "web", ...T_ROSE,
    deliverables: ["Sales-Focused Design", "Copywriting Architecture", "CRM Integrations", "Sub-second Loading"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"React",icon:"⚛️"},{name:"Framer Motion",icon:"✨"},{name:"Tailwind",icon:"🌊"},{name:"HubSpot",icon:"🧲"},{name:"Vercel",icon:"☁️"}],
    pricingPlans: [
      { name: "Standard Funnel", price: "$600", interval: "starting at", desc: "A clean, fast page designed to capture emails and leads.", features: ["Custom UI Design", "Mobile Responsiveness", "Contact Form Setup", "Basic Analytics"], popular: false },
      { name: "High-Ticket Funnel", price: "$1,800", interval: "starting at", desc: "A high-end page with animations and sales tracking.", features: ["Smooth Animations", "Sales Copywriting", "Advanced Tracking", "CRM Integration", "A/B Testing Setup"], popular: true },
      { name: "Campaign Fleet", price: "Custom", interval: "tailored scope", desc: "Dozens of different pages for large advertising campaigns.", features: ["Programmatic Generation", "Dynamic Keywords", "Dedicated Strategist", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "ui-ux", title: "UI/UX Design", tagline: "Beautiful and easy-to-use digital designs.", description: "We make sure your app or website looks beautiful and is incredibly easy for your customers to figure out and use.", iconKey: "design", ...T_CYAN,
    deliverables: ["User Journey Mapping", "Clickable Prototypes", "Design System Creation", "Developer Handoff"],
    techStack: [{name:"Figma",icon:"🎨"},{name:"Framer",icon:"✨"},{name:"Spline 3D",icon:"🧊"},{name:"Webflow",icon:"🕸️"},{name:"Adobe XD",icon:"🖌️"},{name:"Tailwind",icon:"🌊"}],
    pricingPlans: [
      { name: "Design Refresh", price: "$1,000", interval: "starting at", desc: "Update your current app or website with a modern look.", features: ["UI Audit", "New Colors & Fonts", "Up to 5 Key Screens", "Figma Handoff"], popular: false },
      { name: "Full App Design", price: "$3,500", interval: "starting at", desc: "A complete design for a brand new app or software idea.", features: ["User Flow Architecture", "Clickable Prototype", "Complete Design System", "Developer Docs", "3 Revision Rounds"], popular: true },
      { name: "Ongoing Designer", price: "$2,000+", interval: "per month", desc: "A dedicated designer for companies constantly building.", features: ["Dedicated Lead Designer", "A/B Testing Analysis", "Multiple Product Lines", "Strategy Meetings", "Unlimited Scaling"], popular: false }
    ]
  },
  {
    slug: "portfolios", title: "Corporate Portfolios", tagline: "Showcase your work with a beautiful digital portfolio.", description: "We build stunning, premium websites for agencies, real estate, and creative firms to show off their best work.", iconKey: "web", ...T_EMERALD,
    deliverables: ["High-Res Galleries", "WebGL Transitions", "Headless CMS Admin", "Responsive Architecture"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"Three.js",icon:"🧊"},{name:"WebGL",icon:"🕸️"},{name:"Sanity CMS",icon:"📝"},{name:"Framer",icon:"✨"},{name:"Vercel",icon:"☁️"}],
    pricingPlans: [
      { name: "Basic Portfolio", price: "$1,500", interval: "starting at", desc: "A sleek, simple portfolio for individuals and small firms.", features: ["Custom Gallery Look", "Mobile Responsiveness", "Contact Form", "Basic Admin Panel"], popular: false },
      { name: "Premium Animated", price: "$4,500", interval: "starting at", desc: "A stunning, highly animated website that drops jaws.", features: ["Smooth Page Transitions", "Scroll Animations", "Headless CMS Setup", "Video Compression", "Priority Support"], popular: true },
      { name: "Large Media Platform", price: "$10k+", interval: "tailored scope", desc: "Massive media websites for global creative agencies.", features: ["Global Image CDN", "Custom Video Players", "Advanced Search", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },

  // --- AI & AUTOMATION ---
  {
    slug: "automation", title: "Business Automation", tagline: "Stop doing manual computer work.", description: "We make your different software tools talk to each other so things like emails, invoices, and data entry happen automatically.", iconKey: "ai", ...T_INDIGO,
    deliverables: ["API Integrations", "n8n/Zapier Pipelines", "Automated Data Entry", "Invoice OCR Processing"],
    techStack: [{name:"Python",icon:"🐍"},{name:"Node.js",icon:"🟩"},{name:"n8n",icon:"⚙️"},{name:"Zapier",icon:"⚡"},{name:"Make.com",icon:"🟣"},{name:"REST APIs",icon:"🔌"}],
    pricingPlans: [
      { name: "One-Time Automation", price: "$800", interval: "one-time", desc: "Automate a single, boring task you hate doing every day.", features: ["Process Audit", "Connect up to 3 Apps", "Error Handling Logic", "Instruction Manual"], popular: false },
      { name: "Monthly Automation", price: "$1,500", interval: "per month", desc: "We actively look for slow tasks and automate them.", features: ["Unlimited Integrations", "Custom Python Scripts", "Efficiency Reporting", "Priority Support", "Dedicated Slack"], popular: true },
      { name: "Enterprise Systems", price: "Custom", interval: "tailored scope", desc: "Massive automated data systems for big companies.", features: ["Custom Internal Tools", "Legacy System Bridging", "Strict Security Rules", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "chatbots", title: "AI Chatbots", tagline: "Smart customer service bots that work 24/7.", description: "We build custom AI bots trained on your company's own documents to answer customer questions and capture leads.", iconKey: "chat", ...T_FUCHSIA,
    deliverables: ["OpenAI API Setup", "Vector Database RAG", "Website Widget UI", "Human-Handoff Trigger"],
    techStack: [{name:"OpenAI API",icon:"🧠"},{name:"LangChain",icon:"🔗"},{name:"Pinecone",icon:"🌲"},{name:"Python",icon:"🐍"},{name:"Next.js",icon:"▲"},{name:"FastAPI",icon:"⚡"}],
    pricingPlans: [
      { name: "Support Bot MVP", price: "$1,500", interval: "starting at", desc: "A smart assistant trained on your website's FAQ.", features: ["OpenAI Connection", "Basic Data Scraping", "Website Chat Box", "Prompt Tuning"], popular: false },
      { name: "AI Sales Engineer", price: "$4,500", interval: "starting at", desc: "A highly advanced bot that captures leads and reads PDFs.", features: ["Smart Document Search", "CRM Lead Sync", "Human-Handoff Logic", "3 Months Tuning", "Priority Support"], popular: true },
      { name: "Enterprise Fleet", price: "$12k+", interval: "tailored scope", desc: "Different bots for HR, Sales, and Customer Support.", features: ["Private AI Servers", "Strict Data Privacy", "Custom Model Fine-Tuning", "Custom SLA", "24/7 Support"], popular: false }
    ]
  },
  {
    slug: "machine-learning", title: "Machine Learning", tagline: "Use your data to predict what happens next.", description: "We build advanced AI programs that look at your company's data to predict trends, understand images, and give recommendations.", iconKey: "ai", ...T_AMBER,
    deliverables: ["Predictive Analytics", "Computer Vision", "Data Cleansing Pipelines", "Custom Model Training"],
    techStack: [{name:"Python",icon:"🐍"},{name:"PyTorch",icon:"🔥"},{name:"TensorFlow",icon:"⚙️"},{name:"AWS SageMaker",icon:"☁️"},{name:"Pandas",icon:"🐼"},{name:"Snowflake",icon:"❄️"}],
    pricingPlans: [
      { name: "Model Prototype", price: "$4,000", interval: "starting at", desc: "Test your idea to see if AI can actually solve your problem.", features: ["Data Structuring", "Basic Model Training", "API Endpoint Setup", "Accuracy Testing"], popular: false },
      { name: "Production AI", price: "$12,000", interval: "starting at", desc: "A powerful AI tool ready to be used by your customers.", features: ["Advanced AI Training", "Cloud GPU Servers", "Continuous Learning", "Load Balancing", "Priority Support"], popular: true },
      { name: "Large Data Platform", price: "Custom", interval: "tailored scope", desc: "Massive AI systems for enterprise data processing.", features: ["Dedicated AI Experts", "On-Premise Deployment", "Strict Data Rules", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "crm", title: "Sales Systems (CRM)", tagline: "Control your sales process perfectly.", description: "We build or customize Sales Software (like HubSpot or Salesforce) to perfectly match exactly how your team sells.", iconKey: "data", ...T_ROSE,
    deliverables: ["Sales Funnel Mapping", "Automated Lead Scoring", "Email Tracking", "Executive Dashboards"],
    techStack: [{name:"Salesforce",icon:"☁️"},{name:"HubSpot",icon:"🧲"},{name:"PostgreSQL",icon:"🐘"},{name:"Next.js",icon:"▲"},{name:"Prisma",icon:"◬"},{name:"Node.js",icon:"🟩"}],
    pricingPlans: [
      { name: "CRM Setup", price: "$2,500", interval: "starting at", desc: "Professional setup of HubSpot or Salesforce for your team.", features: ["Data Import & Cleanup", "Sales Steps Setup", "Basic Email Automation", "Team Onboarding"], popular: false },
      { name: "Custom CRM Build", price: "$12,000", interval: "starting at", desc: "A bespoke sales tool built from scratch just for you.", features: ["Custom DB Architecture", "No Monthly SaaS Fees", "Advanced Sales Charts", "Third-Party APIs", "Priority Support"], popular: true },
      { name: "Global Enterprise", price: "Custom", interval: "tailored scope", desc: "Massive sales tools for thousands of salespeople worldwide.", features: ["Dedicated Coding Team", "Legacy Data Migration", "Strict Security Rules", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "erp", title: "Business Systems (ERP)", tagline: "One software to run your entire company.", description: "We build massive systems that connect your warehouse, human resources, accounting, and sales all into one single program.", iconKey: "data", ...T_CYAN,
    deliverables: ["Inventory Tracking", "HR & Payroll Logic", "Manager Approval Flows", "Legacy Migration"],
    techStack: [{name:"PostgreSQL",icon:"🐘"},{name:"Node.js",icon:"🟩"},{name:"Next.js",icon:"▲"},{name:"Docker",icon:"🐳"},{name:"AWS",icon:"☁️"},{name:"TypeScript",icon:"📘"}],
    pricingPlans: [
      { name: "Module MVP", price: "$8,500", interval: "starting at", desc: "A working tool focused on fixing just one department first.", features: ["Database Setup", "Core Programming", "Clean Design", "Standard Security"], popular: false },
      { name: "Full Production", price: "$25,000", interval: "starting at", desc: "A large software that runs multiple departments.", features: ["Multiple Departments", "Financial Integrations", "Strict Permissions", "Fast Loading", "3 Months Support"], popular: true },
      { name: "Enterprise Software", price: "Custom", interval: "tailored scope", desc: "Replacing massive old systems for global supply chains.", features: ["Dedicated Engineering", "Zero-Downtime Update", "Strict Compliance", "Custom SLA", "24/7 Tech Support"], popular: false }
    ]
  },
  {
    slug: "api", title: "API Development", tagline: "Connect your different software tools together.", description: "We build secure data bridges so your website, mobile app, and internal company software can all share information instantly.", iconKey: "web", ...T_EMERALD,
    deliverables: ["REST/GraphQL Design", "OAuth2 Secure Logins", "Rate Limiting", "Swagger Documentation"],
    techStack: [{name:"Node.js",icon:"🟩"},{name:"GraphQL",icon:"📊"},{name:"PostgreSQL",icon:"🐘"},{name:"Redis",icon:"⚡"},{name:"AWS Gateway",icon:"☁️"},{name:"Swagger",icon:"📘"}],
    pricingPlans: [
      { name: "Basic Endpoints", price: "$2,000", interval: "starting at", desc: "Simple connections to let two programs talk to each other.", features: ["Up to 15 Endpoints", "Standard JWT Auth", "Basic Error Handling", "Postman Docs"], popular: false },
      { name: "Robust Platform", price: "$7,500", interval: "starting at", desc: "A fast, powerful setup built to handle mobile apps.", features: ["GraphQL Architecture", "Advanced Rate Limiting", "Webhooks Integration", "Automated Testing", "Priority Support"], popular: true },
      { name: "Enterprise Gateway", price: "Custom", interval: "tailored scope", desc: "Massive data routing for global finance or health apps.", features: ["Microservices Routing", "Military-Grade Encryption", "Zero-Downtime Scaling", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "analytics", title: "Data Dashboards", tagline: "Turn confusing numbers into clear, easy charts.", description: "We gather all your messy business data from different tools and put it into one beautiful, easy-to-read screen for your managers.", iconKey: "data", ...T_FUCHSIA,
    deliverables: ["Data Pipeline Setup", "Custom Visualizations", "Data Cleansing", "Predictive Trend Modeling"],
    techStack: [{name:"Python",icon:"🐍"},{name:"Snowflake",icon:"❄️"},{name:"Tableau",icon:"📈"},{name:"PostgreSQL",icon:"🐘"},{name:"Apache Airflow",icon:"⚙️"},{name:"AWS",icon:"☁️"}],
    pricingPlans: [
      { name: "Data Review", price: "$1,500", interval: "one-time", desc: "A deep dive into your current data to see what we can build.", features: ["Data Source Audit", "KPI Definition", "Software Recommendations", "Strategic Roadmap"], popular: false },
      { name: "Custom Dashboard", price: "$7,000", interval: "starting at", desc: "A live screen showing your company's most important numbers.", features: ["ETL Pipeline Setup", "Custom Charts UI", "Automated Daily Sync", "Role-Based Access", "Priority Support"], popular: true },
      { name: "Enterprise Data Lake", price: "Custom", interval: "tailored scope", desc: "Massive data collection for big international companies.", features: ["Snowflake/Redshift Arch", "Machine Learning Prep", "Strict Privacy Rules", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "modernization", title: "System Updates & Rebuilds", tagline: "Replace your old, slow, outdated software.", description: "Running your business on 15-year-old code? We safely rebuild your old systems into modern, fast, and secure web applications.", iconKey: "ai", ...T_INDIGO,
    deliverables: ["Zero-Downtime Migration", "Codebase Refactoring", "Database Upgrades", "Fresh UI/UX Design"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"Node.js",icon:"🟩"},{name:"Docker",icon:"🐳"},{name:"PostgreSQL",icon:"🐘"},{name:"TypeScript",icon:"📘"},{name:"AWS",icon:"☁️"}],
    pricingPlans: [
      { name: "Old System Review", price: "$2,500", interval: "one-time", desc: "We look at your old code and create a safe step-by-step plan.", features: ["Codebase Analysis", "Security Vulnerability Scan", "Database Review", "Migration Roadmap"], popular: false },
      { name: "Full System Rebuild", price: "$18,000", interval: "starting at", desc: "We completely rebuild your old software using modern tools.", features: ["Modern Fast Code", "Move Data Safely", "Fresh New Design", "Automated Testing", "3 Months Support"], popular: true },
      { name: "Large Scale Update", price: "Custom", interval: "tailored scope", desc: "Huge, multi-year projects for banks and hospitals.", features: ["Dedicated Coding Team", "Update Without Offline Time", "Strict Security Rules", "Custom SLA", "24/7 Support"], popular: false }
    ]
  },

  // --- CLOUD, INFRA & DEVOPS ---
  {
    slug: "hosting", title: "Secure Server Hosting", tagline: "Keep your website online, no matter what.", description: "We provide highly secure, fast servers that automatically grow to handle huge amounts of visitors without crashing.", iconKey: "cloud", ...T_AMBER,
    deliverables: ["Auto-Scaling Architecture", "DDoS Hacker Protection", "Daily Backups", "SSL/Domain Setup"],
    techStack: [{name:"AWS",icon:"☁️"},{name:"Google Cloud",icon:"🌩️"},{name:"Vercel",icon:"▲"},{name:"Cloudflare",icon:"🛡️"},{name:"Linux",icon:"🐧"},{name:"Nginx",icon:"⚙️"}],
    pricingPlans: [
      { name: "Basic Hosting", price: "$150", interval: "per month", desc: "Fast, reliable servers for professional company websites.", features: ["99.9% Uptime", "Daily Safe Backups", "SSL Certificate", "Basic Hacker Shield"], popular: false },
      { name: "High-Traffic Cloud", price: "$650", interval: "per month", desc: "Servers that automatically get stronger when you get busy.", features: ["Load Balancing", "Advanced DDoS Shield", "Global CDN Loading", "Priority Support", "Weekly Security Scans"], popular: true },
      { name: "Private Servers", price: "Custom", interval: "per month", desc: "Your own private, isolated servers for maximum security.", features: ["Dedicated Private Servers", "Multi-Region Backup", "Strict Security Rules", "Custom SLA", "24/7 Expert Help"], popular: false }
    ]
  },
  {
    slug: "devops", title: "Automatic Updates (DevOps)", tagline: "Update your app instantly without breaking it.", description: "We set up tools that automatically test your programmers' code and push it live to your users safely and instantly.", iconKey: "cloud", ...T_ROSE,
    deliverables: ["CI/CD Pipeline Setup", "Docker Containerization", "Automated Testing Loops", "Server Config Rules"],
    techStack: [{name:"GitHub Actions",icon:"⚙️"},{name:"Docker",icon:"🐳"},{name:"Kubernetes",icon:"☸️"},{name:"Terraform",icon:"🏗️"},{name:"AWS",icon:"☁️"},{name:"Linux",icon:"🐧"}],
    pricingPlans: [
      { name: "Basic Pipeline", price: "$2,000", interval: "starting at", desc: "Set up your code files to go live to users automatically.", features: ["GitHub Actions Setup", "Basic Auto-Checks", "Staging Environment", "Instruction Docs"], popular: false },
      { name: "Monthly Server Mgt", price: "$1,500", interval: "per month", desc: "We act as your dedicated server and update team.", features: ["Constant Tool Updates", "Lower Server Bills", "Crash Monitoring", "Fast Emergency Help", "Direct Team Chat"], popular: true },
      { name: "Enterprise Kubernetes", price: "Custom", interval: "tailored scope", desc: "Managing massive server setups for huge applications.", features: ["Dedicated SRE Team", "Zero-Downtime Rollbacks", "Military-Grade Compliance", "Custom SLA", "24/7 Crash Response"], popular: false }
    ]
  },
  {
    slug: "serverless", title: "Modern Cloud Apps", tagline: "Infinite growth. Zero server worries.", description: "We build modern apps that don't need traditional servers. They grow automatically, and you only pay for exactly what you use.", iconKey: "cloud", ...T_CYAN,
    deliverables: ["AWS Lambda Dev", "Edge Computing Setup", "Micro-Billing Sync", "API Gateway Config"],
    techStack: [{name:"AWS Lambda",icon:"☁️"},{name:"Vercel",icon:"▲"},{name:"Node.js",icon:"🟩"},{name:"DynamoDB",icon:"⚡"},{name:"Serverless",icon:"⚙️"},{name:"TypeScript",icon:"📘"}],
    pricingPlans: [
      { name: "Cloud MVP", price: "$4,500", interval: "starting at", desc: "Move your current app's background logic to modern cloud tools.", features: ["API Gateway Setup", "Lambda Function Setup", "Database Connection", "Basic Monitoring"], popular: false },
      { name: "Full Serverless App", price: "$14,000", interval: "starting at", desc: "A complete software platform built from scratch for the cloud.", features: ["Fast Edge Routing", "React/Next.js Frontend", "Advanced Auth", "Cost-Optimization", "Priority Support"], popular: true },
      { name: "Enterprise Scale", price: "Custom", interval: "tailored scope", desc: "Huge systems handling millions of actions every day.", features: ["Dedicated Coding Team", "Multi-Cloud Redundancy", "Strict Compliance Checks", "Custom SLA", "24/7 Tracking"], popular: false }
    ]
  },
  {
    slug: "migration", title: "Moving to the Cloud", tagline: "Move your tech to the cloud safely.", description: "We safely move your data and software from old physical office servers to modern cloud systems without dropping offline.", iconKey: "cloud", ...T_EMERALD,
    deliverables: ["Architecture Assessment", "Zero-Downtime Transfer", "Database Syncing", "Speed Optimization"],
    techStack: [{name:"AWS",icon:"☁️"},{name:"Docker",icon:"🐳"},{name:"Kubernetes",icon:"☸️"},{name:"Terraform",icon:"🏗️"},{name:"PostgreSQL",icon:"🐘"},{name:"Datadog",icon:"🐶"}],
    pricingPlans: [
      { name: "Moving Plan", price: "$1,500", interval: "one-time", desc: "We map out exactly how to move your data safely.", features: ["Infrastructure Audit", "Risk Assessment", "Cost Estimation", "Step-by-Step Blueprint"], popular: false },
      { name: "Full Server Move", price: "$7,500", interval: "starting at", desc: "We do the heavy lifting and move everything to the cloud.", features: ["Secure Data Transfer", "Server Provisioning", "DNS Cutover Management", "Post-Launch Testing", "1 Month Support"], popular: true },
      { name: "Corporate Lift & Shift", price: "Custom", interval: "tailored scope", desc: "Massive moves for old company computer rooms.", features: ["Dedicated Moving Team", "Phased Hybrid Rollout", "Strict Legal Rules", "Custom SLA", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "microservices", title: "System Breakdowns", tagline: "Break up huge old software to make it fast again.", description: "We take massive, slow software and break it into small, fast pieces that are easy to update and scale.", iconKey: "web", ...T_FUCHSIA,
    deliverables: ["Monolith Decoupling", "Docker Containerization", "API Gateway Setup", "Independent Scaling"],
    techStack: [{name:"Node.js",icon:"🟩"},{name:"Docker",icon:"🐳"},{name:"Kubernetes",icon:"☸️"},{name:"AWS",icon:"☁️"},{name:"GraphQL",icon:"📊"},{name:"PostgreSQL",icon:"🐘"}],
    pricingPlans: [
      { name: "Architecture Plan", price: "$2,500", interval: "one-time", desc: "We map out exactly how to safely chop up your giant software.", features: ["Codebase Analysis", "Service Boundary Definition", "Database Split Strategy", "Executive Roadmap"], popular: false },
      { name: "Phased Refactoring", price: "$18,000", interval: "starting at", desc: "We actively rewrite your code into fast, separate pieces.", features: ["Docker Containerization", "API Gateway Setup", "Zero-Downtime Rollouts", "Automated Testing", "Priority Support"], popular: true },
      { name: "Enterprise Ops", price: "Custom", interval: "tailored scope", desc: "Managing hundreds of small pieces for massive websites.", features: ["Dedicated Server Team", "Advanced Mesh Networking", "Military-Grade Security", "Custom SLA", "24/7 Incident Response"], popular: false }
    ]
  },
  {
    slug: "database", title: "Database Management", tagline: "Fast, secure storage for all your company data.", description: "We design, clean, and manage large databases so your website or app loads instantly even with thousands of users.", iconKey: "data", ...T_INDIGO,
    deliverables: ["Schema Design", "Query Speed Optimization", "Replication", "Automated Backups"],
    techStack: [{name:"PostgreSQL",icon:"🐘"},{name:"MongoDB",icon:"🍃"},{name:"Redis",icon:"⚡"},{name:"Prisma",icon:"◬"},{name:"AWS RDS",icon:"☁️"},{name:"Snowflake",icon:"❄️"}],
    pricingPlans: [
      { name: "Speed Audit", price: "$1,000", interval: "one-time", desc: "Find out exactly why your software is running slow and fix it.", features: ["Slow Query Analysis", "Index Optimization", "Storage Review", "Performance Report"], popular: false },
      { name: "Monthly DBA", price: "$1,500", interval: "per month", desc: "We watch your data 24/7 to make sure it stays fast and safe.", features: ["24/7 Health Monitoring", "Automated Scaling", "Weekly Backups", "Security Patching", "Priority Support"], popular: true },
      { name: "Custom Database Build", price: "Custom", interval: "tailored scope", desc: "Building massive databases from scratch for global companies.", features: ["Global Data Sharding", "Multi-Region Replication", "Military-Grade Encryption", "Custom SLA", "24/7 Dedicated DBA"], popular: false }
    ]
  },

  // --- SECURITY, COMPLIANCE & IT SUPPORT ---
  {
    slug: "cybersecurity", title: "Security Testing", tagline: "Find the open doors before hackers do.", description: "We hire friendly hackers to try and break into your website or app to find weak spots so you can fix them.", iconKey: "shield", ...T_AMBER,
    deliverables: ["Automated Scans", "Manual Hacker Tests", "Phishing Simulations", "Clear Security Reports"],
    techStack: [{name:"Kali Linux",icon:"🐉"},{name:"Burp Suite",icon:"🔍"},{name:"Metasploit",icon:"🕷️"},{name:"AWS Shield",icon:"☁️"},{name:"Cloudflare",icon:"🌩️"},{name:"Datadog",icon:"🐶"}],
    pricingPlans: [
      { name: "Basic Security Scan", price: "$1,200", interval: "one-time", desc: "A fast, automatic check of your public website for common errors.", features: ["OWASP Top 10 Scan", "SSL/TLS Verification", "Server Setting Checks", "Clear PDF Report"], popular: false },
      { name: "Deep Pen-Test", price: "$4,500", interval: "starting at", desc: "Real humans try to break into your app to find hidden flaws.", features: ["Manual Code Checking", "Test Data Connections", "Try to Steal Passwords", "Developer Fix Plan", "Post-Fix Scan"], popular: true },
      { name: "Ongoing Security", price: "Custom", interval: "tailored scope", desc: "Constant, aggressive testing for banks and large companies.", features: ["Dedicated Security Team", "Employee Trick Tests", "Strict Compliance Rules", "Custom Agreement", "24/7 Watching"], popular: false }
    ]
  },
  {
    slug: "compliance", title: "Privacy Law Setup", tagline: "Follow internet laws without the headache.", description: "We review your website code and fix it so it legally follows strict global privacy laws (like GDPR & HIPAA).", iconKey: "shield", ...T_ROSE,
    deliverables: ["Scramble Private Data", "Cookie Warning Popups", "Audit Logging", "Delete Data Scripts"],
    techStack: [{name:"AWS KMS",icon:"☁️"},{name:"PostgreSQL",icon:"🐘"},{name:"Node.js",icon:"🟩"},{name:"Vanta",icon:"📋"},{name:"Linux",icon:"🐧"},{name:"Cloudflare",icon:"🌩️"}],
    pricingPlans: [
      { name: "Legal Code Check", price: "$1,500", interval: "one-time", desc: "We review your code to find dangerous legal data mistakes.", features: ["Map Where Data Goes", "Check Data Scrambling", "Review Cookie Notices", "Provide a Fix Plan"], popular: false },
      { name: "Full Rule Setup", price: "$6,500", interval: "starting at", desc: "We rewrite your code to make sure it follows privacy laws.", features: ["Scramble Stored Data", "Tools to Delete User Data", "Cookie Notice Setup", "Make Servers Safer", "Check After Fixing"], popular: true },
      { name: "Medical/Bank Rules", price: "Custom", interval: "tailored scope", desc: "Extremely strict setup for medical apps or financial tools.", features: ["Dedicated Legal Techs", "Manage Third-Party Tools", "Top-Level Scrambling", "Custom Agreement", "24/7 Security Checks"], popular: false }
    ]
  },
  {
    slug: "iam", title: "Secure Employee Logins", tagline: "Total control over who sees your company data.", description: "We set up secure login portals so only your trusted employees can access your company software.", iconKey: "shield", ...T_CYAN,
    deliverables: ["Single Password Logins", "Trust Nobody Setup", "Manager Rule Levels", "Instant Lockouts"],
    techStack: [{name:"Auth0",icon:"🔑"},{name:"Okta",icon:"🛡️"},{name:"NextAuth",icon:"▲"},{name:"AWS Cognito",icon:"☁️"},{name:"Node.js",icon:"🟩"},{name:"PostgreSQL",icon:"🐘"}],
    pricingPlans: [
      { name: "Basic Secure Login", price: "$1,800", interval: "starting at", desc: "Set up a safe login screen for a standard web app.", features: ["Email & Google Login", "Secure Password Tech", "Forgot Password Flow", "Basic Hacker Protection"], popular: false },
      { name: "Company SSO", price: "$5,500", interval: "starting at", desc: "Connect your software so employees use their main company email.", features: ["Microsoft/Google SSO", "Text Message Codes (2FA)", "Complex Manager Rules", "Security Check", "Priority Help"], popular: true },
      { name: "Bank-Level Login", price: "Custom", interval: "tailored scope", desc: "Extremely high security logins for big institutions.", features: ["Dedicated Security Team", "Fingerprint/Face Logins", "Strict Legal Rules", "Custom Agreement", "24/7 Watching"], popular: false }
    ]
  },
  {
    slug: "disaster-recovery", title: "Emergency Backups", tagline: "Because 'hoping for the best' is not a plan.", description: "Server fires and hackers happen. We build automatic backup systems so you can restore everything in minutes.", iconKey: "shield", ...T_EMERALD,
    deliverables: ["Automatic Daily Backups", "Multi-Country Storage", "Ransomware Protection", "Fast Restart Plan"],
    techStack: [{name:"AWS S3",icon:"☁️"},{name:"Terraform",icon:"🏗️"},{name:"Linux",icon:"🐧"},{name:"Datadog",icon:"🐶"},{name:"PostgreSQL",icon:"🐘"},{name:"Cloudflare",icon:"🛡️"}],
    pricingPlans: [
      { name: "Backup Audit", price: "$999", interval: "one-time", desc: "A full review and a written plan for what to do in an emergency.", features: ["Find Weak Spots", "Decide Acceptable Downtime", "Security Advice", "Strategy Document"], popular: false },
      { name: "Monthly Safe Backups", price: "$850", interval: "per month", desc: "We set up the backups and actively watch them to keep you safe.", features: ["Automatic Daily Saves", "Monthly Test Restarts", "Watch for Hackers", "Fast Emergency Help", "Direct Chat"], popular: true },
      { name: "Corporate Protection", price: "Custom", interval: "tailored scope", desc: "Top-level protection for banks, hospitals, and huge apps.", features: ["Live Backups Worldwide", "Never Lose Any Data", "Strict Legal Rules", "Custom Agreement", "24/7 Emergency Team"], popular: false }
    ]
  },
  {
    slug: "qa-testing", title: "Error Testing", tagline: "Launch software without embarrassing bugs.", description: "Bugs destroy trust. We write code that automatically clicks through your app to find errors before customers do.", iconKey: "ai", ...T_FUCHSIA,
    deliverables: ["Automatic Click Tests", "Speed Under Pressure", "Cross-Phone Checks", "Clear Bug Reports"],
    techStack: [{name:"Cypress",icon:"⚙️"},{name:"Selenium",icon:"🕸️"},{name:"Jest",icon:"🧪"},{name:"GitHub",icon:"🔄"},{name:"Jira",icon:"📋"},{name:"BrowserStack",icon:"🌐"}],
    pricingPlans: [
      { name: "Pre-Launch Check", price: "$1,000", interval: "one-time", desc: "A deep manual check of your app right before you go live.", features: ["Check Phones & PCs", "Test Main Buttons", "Report Design Glitches", "Add Bugs to To-Do List"], popular: false },
      { name: "Auto-Testing Setup", price: "$4,500", interval: "starting at", desc: "Code that automatically tests your app every time you update it.", features: ["Automatic Click Scripts", "Connect to Updates", "Test Speed Limits", "Code Health Reports", "1 Month Support"], popular: true },
      { name: "Ongoing Testing Team", price: "Custom", interval: "per month", desc: "Constant, dedicated testing for huge software platforms.", features: ["Dedicated Testers", "Test by Breaking Things", "Strict Legal Rules", "Custom Agreement", "24/7 Emergency Help"], popular: false }
    ]
  },
  {
    slug: "maintenance", title: "Website Care", tagline: "Keep your website running smoothly and safely.", description: "We handle annoying software updates, fix broken plugins, and take daily backups.", iconKey: "shield", ...T_INDIGO,
    deliverables: ["Weekly Security Updates", "Daily Automatic Backups", "Uptime Monitoring", "Text/Image Changes"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"React",icon:"⚛️"},{name:"WordPress",icon:"📝"},{name:"AWS",icon:"☁️"},{name:"Datadog",icon:"🐶"},{name:"GitHub",icon:"⚙️"}],
    pricingPlans: [
      { name: "Basic Website Care", price: "$350", interval: "per month", desc: "Essential security and backups for normal websites.", features: ["Weekly Tool Updates", "Daily Safe Backups", "Watch 24/7 for Crashes", "Monthly Checkup Report"], popular: false },
      { name: "Advanced Care", price: "$999", interval: "per month", desc: "Active help including design tweaks and adding new content.", features: ["Everything in Basic", "Fix Bugs Fast", "Up to 5hrs Coding Help", "Google Ranking Checks", "Direct Team Chat"], popular: true },
      { name: "Full Corporate Care", price: "Custom", interval: "per month", desc: "Full management for massive corporate websites.", features: ["Dedicated Coding Team", "Build Custom Features", "Top-Level Security", "Custom SLA", "24/7 Fast Response"], popular: false }
    ]
  },
  {
    slug: "support", title: "Tech Helpdesk", tagline: "Expert problem solvers for your staff.", description: "Fast engineering support to fix software bugs, crashed servers, and employee login issues.", iconKey: "chat", ...T_AMBER,
    deliverables: ["Fix Tech Problems", "Helpdesk Ticket System", "Guaranteed Fast Replies", "New Hire Setup"],
    techStack: [{name:"Zendesk",icon:"🎧"},{name:"Jira Help",icon:"📋"},{name:"Slack",icon:"💬"},{name:"AWS",icon:"☁️"},{name:"Datadog",icon:"🐶"},{name:"Linux",icon:"🐧"}],
    pricingPlans: [
      { name: "Business Hours Help", price: "$1,000", interval: "per month", desc: "Standard technical help during your normal office hours.", features: ["9am-5pm Help", "Email & Chat Support", "Fix Software Issues", "Reply Within 4 Hours"], popular: false },
      { name: "Priority Fast Help", price: "$2,500", interval: "per month", desc: "Fast-lane fixing for companies that rely on their tech.", features: ["Help Early and Late", "Direct Phone Line", "Priority Code Fixes", "Reply Within 1 Hour", "Dedicated Manager"], popular: true },
      { name: "24/7 Expert Help", price: "Custom", interval: "per month", desc: "Around-the-clock help for critical global apps.", features: ["Help 24/7/365", "Access to Senior Experts", "Strict Legal Rules", "Instant Custom Reply", "Dedicated Team"], popular: false }
    ]
  },
  {
    slug: "consulting", title: "Tech Advice", tagline: "Expert guidance so you don't waste money.", description: "Not sure what software to buy or how to build your app? We give honest, expert advice to help you build it right.", iconKey: "chat", ...T_ROSE,
    deliverables: ["Review Current Tools", "Cost Saving Ideas", "Help Hiring Programmers", "Update Old Tech Plans"],
    techStack: [{name:"AWS",icon:"☁️"},{name:"Jira",icon:"📋"},{name:"GitHub",icon:"⚙️"},{name:"Figma",icon:"🎨"},{name:"Slack",icon:"💬"},{name:"Notion",icon:"📝"}],
    pricingPlans: [
      { name: "Advice Video Call", price: "$500", interval: "one-time", desc: "A deep video call to solve a big tech problem you are stuck on.", features: ["2-Hour Strategy Call", "Review Your Tech Plan", "Show Costs vs Benefits", "Clear PDF Instruction Plan"], popular: false },
      { name: "Monthly Tech Advisor", price: "$2,000", interval: "per month", desc: "Ongoing expert help for startups without a tech boss.", features: ["Weekly Strategy Calls", "Help Picking Tools", "Help Interviewing Coders", "Fast Chat Access", "Monthly Reports"], popular: true },
      { name: "In-Person Corporate", price: "Custom", interval: "tailored scope", desc: "On-site consulting for massive corporate overhauls.", features: ["In-Person Meetings", "Review Entire Departments", "Strict Privacy Agreements", "Custom Agreement", "Unlimited Access"], popular: false }
    ]
  },
  {
    slug: "network", title: "Office Internet Setup", tagline: "Fast, secure internet for your physical office.", description: "We set up strong, reliable Wi-Fi and secure connections so employees can work without dropping.", iconKey: "cloud", ...T_CYAN,
    deliverables: ["Corporate Wi-Fi Design", "Secure Home Worker Access", "Connect Multiple Offices", "Watch Internet Speeds"],
    techStack: [{name:"Cisco",icon:"🖧"},{name:"Ubiquiti",icon:"📡"},{name:"Palo Alto",icon:"🛡️"},{name:"AWS VPC",icon:"☁️"},{name:"Linux",icon:"🐧"},{name:"WireGuard",icon:"🔒"}],
    pricingPlans: [
      { name: "Internet Check", price: "$800", interval: "one-time", desc: "Figure out why office internet is slow or dropping.", features: ["Map Wi-Fi Dead Zones", "Check for Hacker Risks", "Find What's Slowing it Down", "Recommend Equipment"], popular: false },
      { name: "New Office Setup", price: "$3,500", interval: "starting at", desc: "Complete setup of fast internet for a new corporate office.", features: ["Set up Internet Boxes", "Fast Company Wi-Fi", "Separate Guest Wi-Fi", "Home Worker Access", "1 Month Help"], popular: true },
      { name: "Global Office Sync", price: "Custom", interval: "tailored scope", desc: "Connecting multiple international offices securely.", features: ["Dedicated Experts", "Extremely High Security", "Top-Level Scrambling", "Custom Agreement", "24/7 Watching"], popular: false }
    ]
  },

  // --- MARKETING, SEO, WEB3 & IOT ---
  {
    slug: "seo", title: "Google Ranking (SEO)", tagline: "Get to the top of Google searches.", description: "We fix your website's hidden code to make it load instantly and follow Google's rules so you rank higher.", iconKey: "search", ...T_EMERALD,
    deliverables: ["Fix Loading Speeds", "Modern Code Setup", "Massive Page Creation", "Tell Google what you do"],
    techStack: [{name:"Next.js",icon:"▲"},{name:"Ahrefs",icon:"🔍"},{name:"Google Data",icon:"📈"},{name:"Vercel",icon:"☁️"},{name:"React",icon:"⚛️"},{name:"Lighthouse",icon:"⚡"}],
    pricingPlans: [
      { name: "Website SEO Check", price: "$800", interval: "one-time", desc: "Deep dive into code to find what blocks Google rank.", features: ["Check Speed and Errors", "Review Website Code", "Compare Competitors", "Provide a Fix Plan"], popular: false },
      { name: "Monthly SEO Growth", price: "$1,500", interval: "per month", desc: "Ongoing code updates and strategies to take over the top spot.", features: ["Actively Fix Slow Code", "Monthly Strategy Updates", "Get Links from Other Sites", "Monthly Results Report", "Fast Chat Access"], popular: true },
      { name: "Massive SEO System", price: "Custom", interval: "tailored scope", desc: "Automatically making thousands of pages for big websites.", features: ["Dedicated SEO Experts", "Connect Database to Pages", "Custom Website Build", "Custom Agreement", "24/7 Server Watching"], popular: false }
    ]
  },
  {
    slug: "cro", title: "Increase Website Sales", tagline: "Turn your current visitors into paying customers.", description: "We use heatmaps to see where people click, find why they leave, and change design to sell.", iconKey: "data", ...T_FUCHSIA,
    deliverables: ["Test Different Designs", "Track Where People Click", "Fix the Checkout Page", "Write Better Sales Text"],
    techStack: [{name:"Optimizely",icon:"🎯"},{name:"Hotjar",icon:"🔥"},{name:"Google Data",icon:"📈"},{name:"Figma",icon:"🎨"},{name:"React",icon:"⚛️"},{name:"Mixpanel",icon:"📊"}],
    pricingPlans: [
      { name: "Website Sales Check", price: "$999", interval: "one-time", desc: "Review site to find exactly where users leave the page.", features: ["Track How Users Move", "Review the Design", "Find Frustrating Buttons", "Provide Redesign Plan"], popular: false },
      { name: "Monthly Sales Test", price: "$2,000", interval: "per month", desc: "Actively change designs and test them to increase sales.", features: ["Constantly Test Designs", "Actively Write New Code", "Watch Click Heatmaps", "Monthly Sales Reports", "Dedicated Designer"], popular: true },
      { name: "Large Store Testing", price: "Custom", interval: "per month", desc: "Managing massive global checkouts for big brands.", features: ["Dedicated Testing Team", "Advanced Complex Tests", "Custom Data Screens", "Custom Agreement", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "email", title: "Automatic Emails", tagline: "Sell to customers while you sleep.", description: "Set up smart systems that automatically send perfectly timed emails to customers.", iconKey: "chat", ...T_INDIGO,
    deliverables: ["Plan Email Steps", "Connect to your Software", "Left-in-Cart Emails", "Insert User Names Automatically"],
    techStack: [{name:"Klaviyo",icon:"📧"},{name:"HubSpot",icon:"🧲"},{name:"Node.js",icon:"🟩"},{name:"SendGrid",icon:"📨"},{name:"PostgreSQL",icon:"🐘"},{name:"AWS",icon:"☁️"}],
    pricingPlans: [
      { name: "Basic Email Setup", price: "$1,200", interval: "starting at", desc: "Setup essential 'Welcome' and 'Left in Cart' emails.", features: ["Set up the Email Tool", "Design Welcome Email", "Set up Left-in-Cart Rules", "Basic Sales Writing"], popular: false },
      { name: "Advanced Emailing", price: "$3,500", interval: "starting at", desc: "Complex automatic emails based on what users click.", features: ["Connect to Database", "Smart Decision Rules", "Custom Email Designs", "Test Different Emails", "Priority Support"], popular: true },
      { name: "Large Email Team", price: "Custom", interval: "per month", desc: "Managing millions of emails for big global companies.", features: ["Dedicated Email Experts", "Custom Sending Servers", "Strict Spam Law Rules", "Custom Agreement", "24/7 Tracking"], popular: false }
    ]
  },
  {
    slug: "tracking", title: "Data Tracking", tagline: "Know exactly where every dollar comes from.", description: "Advanced tracking tools to see which Facebook or Google Ad brought a sale, bypassing ad-blockers.", iconKey: "data", ...T_AMBER,
    deliverables: ["Advanced Server Tracking", "Track Specific Clicks", "Setup Web Links correctly", "Connect to Facebook/Google"],
    techStack: [{name:"Tag Manager",icon:"🏷️"},{name:"Google Data",icon:"📈"},{name:"Mixpanel",icon:"📊"},{name:"Node.js",icon:"🟩"},{name:"Meta Tracking",icon:"♾️"},{name:"Next.js",icon:"▲"}],
    pricingPlans: [
      { name: "Basic Data Tracking", price: "$800", interval: "one-time", desc: "Proper setup of Google Analytics and basic sales tracking.", features: ["Set up Google Analytics", "Set up Tag Manager", "Track Goal Completions", "Make Sure Data is Correct"], popular: false },
      { name: "Advanced Tracking", price: "$2,500", interval: "starting at", desc: "Highly accurate tracking that bypasses ad-blockers.", features: ["Set up Server Tracking", "Connect Meta/Google", "Track Custom Clicks", "Fix Missing Data", "1 Month Support"], popular: true },
      { name: "Large Data Setup", price: "Custom", interval: "tailored scope", desc: "Massive scale tracking across different websites.", features: ["Dedicated Data Experts", "Connect Custom Databases", "Strict Privacy Law Rules", "Custom Agreement", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "blockchain", title: "Crypto & Smart Contracts", tagline: "Secure digital agreements on the blockchain.", description: "Highly secure, hacker-tested smart contracts for custom cryptocurrencies, NFTs, and apps.", iconKey: "cloud", ...T_ROSE,
    deliverables: ["Write Crypto Code", "Make it Cheap to Run", "Test for Hackers", "Launch on the Network"],
    techStack: [{name:"Solidity",icon:"📜"},{name:"Rust",icon:"🦀"},{name:"Hardhat",icon:"👷"},{name:"Ethereum",icon:"⟠"},{name:"Solana",icon:"☀️"},{name:"Node.js",icon:"🟩"}],
    pricingPlans: [
      { name: "Basic Contract", price: "$4,500", interval: "starting at", desc: "Build a standard custom token or basic NFT project.", features: ["Standard Token Rules", "Launch on Test Network", "Basic Security Review", "Give you the Code"], popular: false },
      { name: "Advanced Crypto Setup", price: "$14,000", interval: "starting at", desc: "Complex crypto rules designed to be cheap and safe.", features: ["Custom Complex Rules", "Deep Security Checks", "Make it Cheap to use", "Launch on Main Network", "Priority Support"], popular: true },
      { name: "Large Crypto Platform", price: "Custom", interval: "tailored scope", desc: "Huge crypto platforms handling millions of dollars.", features: ["Dedicated Crypto Experts", "Bank-Level Rules", "Custom Network Setup", "Custom Agreement", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "web3", title: "Web3 Connections", tagline: "Let users log in with their crypto wallets.", description: "Upgrade normal websites so users can log in with MetaMask, pay with crypto, or unlock pages.", iconKey: "web", ...T_CYAN,
    deliverables: ["Wallet Login Button", "Accept Crypto Payments", "Lock Pages for NFT Owners", "Connect to the Blockchain"],
    techStack: [{name:"Web3.js",icon:"🌐"},{name:"Next.js",icon:"▲"},{name:"React",icon:"⚛️"},{name:"TypeScript",icon:"📘"},{name:"Node.js",icon:"🟩"},{name:"IPFS",icon:"📦"}],
    pricingPlans: [
      { name: "Basic Wallet Login", price: "$2,500", interval: "starting at", desc: "Allow users to connect their crypto wallets to your site.", features: ["Add Wallet Login Button", "Basic Security", "Read Wallet Balances", "Looks Great on Phones"], popular: false },
      { name: "Full Crypto Website", price: "$12,500", interval: "starting at", desc: "A complete modern website interacting heavily with crypto.", features: ["Complex Blockchain Actions", "Lock Pages with Crypto", "Beautiful Custom Design", "Handle Errors Smoothly", "3 Months Support"], popular: true },
      { name: "Large Crypto System", price: "Custom", interval: "tailored scope", desc: "Massive crypto connections for big financial apps.", features: ["Dedicated Coding Team", "Set Up Private Nodes", "Top-Level Security", "Custom Agreement", "24/7 Monitoring"], popular: false }
    ]
  },
  {
    slug: "iot", title: "Smart Devices (IoT)", tagline: "Connect physical machines to the internet.", description: "Software that connects physical sensors, factory machines, and smart devices to the cloud.", iconKey: "ai", ...T_EMERALD,
    deliverables: ["Read Machine Data", "Live Internet Connection", "Custom Dashboards", "Talk to Machine Chips"],
    techStack: [{name:"Python",icon:"🐍"},{name:"C++",icon:"⚙️"},{name:"AWS IoT",icon:"☁️"},{name:"Node.js",icon:"🟩"},{name:"MQTT",icon:"📡"},{name:"PostgreSQL",icon:"🐘"}],
    pricingPlans: [
      { name: "Basic Device Sync", price: "$5,500", interval: "starting at", desc: "Connect a single hardware device to a basic screen.", features: ["Basic Internet Connection", "Save Data to Database", "Simple Viewing Screen", "Test the Speed"], popular: false },
      { name: "Live Device Tracking", price: "$16,000", interval: "starting at", desc: "A strong system managing data from hundreds of devices.", features: ["Advanced Data Movement", "Live Viewing Screens", "Send Commands to Machines", "High Security", "Priority Support"], popular: true },
      { name: "Large Factory System", price: "Custom", interval: "tailored scope", desc: "Massive systems for huge international factories.", features: ["Dedicated Engineering Team", "Fast Local Servers", "Military-Grade Security", "Custom SLA", "24/7 Emergency Help"], popular: false }
    ]
  },
  {
    slug: "ar-vr", title: "3D & Virtual Reality", tagline: "Immersive 3D experiences on the web.", description: "Jaw-dropping 3D websites, virtual reality training apps, and tools to view products in 3D.", iconKey: "design", ...T_FUCHSIA,
    deliverables: ["3D Website Models", "View Products in 3D", "Interactive 3D Sites", "Virtual Reality Apps"],
    techStack: [{name:"Three.js",icon:"🧊"},{name:"WebGL",icon:"🕸️"},{name:"React Three Fiber",icon:"⚛️"},{name:"Unity",icon:"🎮"},{name:"Blender",icon:"🎨"},{name:"Next.js",icon:"▲"}],
    pricingPlans: [
      { name: "Basic 3D Model", price: "$3,500", interval: "starting at", desc: "A 3D model embedded in your website that users can spin.", features: ["Make Model Load Fast", "Add to your Website", "Users Can Click/Spin", "Works Great on Phones"], popular: false },
      { name: "Full 3D Website", price: "$14,500", interval: "starting at", desc: "A complete, stunning website driven by 3D animations.", features: ["Build Entire 3D World", "Animate as you Scroll", "Premium Look and Feel", "Make it Run Smoothly", "3 Months Support"], popular: true },
      { name: "Custom Training App", price: "Custom", interval: "tailored scope", desc: "Massive Virtual Reality apps for company training.", features: ["Dedicated 3D Experts", "Custom Physics Rules", "Tuned for VR Headsets", "Custom Agreement", "24/7 Dedicated Support"], popular: false }
    ]
  }
];