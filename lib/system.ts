// ---------------------------------------------------------------------------
// Data for the interactive system diagram and the timeline. Every fact here
// restates a line from lib/content.ts (and therefore the resume).
// ---------------------------------------------------------------------------

import { experience } from "./content";

const adya = experience[0];
const block = (title: string) => adya.blocks.find((b) => b.title === title)!;
const pick = (title: string, labels: string[]) => block(title).points.filter((p) => p.label && labels.includes(p.label));

export type Layer = "Product" | "Platform" | "Cloud" | "Clients";

export type SysNode = {
  id: string;
  layer: Layer;
  label: string;
  sub: string;
  note?: string;
  points: { label?: string; text: string }[];
  link?: { href: string; text: string };
};

export const layers: { name: Layer; caption: string }[] = [
  { name: "Product", caption: "What users touch" },
  { name: "Platform", caption: "What keeps it running" },
  { name: "Cloud", caption: "Where it is provisioned" },
  { name: "Clients", caption: "Who it is delivered to" },
];

export const nodes: SysNode[] = [
  { id: "A1", layer: "Product", label: "GTM Agent", sub: "The CEO's outreach agent", note: block("GTM Agent for the CEO").note, points: block("GTM Agent for the CEO").points, link: { href: "/experience", text: "Full experience" } },
  { id: "A2", layer: "Product", label: "RAI", sub: "MCP gateway, agents, CRM", note: block("RAI").note, points: block("RAI").points, link: { href: "/experience", text: "Full experience" } },
  { id: "A3", layer: "Product", label: "Cloud Studio", sub: "Onboarding, VM filtering, agentic mode", note: block("Cloud Studio").note, points: block("Cloud Studio").points, link: { href: "/experience", text: "Full experience" } },
  { id: "A4", layer: "Platform", label: "Clusters & CI/CD", sub: "4 clusters, Kubernetes, Jenkins", points: pick("Internal DevOps", ["Infrastructure", "CI/CD & Models"]), link: { href: "/experience", text: "Full experience" } },
  { id: "A5", layer: "Platform", label: "Data layer", sub: "MongoDB, PostgreSQL, Kafka and more", points: pick("Internal DevOps", ["Data Layer"]), link: { href: "/experience", text: "Full experience" } },
  { id: "A6", layer: "Platform", label: "Monitoring", sub: "Prometheus, Grafana", points: pick("Internal DevOps", ["Monitoring"]), link: { href: "/experience", text: "Full experience" } },
  { id: "A7", layer: "Platform", label: "Internal tooling", sub: "Whitelisting bot, LLM spend tracking", points: pick("Internal DevOps", ["Automation", "LLM Usage Tracking"]), link: { href: "/experience", text: "Full experience" } },
  {
    id: "A8", layer: "Cloud", label: "Azure", sub: "Lighthouse, Compute APIs, ACR",
    points: [
      { text: "Client onboarding through Azure Lighthouse delegation, with pre-filled ARM templates, in Cloud Studio." },
      { text: "VM filtering built on the Compute SKUs and Usages APIs, and a daily sync of the Azure VM catalogue." },
      { text: "About 20 az commands replaced with direct Azure REST API calls." },
      { text: "Azure Container Registry receives the images built by the AWS CodeBuild pipeline." },
      { text: "Spend on every Azure LLM key is tracked by the internal usage platform." },
    ],
  },
  {
    id: "A9", layer: "Cloud", label: "AWS", sub: "IAM, CodeBuild, Bedrock",
    points: [
      { text: "Client onboarding through a cross-account IAM role locked to an External ID, with pre-filled CloudFormation templates." },
      { text: "AWS cluster access moved from the CLI to the SDK." },
      { text: "An AWS CodeBuild pipeline builds images and pushes them to Azure Container Registry." },
      { text: "Handles AWS Bedrock keys, and is the point of contact between Adya and AWS on the Castlewise project." },
      { text: "Spend on every AWS LLM key is tracked by the internal usage platform." },
    ],
  },
  {
    id: "A10", layer: "Cloud", label: "GCP", sub: "REST APIs, quota mapping",
    points: [
      { text: "One of the three cloud providers provisioned for the company." },
      { text: "gcloud calls replaced with direct GCP REST APIs, with polling for long-running operations." },
      { text: "Fixed GCP quota mapping and pricing fallbacks in Cloud Studio." },
    ],
  },
  { id: "A11", layer: "Clients", label: "Client delivery", sub: "Castlewise, demos, scholars", points: block("Client Delivery").points, link: { href: "/experience", text: "Full experience" } },
];

// Only connections the resume supports.
export const edges: [string, string][] = [
  ["A3", "A8"], ["A3", "A9"], ["A3", "A10"], // Cloud Studio provisions on all three
  ["A2", "A5"], // RAI's CRM APIs run on MongoDB
  ["A4", "A8"], ["A4", "A9"], ["A4", "A10"], // infrastructure across three providers
  ["A6", "A4"], ["A6", "A5"], // monitoring on everything provisioned
  ["A7", "A8"], ["A7", "A9"], // LLM key tracking for Azure and AWS
  ["A11", "A4"], ["A11", "A5"], // Castlewise: deployments, pipelines, databases
];

export type Tag = "Shipped" | "Started" | "Won" | "Joined" | "Spoke" | "Attended" | "In progress";
export type Release = {
  version: string;
  date: string;
  kind: "Major" | "Minor" | "Beta";
  title: string;
  notes: { tag: Tag; text: string; href?: string }[];
};

