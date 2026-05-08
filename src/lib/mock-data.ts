export type Category =
  | "product"
  | "pricing"
  | "blog"
  | "news"
  | "website"
  | "keyword";

export const CATEGORIES: { id: Category; label: string; description: string }[] = [
  { id: "product", label: "Product Changes", description: "New features, releases, deprecations" },
  { id: "pricing", label: "Pricing Changes", description: "Plan, tier, and price updates" },
  { id: "blog", label: "Blogs", description: "Official blog and content posts" },
  { id: "news", label: "Market News", description: "Press, funding, partnerships" },
  { id: "website", label: "Website Changes", description: "Landing page and copy diffs" },
  { id: "keyword", label: "Keyword Trends", description: "Rising terms across competitors" },
];

export type Company = {
  id: string;
  name: string;
  url: string;
  domain: string;
  color: string;
  isHost?: boolean;
};

export const COMPANIES: Company[] = [
  { id: "hubspot", name: "HubSpot", url: "https://hubspot.com", domain: "hubspot.com", color: "oklch(0.7 0.18 35)", isHost: true },
  { id: "salesforce", name: "Salesforce", url: "https://salesforce.com", domain: "salesforce.com", color: "oklch(0.6 0.15 235)" },
  { id: "zoho", name: "Zoho", url: "https://zoho.com", domain: "zoho.com", color: "oklch(0.6 0.18 25)" },
  { id: "freshworks", name: "Freshworks", url: "https://freshworks.com", domain: "freshworks.com", color: "oklch(0.7 0.16 155)" },
  { id: "intercom", name: "Intercom", url: "https://intercom.com", domain: "intercom.com", color: "oklch(0.55 0.18 270)" },
];

export type ChangeType = "new" | "changed" | "stable" | "high-impact";

export type Finding = {
  id: string;
  companyId: string;
  category: Category;
  title: string;
  summary: string;
  sourceUrl: string;
  date: string; // ISO
  importance: 1 | 2 | 3 | 4 | 5;
  confidence: number; // 0-1
  changeType: ChangeType;
  excerpt?: string;
};

const today = new Date();
const d = (daysAgo: number, h = 0) => {
  const x = new Date(today);
  x.setDate(x.getDate() - daysAgo);
  x.setHours(9 + h, 12, 0, 0);
  return x.toISOString();
};

