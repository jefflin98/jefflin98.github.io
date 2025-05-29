import React, { useState } from "react";

const research = [
  {
    title: "Mobile & Ubiquitous Interaction Lab, Taiwan",
    period: "Sep 2019 - Jun 2021",
    role: "Research Assistant",
    bullets: [
      "Led first-author mixed-methods study on smartphone notification management (CHI’21, 20+ citations).",
      "Designed novel data collection combining ESM with drag-n-drop UI; ran 4-week field deployment (N=34).",
      "Built Android app to collect sensor data, screenshots, and ESM responses for 3 research projects.",
      "Analyzed data, identified notification types/patterns; presented design and research implications.",
    ],
  },
  {
    title: "Networking and Mobile Systems Lab, Taiwan",
    period: "Jan 2021 - May 2021",
    role: "Research Assistant",
    bullets: [
      "Predicted smartphone users’ time-killing moments via screenshots & sensor data (83% precision).",
      "Trained LSTM model for indoor-outdoor detection using sensor/cellular data (90% accuracy).",
    ],
  },
  {
    title: "Amazon Echo Multimodal UX",
    period: "Columbia University, Fall 2022",
    role: "",
    bullets: [
      "Comparative analysis of onboarding and ambient displays UX on Google Nest vs. Amazon Echo.",
      "Identified 3 key pain points and 3 opportunities.",
    ],
  },
  {
    title: "Emotion-Aware Topic-Switching Dialogue System",
    period: "Columbia University, Fall 2022",
    role: "",
    bullets: [
      "Fine-tuned BERT for emotion recognition and topic-switch prediction.",
      "Leveraged emotional context from past 3 turns to improve F1 score by 3%.",
    ],
  },
  {
    title: "Yelp Fake Reviews Detection",
    period: "Columbia University, Spring 2022",
    role: "",
    bullets: [
      "Built full-stack prototype with BERT-based fake review detection and rating calibration via regression model.",
      "User study (N=10) reported 30% increase in perceived rating reliability.",
    ],
  },
];

const engineer = [
  {
    title: "Amazon Web Services (AWS)",
    period: "Jan 2025 - Present",
    role: "Software Development Engineer, AI Observability Assistant Initiative",
    bullets: [
      "Investigated LLM-powered troubleshooting workflows, prototyped Bedrock agent with Anthropic Claude 4 integration.",
      "Designed prompts and retrieval strategies with LangChain across two internal databases and 10+ technical documents.",
      "Conducted internal user testing (N=20); achieved 80% task success rate for natural language query alignment.",
    ],
  },
  {
    title: "Amazon Web Services (AWS)",
    period: "Feb 2023 - Present",
    role: "Software Development Engineer, Cloud Observability",
    bullets: [
      "Built scalable telemetry pipeline using S3 and Spark to support 10+ TB/month of observability data analysis.",
      "Designed analytics interfaces using Redshift and QuickSight, reducing diagnosis time by 30%.",
      "Standardized telemetry schemas across five teams, reducing computing resource usage by 50%.",
      "Analyzed scaling trade-offs between Glue and Lambda for high-throughput data transformation.",
    ],
  },
  {
    title: "Amazon Web Services (AWS)",
    period: "Summer 2022",
    role: "Software Development Engineer Intern",
    bullets: [
      "Developed and shipped production-ready React web app for custom end-to-end environment creation.",
      "Reduced setup time from 4+ hours to 20 minutes for 50+ internal users.",
    ],
  },
  {
    title: "IsLunch (YC Startup)",
    period: "2021",
    role: "Co-Founder / Engineer",
    bullets: [
      "Led 4-person team to build food-ordering and loyalty app using Flutter, Stripe, Clover API.",
      "Improved checkout flow and boosted retention for 10+ local restaurants.",
    ],
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
      ${masked ? "opacity-30 grayscale pointer-events-none select-none" : "opacity-100"}
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
            <hr className="border-t-2 border-muted mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Work() {
  const [hover, setHover] = React.useState<null | "research" | "engineer">(null);

  const researchMasked = hover === "engineer";
  const engineerMasked = hover === "research" || hover === null;

  return (
    <div className="w-full flex justify-center">
      <section
        className="relative max-w-6xl w-full pt-10 px-4 flex flex-col"
        style={{ userSelect: "none" }}
      >
        {/* Hover overlays */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 z-20"
          onMouseEnter={() => setHover("research")}
          onMouseLeave={() => setHover(null)}
          style={{ pointerEvents: "auto" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/2 z-20"
          onMouseEnter={() => setHover("engineer")}
          onMouseLeave={() => setHover(null)}
          style={{ pointerEvents: "auto" }}
        />

        {/* Panels */}
        <div className="flex flex-row w-full relative z-10">
          {/* Research side */}
          <div
            className={`
              w-[56%] 
              -mr-15
              transition-all duration-300
              ${
                hover === "engineer"
                  ? "-translate-x-8 z-0"
                  : hover === "research"
                  ? "translate-x-8 z-30 scale-105 shadow-2xl"
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
          {/* Engineer side */}
          <div
            className={`
              w-[56%] 
              -ml-15 
              transition-all duration-300
              ${
                hover === "research"
                  ? "translate-x-8 z-0"
                  : hover === "engineer"
                  ? "-translate-x-8 z-30 scale-105 shadow-2xl"
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
        </div>
      </section>
    </div>
  );
}