// Newest first. The dates are real; the version numbers are a framing device.
export const releases: Release[] = [
  {
    version: "v2.2", date: "Now", kind: "Beta", title: "Agentic infrastructure",
    notes: [
      { tag: "In progress", text: "Agentic mode in Cloud Studio: clients request infrastructure in plain language, the agent writes Terraform and runs it after confirmation.", href: "/experience" },
      { tag: "In progress", text: "MachineSpeak is being extended from a two-laptop system to all devices.", href: "/projects/machinespeak" },
    ],
  },
  {
    version: "v2.1", date: "Aug 2026", kind: "Minor", title: "Best Presentation",
    notes: [{ tag: "Won", text: "Best Presentation at the Annual R&D Symposium, Multicoreware & KGISL, for MachineSpeak.", href: "/projects/machinespeak" }],
  },
  {
    version: "v2.0", date: "May 2026", kind: "Major", title: "Adya AI",
    notes: [
      { tag: "Joined", text: "Software Developer Intern at Adya AI: RAI, Cloud Studio, and the company's DevOps across three clouds.", href: "/experience" },
      { tag: "Shipped", text: "GTM agent for the CEO, deployed to production independently. Over 100 outreaches sent." },
      { tag: "Shipped", text: "Cloud Studio onboarding for Azure and AWS, VM filtering and the snapshot job system." },
      { tag: "Shipped", text: "LLM usage tracking platform and a whitelisting bot for LLMs, databases and VMs." },
      { tag: "Started", text: "MachineSpeak research project: two laptops, live telemetry, a local Qwen3-4B model and voice.", href: "/projects/machinespeak" },
    ],
  },
  {
    version: "v1.3", date: "Mar 2026", kind: "Minor", title: "On stage at Bosch",
    notes: [{ tag: "Spoke", text: "Guest speaker at the Women's Day Celebration, Bosch Global Software Technologies.", href: "/achievements#bosch-womens-day" }],
  },
  {
    version: "v1.2", date: "Feb 2026", kind: "Minor", title: "IIT Delhi and voice",
    notes: [
      { tag: "Won", text: "1st place, Agentic Among Us Hackathon, Eightfold AI & IIT Delhi. ₹50,000 as team Duo Verse.", href: "/achievements#eightfold-iit-delhi" },
      { tag: "Shipped", text: "Early detection of Alzheimer's disease from voice: MFCCs, Whisper, BERT/ClinicalBERT, SHAP and LIME.", href: "/projects/alzheimers-voice-detection" },
    ],
  },
  {
    version: "v1.1", date: "Jan 2026", kind: "Minor", title: "IIT Kharagpur",
    notes: [{ tag: "Won", text: "1st place, National Hackathon, IIT Kharagpur & Shiv Nadar University.", href: "/achievements#iit-kharagpur" }],
  },
  {
    version: "v1.0", date: "Dec 2025", kind: "Major", title: "First internship",
    notes: [
      { tag: "Joined", text: "AI Intern at Infosys Springboard: LLM-powered stock screening and real-time ML pipelines.", href: "/experience" },
      { tag: "Shipped", text: "ReLife OS: a 5-service reintegration platform in 5 Indian languages.", href: "/projects/relife-os" },
    ],
  },
  {
    version: "v0.4", date: "Nov 2025", kind: "Minor", title: "Agents interview",
    notes: [{ tag: "Shipped", text: "AI Mock Interview Platform: six CrewAI agents run a voice interview and score it.", href: "/projects/ai-mock-interview" }],
  },
  {
    version: "v0.3", date: "Oct 2025", kind: "Minor", title: "Marketing AI Hub",
    notes: [
      { tag: "Won", text: "1st place, AIM '25, Infynd India National Hackathon. 36 hours, ₹25,000, team Twin Innovators.", href: "/achievements#aim-25-infynd" },
      { tag: "Shipped", text: "Marketing AI Hub: XGBoost lead scoring and agentic email and SMS campaigns.", href: "/projects/marketing-ai-hub" },
    ],
  },
  {
    version: "v0.2", date: "Sep 2025", kind: "Minor", title: "First win",
    notes: [
      { tag: "Won", text: "1st place, Hackzilla '25, IEEE Comsoc Society & KPRIET, a 24-hour hackathon.", href: "/achievements#hackzilla-kpriet" },
      { tag: "Won", text: "Top 10 finalist, Gravitas '25, Vellore Institute of Technology, with AR Music Hub.", href: "/achievements#gravitas-vit" },
    ],
  },
  {
    version: "v0.1", date: "Jul 2025", kind: "Minor", title: "Out and about",
    notes: [
      { tag: "Attended", text: "AI Day for Startups, Google for Startups with AIC Raise, Coimbatore.", href: "/beyond" },
      { tag: "Won", text: "Rank 13, Dream11 IPL Gameathon 2.0, as team CricTech (May 2025).", href: "/achievements#dream11-gameathon" },
    ],
  },
  {
    version: "v0.0", date: "2023", kind: "Major", title: "Start",
    notes: [
      { tag: "Joined", text: "B.Tech in Artificial Intelligence and Data Science, Karpagam College of Engineering.", href: "/about" },
      { tag: "Joined", text: "Rotaract Club: Editor in 2023-24, DPP Chair in 2024-25.", href: "/beyond" },
    ],
  },
];