export const FINDINGS: Finding[] = [
  {
    id: "f1",
    companyId: "salesforce",
    category: "pricing",
    title: "Sales Cloud Enterprise pricing increased 12%",
    summary: "Sales Cloud Enterprise tier moved from $165 to $185 per user/month. Annual contract requirement now applies to all paid tiers.",
    sourceUrl: "https://salesforce.com/pricing",
    date: d(0, 0),
    importance: 5,
    confidence: 0.94,
    changeType: "high-impact",
    excerpt: "Effective immediately, Sales Cloud Enterprise is priced at $185/user/month billed annually...",
  },
  {
    id: "f2",
    companyId: "hubspot",
    category: "product",
    title: "Breeze AI Agents launched in Service Hub",
    summary: "HubSpot introduced four AI agents (Customer, Content, Prospecting, Social) bundled with Service Hub Professional and above.",
    sourceUrl: "https://hubspot.com/products/breeze",
    date: d(0, 2),
    importance: 5,
    confidence: 0.97,
    changeType: "new",
  },
  {
    id: "f3",
    companyId: "intercom",
    category: "blog",
    title: "Fin AI Agent now resolves 56% of conversations",
    summary: "New benchmark post claims Fin handles 56% of customer queries autonomously across 4,000+ accounts.",
    sourceUrl: "https://intercom.com/blog/fin-benchmark",
    date: d(1, 1),
    importance: 4,
    confidence: 0.91,
    changeType: "new",
  },
  {
    id: "f4",
    companyId: "zoho",
    category: "product",
    title: "Zoho CRM adds Zia Voice for sales calls",
    summary: "Real-time call transcription and coaching released for Zoho CRM Plus customers in 14 languages.",
    sourceUrl: "https://zoho.com/crm/zia-voice",
    date: d(1, 3),
    importance: 4,
    confidence: 0.89,
    changeType: "new",
  },
  {
    id: "f5",
    companyId: "freshworks",
    category: "news",
    title: "Freshworks acquires Device42 for $230M",
    summary: "Acquisition strengthens Freshservice ITSM offering with infrastructure discovery and dependency mapping.",
    sourceUrl: "https://techcrunch.com/freshworks-device42",
    date: d(2),
    importance: 5,
    confidence: 0.98,
    changeType: "high-impact",
  },
  {
    id: "f6",
    companyId: "salesforce",
    category: "website",
    title: "Homepage hero updated to focus on Agentforce",
    summary: "Salesforce.com hero swapped Einstein 1 messaging for Agentforce 2.0. CTA changed to 'Build Your Agent'.",
    sourceUrl: "https://salesforce.com",
    date: d(2, 2),
    importance: 3,
    confidence: 0.86,
    changeType: "changed",
  },
  {
    id: "f7",
    companyId: "hubspot",
    category: "pricing",
    title: "Starter Customer Platform price unchanged",
    summary: "Quarterly review confirms Starter bundle remains at $20/seat/month. No tier restructure detected.",
    sourceUrl: "https://hubspot.com/pricing",
    date: d(3),
    importance: 1,
    confidence: 0.99,
    changeType: "stable",
  },
  {
    id: "f8",
    companyId: "intercom",
    category: "pricing",
    title: "Fin AI per-resolution pricing dropped to $0.85",
    summary: "Intercom reduced Fin AI per-resolution rate from $0.99 to $0.85. Volume discount tier added at 50K+ resolutions.",
    sourceUrl: "https://intercom.com/pricing",
    date: d(3, 1),
    importance: 5,
    confidence: 0.95,
    changeType: "high-impact",
  },
  {
    id: "f9",
    companyId: "zoho",
    category: "blog",
    title: "Zoho One bundle now includes 55+ apps",
    summary: "Five new apps added to Zoho One: Tables, LearnFi, Solo, ZeptoMail, and CommandCenter.",
    sourceUrl: "https://zoho.com/blog/zoho-one-update",
    date: d(4),
    importance: 3,
    confidence: 0.92,
    changeType: "changed",
  },
  {
    id: "f10",
    companyId: "freshworks",
    category: "product",
    title: "Freddy Copilot generally available",
    summary: "GenAI assistant for Freshdesk, Freshsales, and Freshservice exits beta. $29/agent/month add-on.",
    sourceUrl: "https://freshworks.com/freddy-copilot",
    date: d(4, 2),
    importance: 4,
    confidence: 0.93,
    changeType: "new",
  },
  {
    id: "f11",
    companyId: "salesforce",
    category: "news",
    title: "Salesforce Q3 earnings beat estimates",
    summary: "Revenue up 8% YoY to $9.4B. Data Cloud paid customers crossed 2,000.",
    sourceUrl: "https://reuters.com/salesforce-earnings",
    date: d(5),
    importance: 4,
    confidence: 0.97,
    changeType: "new",
  },
  {
    id: "f12",
    companyId: "hubspot",
    category: "blog",
    title: "INBOUND 2026 keynote recap published",
    summary: "Recap covers Breeze, Smart CRM updates, and partner ecosystem investments announced at INBOUND.",
    sourceUrl: "https://hubspot.com/blog/inbound-recap",
    date: d(5, 2),
    importance: 2,
    confidence: 0.9,
    changeType: "new",
  },
  {
    id: "f13",
    companyId: "intercom",
    category: "website",
    title: "Pricing page restructured into 3 tiers",
    summary: "Essential / Advanced / Expert replaced the previous Starter / Pro / Premium structure. Fin moved to add-on.",
    sourceUrl: "https://intercom.com/pricing",
    date: d(6),
    importance: 4,
    confidence: 0.88,
    changeType: "changed",
  },
  {
    id: "f14",
    companyId: "zoho",
    category: "news",
    title: "Zoho opens new data center in Saudi Arabia",
    summary: "Riyadh DC live to comply with KSA data residency. Free migration for existing accounts in region.",
    sourceUrl: "https://zoho.com/news/ksa-dc",
    date: d(6, 1),
    importance: 3,
    confidence: 0.94,
    changeType: "new",
  },
  {
    id: "f15",
    companyId: "freshworks",
    category: "blog",
    title: "Mid-market CRM benchmark report released",
    summary: "Freshworks published 2026 CRM benchmark covering pipeline velocity, win rates, and AI adoption across 1,200 companies.",
    sourceUrl: "https://freshworks.com/blog/benchmark-2026",
    date: d(7),
    importance: 2,
    confidence: 0.89,
    changeType: "new",
  },
];

export type KeywordTrend = {
  keyword: string;
  companyId: string;
  count: number;
  changePct: number; // -100 to +100+
  weekly: number[]; // last 8 weeks
};

