import React, { useState } from "react";

const research = [
  {
    title: "Mobile & Ubiquitous Interaction Lab",
    period: "Sep 2019 - Jun 2021",
    role: "Research Assistant, Taiwan",
    bullets: [
      "Led first-author mixed-methods study on smartphone notification management, published at CHI’21 with 20+ citations.",
      "Designed novel data collection combining ESM with drag-n-drop UI; ran 4-week field deployment with 34 participants.",
      "Built Android app to collect sensor data, screenshots, and ESM responses, enabling model training for 3 research projects.",
      "Analyzed data and identified notification types shaped by content and user context, presented research insights at CHI’21.",
    ],
  },
  {
    title: "Networking and Mobile Systems Lab",
    period: "Jan 2021 - May 2021",
    role: "Research Assistant, Taiwan",
    bullets: [
      "Predicted smartphone users’ time-killing moments via screenshots and sensor data with 80% accuracy and 83% precision.",
      "Trained LSTM model for indoor-outdoor detection using sensor and cellular signal data, achieved 90% accuracy.",
    ],
  },
];

const engineer = [
  {
    title: "Amazon Web Services (AWS)",
    period: "Jan 2025 - Present",
    role: "Software Development Engineer, AI Observability Assistant, Seattle, WA",
    bullets: [
      "Investigated LLM-powered troubleshooting workflows, prototyped Bedrock agent with Anthropic Claude 4 integration.",
      "Designed prompts and retrieval strategies with LangChain across two internal databases and 10+ technical documents.",
      "Conducted internal user testing (N=20) to evaluate natural language query alignment, achieving 80% task success rate.",
    ],
  },
  {
    title: "Amazon Web Services (AWS)",
    period: "Feb 2023 - Present",
    role: "Software Development Engineer, Cloud Observability, Seattle, WA",
    bullets: [
      "Built scalable telemetry data pipeline using S3 and Apache Spark, warehousing 10+ TB/month data across global regions.",
      "Designed and evaluated analytics interfaces using Redshift and QuickSight, reduced data-driven diagnosis time by 30%.",
      "Developed data enrichment service via Java and Lambda, improving data quality by 30% and ensuring 99% availability.",
      "Standardized schema across 5 services and 10 engineers, unifying cross-team pipelines and cutting compute costs by 50%.",
      "Analyzed scaling trade-offs between Glue and Lambda, informing design for high-throughput data transformation.",
    ],
  },
];

const projects = [
  {
    title: "Multimodal Personal Assistant UX",
    context: "Columbia University, Fall 2022",
    bullets: [
      "Conducted comparative analysis of onboarding and ambient displays UX on Google Nest Hub vs. Amazon Echo Show.",
      "Identified 3 key pain points and 3 opportunities.",
    ],
  },
  {
    title: "Emotion-Aware Topic-Switching Dialogue System",
    context: "Columbia University, Fall 2022",
    bullets: [
      "Fine-tuned BERT for emotion recognition and topic-switch prediction.",
      "Leveraged emotional context from past 3 turns to improve F1 score by 3%.",
    ],
  },
  {
    title: "E2E Testing Console",
    context: "AWS Internship, Summer 2022",
    bullets: [
      "Developed and shipped production-ready React web app to streamline custom end-to-end environment creation.",
      "Reduced setup time from 4+ hours to 20 minutes for 50+ engineers.",
    ],
  },
  {
    title: "Yelp Fake Reviews Detection",
    context: "Columbia University, Spring 2022",
    bullets: [
      "Built full-stack prototype with BERT-based fake review detection and rating calibration via regression model.",
      "Improved 30% user-perceived rating trustworthiness (N=10).",
    ],
  },
  {
    title: "IsLunch Local Restaurant Loyalty App",
    context: "YC Startup, 2021",
    bullets: [
      "Led 4-person team to build food-ordering and loyalty app using Flutter and Stripe, Clover API integration.",
      "Improved checkout flow and boosted retention for 10+ local restaurants.",
    ],
  },
];

const education = [
  {
    school: "Columbia University",
    period: "Sep 2021 - Dec 2022",
    location: "New York, NY",
    degree: "M.S. in Computer Science, Machine Learning Track, GPA: 3.8/4.0",
    bullets: [
      "Courses: Human-Computer Interaction (HCI), Dialog Systems, Natural Language Processing, Deep Learning, User Interface Design, Cloud Computing & Big Data Systems, Computer Systems for Data Science",
      "Teaching Assistant: User Interface Design",
      "Research Group: Computational Design Lab",
    ],
  },
  {
    school: "National Chiao Tung University",
    period: "Sep 2016 - June 2020",
    location: "Taiwan",
    degree: "B.S. in Computer Science, GPA: 4.1/4.3",
    bullets: [
      "Courses: Artificial Intelligence (AI), Machine Learning (ML), Data Mining, Interactive Design and Virtual Reality, Database Systems, Object-Oriented Programming, Technology Entrepreneurship",
      "Exchange Program: University of Illinois at Urbana-Champaign (2020), University College London (2017)",
    ],
  },
];

const skills = [
  "Python, JavaScript, TypeScript, Java, C++, Swift, React, Node.js, Git",
  "PyTorch, NumPy, Pandas, SQL, Apache Spark, LangChain, AWS (EC2, Redshift, Bedrock, SageMaker)",
  "Experience Sampling Method (ESM), User Interview, Usability Testing, Survey & Experiment Design",
];

