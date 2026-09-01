/**
 * programsData.ts
 *
 * Single source of truth for the Vnertia Education programs.
 * Contains copy, syllabus modules, format descriptions, and instructor metadata.
 */

export interface SyllabusModule {
  title: string;
  description: string;
}

export interface InstructorDetails {
  isConfirmed: boolean;
  name: string;
  role: string;
  company: string;
  verifiedText?: string;
  bio?: string;
  experience?: string;
  teaches?: string;
}

export interface Program {
  slug: string;
  title: string;
  shortDescription: string;
  curatorLabel: string;
  instructor: InstructorDetails;
  syllabus: SyllabusModule[];
  format: string;
}

export const PROGRAMS: Program[] = [
  {
    slug: "growth-marketing",
    title: "Growth & Performance Marketing",
    shortDescription: "Learn how a real growth team plans, runs, and scales paid campaigns — built from the day-to-day work of someone doing this job right now, not a textbook version of it.",
    curatorLabel: "working growth marketing professional",
    instructor: {
      isConfirmed: false,
      name: "[Instructor to be confirmed]",
      role: "[Role]",
      company: "[Company]",
    },
    format: "Live sessions, practical assignments, direct feedback. Exact schedule shared once you register.",
    syllabus: [
      {
        title: "Performance Marketing Fundamentals",
        description: "Funnels, KPIs, and how a growth team actually gets measured."
      },
      {
        title: "Paid Search & Google Ads",
        description: "Campaign structure, bidding, and keyword strategy."
      },
      {
        title: "Paid Social & Meta Ads",
        description: "Audience targeting, creative testing, and budget allocation."
      },
      {
        title: "Measurement & Attribution",
        description: "Tracking setup, conversion tracking, and reading a dashboard."
      },
      {
        title: "Budget Planning & Scaling",
        description: "Allocating spend across channels and deciding what to scale."
      },
      {
        title: "Experimentation & Optimization",
        description: "A/B testing, creative iteration, and conversion rate improvements."
      },
      {
        title: "Real Campaign Case Study",
        description: "A live teardown of a campaign the instructor has actually run."
      },
      {
        title: "Capstone Project",
        description: "Build and present a campaign plan, with direct instructor feedback."
      }
    ]
  },
  {
    slug: "brand-marketing",
    title: "Brand & Content Marketing",
    shortDescription: "Learn how a real brand team builds identity, plans content, and reacts to the moment — from someone who does this as their actual job.",
    curatorLabel: "working brand & content professional",
    instructor: {
      isConfirmed: false,
      name: "[Instructor to be confirmed]",
      role: "[Role]",
      company: "[Company]",
    },
    format: "Live sessions, practical assignments, direct feedback. Exact schedule shared once you register.",
    syllabus: [
      {
        title: "Brand Foundations",
        description: "Positioning, voice, and identity."
      },
      {
        title: "Content Strategy",
        description: "Planning content around business goals and audience, not just a content calendar."
      },
      {
        title: "Organic & Social Growth",
        description: "SEO fundamentals and social content systems."
      },
      {
        title: "Real-Time & Moment Marketing",
        description: "Responding to trends and cultural moments in a brand-safe way."
      },
      {
        title: "Content Production Workflow",
        description: "Briefs, creative collaboration, and review cycles."
      },
      {
        title: "Measuring Brand & Content Impact",
        description: "Engagement, reach, and brand-lift signals."
      },
      {
        title: "Real Brand Case Study",
        description: "A live walkthrough of a campaign or content push the instructor has run."
      },
      {
        title: "Capstone Project",
        description: "Build and present a brand/content plan, with direct instructor feedback."
      }
    ]
  },
  {
    slug: "analytics",
    title: "Analytics",
    shortDescription: "Learn how a working analyst handles the full flow of data — from raw numbers sitting in a warehouse to the insight a business team actually acts on — and how AI tools are changing what an analyst's day-to-day work looks like.",
    curatorLabel: "Senior Growth Analyst (Martech & AI) at Swiggy",
    instructor: {
      isConfirmed: true,
      name: "Anupam",
      role: "Senior Martech & AI Data Analyst, Central Growth",
      company: "Swiggy",
      verifiedText: "Currently employed, verified",
      experience: "5+ years of experience",
      bio: "Hi folks, I'm Anupam. I work as a Senior Martech & AI Data Analyst in Central Growth at Swiggy, with 5+ years of experience helping cross-functional business teams with end-to-end insights, analysis, and forecasting. I have a strong focus on AI, which I use daily in martech to help teams build tools and automate manual work.",
    },
    format: "Live sessions, practical assignments, direct feedback from a working professional. Exact schedule shared once you register.",
    syllabus: [
      {
        title: "The Data Flow",
        description: "How raw data moves from source to insight, and where an analyst sits across engineering, analysis, and decision-making."
      },
      {
        title: "SQL & Data Fundamentals",
        description: "Querying and working with real business data."
      },
      {
        title: "Data Warehousing Basics",
        description: "How modern data pipelines work, using Snowflake, Databricks, and Airflow."
      },
      {
        title: "Reporting & Dashboards",
        description: "Building dashboards business teams actually use, with Power BI/Tableau and Excel."
      },
      {
        title: "AI-Powered Analytics",
        description: "Using AI tools like Claude and ChatGPT to speed up analysis and cut down manual work."
      },
      {
        title: "Workflow Automation",
        description: "Automating reporting and cross-functional processes with n8n and AI tooling."
      },
      {
        title: "Real Business Case Study",
        description: "A live walkthrough of a cross-functional growth/martech problem solved with data."
      },
      {
        title: "Capstone Project",
        description: "Build an end-to-end analysis or automation project, with direct instructor feedback."
      }
    ]
  },
  {
    slug: "ui-ux",
    title: "UI/UX Design",
    shortDescription: "Learn how a real product team researches, designs, and ships user experiences — from someone doing this work inside a live product team right now.",
    curatorLabel: "working product designer",
    instructor: {
      isConfirmed: false,
      name: "[Instructor to be confirmed]",
      role: "[Role]",
      company: "[Company]",
    },
    format: "Live sessions, practical assignments, direct feedback. Exact schedule shared once you register.",
    syllabus: [
      {
        title: "Product Thinking Foundations",
        description: "Framing a problem before jumping to a solution."
      },
      {
        title: "User Research",
        description: "Interviews, surveys, and turning findings into insight."
      },
      {
        title: "Information Architecture & Wireframing",
        description: "Structuring user journeys and sketching layouts."
      },
      {
        title: "Visual & Interaction Design",
        description: "Design systems, UI layout, and interactive prototyping."
      },
      {
        title: "Usability Testing & Iteration",
        description: "Testing flows with real users and refining them."
      },
      {
        title: "Working with Product & Engineering",
        description: "Developer handoff and collaboration inside a real product squad."
      },
      {
        title: "Real Product Case Study",
        description: "A walkthrough of a feature or flow the instructor has actually shipped."
      },
      {
        title: "Capstone Project",
        description: "Design and present a product flow, with direct instructor feedback."
      }
    ]
  }
];