export const KEYWORDS: KeywordTrend[] = [
  { keyword: "AI agents", companyId: "salesforce", count: 184, changePct: 62, weekly: [40, 55, 60, 78, 95, 130, 160, 184] },
  { keyword: "AI agents", companyId: "hubspot", count: 142, changePct: 48, weekly: [30, 42, 55, 70, 88, 110, 128, 142] },
  { keyword: "Agentforce", companyId: "salesforce", count: 98, changePct: 120, weekly: [4, 8, 14, 22, 38, 60, 82, 98] },
  { keyword: "Breeze", companyId: "hubspot", count: 76, changePct: 95, weekly: [2, 5, 12, 20, 32, 48, 64, 76] },
  { keyword: "Fin AI", companyId: "intercom", count: 156, changePct: 38, weekly: [60, 70, 82, 95, 108, 122, 140, 156] },
  { keyword: "data residency", companyId: "zoho", count: 44, changePct: 28, weekly: [22, 24, 28, 30, 32, 36, 40, 44] },
  { keyword: "ITSM", companyId: "freshworks", count: 88, changePct: 18, weekly: [60, 64, 66, 70, 74, 78, 82, 88] },
  { keyword: "automation", companyId: "hubspot", count: 132, changePct: 8, weekly: [110, 114, 118, 120, 124, 126, 130, 132] },
  { keyword: "automation", companyId: "salesforce", count: 168, changePct: 5, weekly: [150, 154, 158, 160, 162, 164, 166, 168] },
  { keyword: "customer 360", companyId: "salesforce", count: 92, changePct: -12, weekly: [120, 116, 112, 108, 104, 100, 96, 92] },
  { keyword: "ticketing", companyId: "freshworks", count: 64, changePct: -8, weekly: [78, 76, 74, 72, 70, 68, 66, 64] },
  { keyword: "CRM Plus", companyId: "zoho", count: 72, changePct: 22, weekly: [48, 52, 55, 58, 62, 65, 68, 72] },
  { keyword: "support automation", companyId: "intercom", count: 88, changePct: 32, weekly: [50, 56, 62, 68, 72, 78, 82, 88] },
  { keyword: "Zia", companyId: "zoho", count: 58, changePct: 45, weekly: [22, 28, 32, 38, 42, 48, 52, 58] },
  { keyword: "Freddy AI", companyId: "freshworks", count: 76, changePct: 56, weekly: [28, 34, 42, 50, 58, 64, 70, 76] },
];

export type CompetitorRollup = {
  companyId: string;
  latestProduct: { label: string; type: ChangeType };
  pricing: { label: string; type: ChangeType };
  blogActivity: { count: number; trend: number[] };
  newsMentions: number;
  topKeywords: string[];
  lastScraped: string;
};

export const ROLLUP: CompetitorRollup[] = [
  {
    companyId: "hubspot",
    latestProduct: { label: "Breeze AI Agents launched", type: "new" },
    pricing: { label: "No change", type: "stable" },
    blogActivity: { count: 12, trend: [3, 4, 2, 5, 4, 6, 5, 12] },
    newsMentions: 8,
    topKeywords: ["Breeze", "AI agents", "automation"],
    lastScraped: d(0, 1),
  },
  {
    companyId: "salesforce",
    latestProduct: { label: "Agentforce 2.0 GA", type: "high-impact" },
    pricing: { label: "+12% Sales Cloud Enterprise", type: "high-impact" },
    blogActivity: { count: 18, trend: [5, 6, 8, 7, 9, 10, 12, 18] },
    newsMentions: 24,
    topKeywords: ["Agentforce", "AI agents", "Data Cloud"],
    lastScraped: d(0, 0),
  },
  {
    companyId: "zoho",
    latestProduct: { label: "Zia Voice for CRM", type: "new" },
    pricing: { label: "Stable", type: "stable" },
    blogActivity: { count: 9, trend: [4, 3, 5, 4, 6, 7, 8, 9] },
    newsMentions: 6,
    topKeywords: ["Zia", "CRM Plus", "data residency"],
    lastScraped: d(0, 2),
  },
  {
    companyId: "freshworks",
    latestProduct: { label: "Freddy Copilot GA", type: "new" },
    pricing: { label: "Add-on $29/agent", type: "changed" },
    blogActivity: { count: 7, trend: [2, 3, 4, 4, 5, 6, 6, 7] },
    newsMentions: 11,
    topKeywords: ["Freddy AI", "ITSM", "ticketing"],
    lastScraped: d(0, 1),
  },
  {
    companyId: "intercom",
    latestProduct: { label: "Fin resolves 56%", type: "changed" },
    pricing: { label: "Fin -14% per resolution", type: "high-impact" },
    blogActivity: { count: 14, trend: [4, 5, 6, 7, 8, 10, 12, 14] },
    newsMentions: 9,
    topKeywords: ["Fin AI", "support automation", "tiers"],
    lastScraped: d(0, 0),
  },
];

export const categoryLabel = (c: Category) =>
  CATEGORIES.find((x) => x.id === c)?.label ?? c;

export const companyById = (id: string) =>
  COMPANIES.find((c) => c.id === id) ?? COMPANIES[0];