const publications = [
  {
    citation:
      "Lin, T.-C. et al. “Put it on the Top, I’ll Read it Later”: Investigating Users’ Desired Display Order for Smartphone Notifications. In CHI ’21.",
    link: "https://doi.org/10.1145/3411764.3445384",
  },
  {
    citation:
      "Lin, T.-C. et al. “A Preliminary Investigation of the Mismatch between Attendance Order and Desired Display Order of Smartphone Notifications”. In UbiComp-ISWC’20.",
    link: "https://doi.org/10.1145/3410530.3414384",
  },
];

function ExperienceList({
  items,
  masked,
}: {
  items: typeof research;
  masked?: boolean;
}) {
  return (
    <div
      className={`px-6 py-4 transition-all duration-300 ease-in-out
      ${masked ? "opacity-30 grayscale" : "opacity-100"}
      `}
    >
      {items.map((entry, idx) => (
        <div key={idx} className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
            <span className="font-semibold text-lg text-fg">{entry.title}</span>
            <span className="text-sm text-muted md:ml-4">{entry.period}</span>
          </div>
          {entry.role && (
            <div className="italic text-accent text-sm mb-1">{entry.role}</div>
          )}
          <ul className="list-disc ml-5 text-fg text-sm space-y-1">
            {entry.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {idx !== items.length - 1 && (
            <hr className="border-t-2 border-muted mt-6 mb-8" />
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectList() {
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-6 text-center text-accent">Projects</div>
      {projects.map((proj, idx) => (
        <div key={idx} className="mb-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
            <span className="font-semibold text-md text-fg">{proj.title}</span>
            <span className="text-xs text-muted md:ml-4">{proj.context}</span>
          </div>
          <ul className="list-disc ml-5 text-fg text-sm space-y-1">
            {proj.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationList() {
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-6 text-center text-accent">Education</div>
      {education.map((edu, idx) => (
        <div key={idx} className="mb-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
            <span className="font-semibold text-md text-fg">{edu.school}</span>
            <span className="text-xs text-muted md:ml-4">{edu.period}</span>
          </div>
          <div className="italic text-accent text-sm mb-1">{edu.degree}</div>
          <div className="text-xs text-muted mb-1">{edu.location}</div>
          <ul className="list-disc ml-5 text-fg text-sm space-y-1">
            {edu.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SkillsList() {
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-4 text-center text-accent">Skills</div>
      <ul className="list-disc ml-5 text-fg text-sm space-y-1">
        {skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function PublicationList() {
  return (
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-4 text-center text-accent">Publications</div>
      <ul className="list-disc ml-5 text-fg text-sm space-y-1">
        {publications.map((p, i) => (
          <li key={i}>
            {p.citation}{" "}
            <a
              href={p.link}
              className="text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              [link]
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Work() {
  const [hover, setHover] = React.useState<null | "research" | "engineer">(null);

  const researchMasked = hover === "engineer" || hover === null;
  const engineerMasked = hover === "research";

  return (
    <div className="w-full flex flex-col items-center">
      <section
        className="relative max-w-6xl w-full pt-10 px-4 flex flex-col"
        style={{ userSelect: "auto" }} // <-- allow text selection globally
      >
        {/* Panels */}
        <div className="flex flex-row w-full relative z-10">
          {/* Engineer side */}
          <div
            onMouseEnter={() => setHover("engineer")}
            onMouseLeave={() => setHover(null)}
            className={`
              w-[56%]
              -mr-15
              transition-all duration-300
              ${
                hover === "research"
                  ? "-translate-x-8 z-0"
                  : hover === "engineer"
                  ? "translate-x-8 z-30 scale-105"
                  : "z-10"
              }
            `}
            style={{ minWidth: 0 }}
          >
            <div
              className={`font-bold text-xl mb-6 text-center select-none transition-all duration-300 ${
                engineerMasked ? "opacity-30 grayscale" : "text-accent opacity-100"
              }`}
            >
              Engineer
            </div>
            <ExperienceList items={engineer} masked={engineerMasked} />
          </div>
          {/* Research side */}
          <div
            onMouseEnter={() => setHover("research")}
            onMouseLeave={() => setHover(null)}
            className={`
              w-[56%]
              -ml-15
              transition-all duration-300
              ${
                hover === "engineer"
                  ? "translate-x-8 z-0"
                  : hover === "research"
                  ? "-translate-x-8 z-30 scale-105"
                  : "z-10"
              }
            `}
            style={{ minWidth: 0 }}
          >
            <div
              className={`font-bold text-xl mb-6 text-center select-none transition-all duration-300 ${
                researchMasked ? "opacity-30 grayscale" : "text-accent opacity-100"
              }`}
            >
              Research
            </div>
            <ExperienceList items={research} masked={researchMasked} />
          </div>
        </div>

        {/* Projects */}
        <div className="flex flex-row w-full relative z-10 mt-12">
          <div className="w-full">
            <ProjectList />
          </div>
        </div>
        {/* Education */}
        <div className="flex flex-row w-full relative z-10 mt-12">
          <div className="w-full">
            <EducationList />
          </div>
        </div>
        {/* Skills */}
        <div className="flex flex-row w-full relative z-10 mt-12">
          <div className="w-full">
            <SkillsList />
          </div>
        </div>
        {/* Publications */}
        <div className="flex flex-row w-full relative z-10 mt-12 mb-20">
          <div className="w-full">
            <PublicationList />
          </div>
        </div>
      </section>
    </div>
  );
}