import type { MetaFunction } from "@remix-run/node";
import { useTheme } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Animesh Nighojkar" },
    { name: "description", content: "VP Engineering & PhD researcher at the intersection of NLP systems and production AI. PI on a $275K NSF SBIR grant. First place at COLIEE-2024." },
    { name: "keywords", content: "AI, Machine Learning, NLP, LLM, RAG, multi-agent, hallucination detection, legal AI, transformer" },
  ];
};

const ACCENT = "text-[#C93D0E] dark:text-[#FF6B35]";
const ACCENT_BORDER = "border-[#C93D0E] dark:border-[#FF6B35]";
const MUTED = "text-[#111111]/50 dark:text-[#EDE9E1]/50";
const RULE = "border-[#111111]/10 dark:border-[#EDE9E1]/10";

export default function Index() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#111111] dark:text-[#EDE9E1]">

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 w-full z-50 border-b ${RULE} bg-[#F8F6F1]/90 dark:bg-[#0D0D0B]/90 backdrop-blur-sm`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className={`font-mono text-sm tracking-[0.2em] uppercase ${MUTED} hover:text-[#C93D0E] dark:hover:text-[#FF6B35]`}>
            AN
          </a>
          <div className="flex items-center gap-6 md:gap-8">
            <div className={`hidden md:flex gap-8 font-mono text-xs tracking-widest uppercase ${MUTED}`}>
              <a href="#about"        className="hover:text-[#111111] dark:hover:text-[#EDE9E1] transition-colors">About</a>
              <a href="#experience"   className="hover:text-[#111111] dark:hover:text-[#EDE9E1] transition-colors">Experience</a>
              <a href="#publications" className="hover:text-[#111111] dark:hover:text-[#EDE9E1] transition-colors">Publications</a>
            </div>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className={`font-mono text-xs tracking-widest uppercase ${MUTED} hover:text-[#111111] dark:hover:text-[#EDE9E1] transition-colors`}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="pt-28 pb-16 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Left: text */}
          <div className="flex-1">
            <p className={`font-mono text-xs tracking-[0.25em] uppercase ${ACCENT} mb-8`}>
              VP Engineering · AI Research
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.92] tracking-tight text-[#111111] dark:text-[#EDE9E1]">
              Animesh<br />Nighojkar
            </h1>
            <p className={`mt-8 max-w-sm text-[15px] leading-relaxed ${MUTED}`}>
              PhD in NLP. Building production AI at the intersection of research
              and systems: multi-agent orchestration, RAG, hallucination detection.
              PI on a $275K NSF SBIR grant.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 font-mono text-xs tracking-wider">
              <a
                href="https://www.linkedin.com/in/anighojkar/"
                target="_blank"
                rel="noopener noreferrer"
                className={`border-b pb-px ${ACCENT_BORDER} ${ACCENT} hover:opacity-70 transition-opacity`}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://scholar.google.com/citations?user=aWECOUMAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className={`border-b pb-px ${ACCENT_BORDER} ${ACCENT} hover:opacity-70 transition-opacity`}
              >
                Google Scholar ↗
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="md:pt-2 flex-shrink-0">
            <img
              src="/AM-19.png"
              alt="Animesh Nighojkar"
              className="w-44 h-52 md:w-52 md:h-64 object-cover grayscale hover:grayscale-0"
              style={{ objectPosition: "center 10%" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Metadata strip */}
        <div className={`mt-16 pt-6 border-t ${RULE} flex flex-wrap gap-6 font-mono text-xs ${MUTED}`}>
          <span>Tampa, FL</span>
          <a href="mailto:a@nighojkar.com" className="hover:text-[#C93D0E] dark:hover:text-[#FF6B35] transition-colors">
            a@nighojkar.com
          </a>
          <a href="tel:+16463715208" className="hover:text-[#C93D0E] dark:hover:text-[#FF6B35] transition-colors">
            (646) 371-5208
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 max-w-5xl mx-auto px-6">
        <SectionLabel n="01" label="About" />
        <div className="mt-10 grid md:grid-cols-[1fr_2fr] gap-12">
          <div />
          <div className="space-y-5 text-[15px] leading-relaxed text-[#111111]/80 dark:text-[#EDE9E1]/80">
            <p>
              PhD in NLP and production ML engineer at{" "}
              <a href="https://actualization.ai" target="_blank" rel="noopener noreferrer" className={`${ACCENT} hover:opacity-70 transition-opacity`}>
                Actualization.AI
              </a>
              , building legal AI at the intersection of research and systems.
              I work across the full stack: multi-agent orchestration, hybrid RAG pipelines,
              hallucination detection, structured output validation, deployed at scale on AWS and Azure.
            </p>
            <p>
              PI on a $275K NSF SBIR Phase-I grant. Led an 8-person team to first place at{" "}
              <a href="https://sites.ualberta.ca/~rabelo/COLIEE2024/" target="_blank" rel="noopener noreferrer" className={`${ACCENT} hover:opacity-70 transition-opacity`}>
                COLIEE-2024
              </a>
              , the premier international legal reasoning AI competition. Two ML internships at Dropbox.
              Eight peer-reviewed publications across ACL, IJCAI, FLAIRS, and legal AI venues.
            </p>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className={`py-20 border-t ${RULE}`}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel n="02" label="Experience" />
          <div className="mt-10 space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceItem key={i} {...exp} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className={`py-20 border-t ${RULE}`}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel n="03" label="Education" />
          <div className="mt-10 space-y-0">
            {education.map((ed, i) => (
              <EducationItem key={i} {...ed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className={`py-20 border-t ${RULE}`}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel n="04" label="Skills" />
          <div className="mt-10 space-y-0">
            {skillGroups.map(({ category, items }) => (
              <div key={category} className={`grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5 border-b border-[#111111]/5 dark:border-[#EDE9E1]/5`}>
                <span className={`font-mono text-xs tracking-widest uppercase ${MUTED} pt-0.5`}>
                  {category}
                </span>
                <p className="text-[14px] leading-relaxed text-[#111111]/80 dark:text-[#EDE9E1]/80">
                  {items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications ── */}
      <section id="publications" className={`py-20 border-t ${RULE}`}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel n="05" label="Selected Publications" />
          <div className="mt-10 space-y-0">
            {publications.map((pub, i) => (
              <PublicationItem key={i} n={i + 1} {...pub} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t ${RULE} py-10`}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className={`font-mono text-xs tracking-[0.2em] uppercase ${MUTED}`}>
            Animesh Nighojkar
          </span>
          <span className={`font-mono text-xs ${MUTED}`}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>

    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className={`font-mono text-xs tracking-widest ${MUTED}`}>{n}</span>
      <h2 className="font-serif text-3xl md:text-4xl text-[#111111] dark:text-[#EDE9E1]">{label}</h2>
    </div>
  );
}

interface Experience {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  bullets: string[];
}

function ExperienceItem({ title, company, companyUrl, location, period, bullets }: Experience) {
  return (
    <div className={`py-10 border-b ${RULE} grid md:grid-cols-[200px_1fr] gap-6 md:gap-12`}>
      <div className="md:pt-1">
        <span className={`font-mono text-xs tracking-wide ${MUTED}`}>{period}</span>
      </div>
      <div>
        <h3 className="text-lg font-medium text-[#111111] dark:text-[#EDE9E1] mb-1">{title}</h3>
        <p className="mb-4">
          <a href={companyUrl} target="_blank" rel="noopener noreferrer" className={`font-mono text-xs tracking-wider uppercase ${ACCENT} hover:opacity-70 transition-opacity`}>
            {company}
          </a>
          <span className={`font-mono text-xs ml-3 ${MUTED}`}>{location}</span>
        </p>
        <ul className="space-y-2.5 text-[14px] leading-relaxed text-[#111111]/70 dark:text-[#EDE9E1]/70">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0 bg-[#C93D0E] dark:bg-[#FF6B35] opacity-60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface Education {
  degree: string;
  institution: string;
  institutionUrl: string;
  year: string;
}

function EducationItem({ degree, institution, institutionUrl, year }: Education) {
  return (
    <div className={`py-8 border-b ${RULE} grid md:grid-cols-[200px_1fr] gap-4 md:gap-12`}>
      <span className={`font-mono text-xs tracking-wide ${MUTED} md:pt-1`}>{year}</span>
      <div>
        <h3 className="text-base font-medium text-[#111111] dark:text-[#EDE9E1] mb-1">{degree}</h3>
        <a href={institutionUrl} target="_blank" rel="noopener noreferrer" className={`font-mono text-xs tracking-wider uppercase ${ACCENT} hover:opacity-70 transition-opacity`}>
          {institution}
        </a>
      </div>
    </div>
  );
}

interface Publication {
  title: string;
  venue: string;
  authors: string;
  link?: string;
}

function PublicationItem({ n, title, venue, authors, link }: Publication & { n: number }) {
  return (
    <div className={`py-8 border-b ${RULE} grid md:grid-cols-[200px_1fr] gap-4 md:gap-12`}>
      <span className={`font-mono text-xs tracking-wide ${MUTED} md:pt-1`}>
        {String(n).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-[15px] font-medium text-[#111111] dark:text-[#EDE9E1] leading-snug mb-2">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              {title}
            </a>
          ) : title}
        </h3>
        <p className={`font-mono text-xs tracking-wide ${ACCENT} mb-1`}>{venue}</p>
        <p className={`text-xs ${MUTED}`}>{authors}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center mt-3 font-mono text-xs tracking-wider ${ACCENT} hover:opacity-70 transition-opacity`}
          >
            View ↗
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Data ── */

const experiences: Experience[] = [
  {
    title: "VP, Engineering",
    company: "Actualization.AI",
    companyUrl: "https://actualization.ai",
    location: "Tampa, FL",
    period: "Sep 2025 – Present",
    bullets: [
      "Delivered two independent production LLM systems: a multi-agent contract analysis platform on AWS (LangGraph, SageMaker, OpenSearch) and SquarePact on Azure (Anthropic Foundry, Azure OpenAI, AI Search). Enabled comparative study of orchestration approaches (LangGraph vs. DeepAgents) and retrieval architectures across cloud environments.",
      "Engineered 80+ domain-specific LLM personas with Pydantic schema validation for structured output extraction; architected SquarePact's DeepAgents framework (Claude Haiku/Sonnet, GPT-4) with specialized subagent roles, generating empirical findings on agent specialization, output reliability, and failure mode distribution at scale.",
      "Built and benchmarked two retrieval pipelines: SageMaker embeddings to OpenSearch with 256-concurrent asyncio ops (90% latency cut, 70% cost cut); and SquarePact's hybrid RAG on Azure AI Search with dense (text-embedding-3-large, 3072-dim), BM25, and hybrid modes with TTL caching.",
      "Invented a novel self-healing structured output pipeline (Regex to Python AST to Generative Repair) that guarantees valid JSON from any LLM response, eliminating production parse failures with no latency penalty for well-formed outputs. A general decoding fallback applicable beyond this system.",
      "Designed a two-agent document editing pipeline: a reasoning agent proposes edits in Markdown while a constraint-enforcing verifier subagent converts to OOXML with formal preservation guarantees on paragraph structure, hyperlinks, and embedded objects, synced to OneDrive via Microsoft Graph.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "Actualization.AI",
    companyUrl: "https://actualization.ai",
    location: "Tampa, FL",
    period: "Sep 2024 – Sep 2025",
    bullets: [
      "PI on a $275K NSF SBIR Phase-I grant for legal AI; designed and shipped hallucination detection infrastructure: reproducible CI/CD for prompt templating, generation tracing, and automated LLM safety benchmarking with standardized adversarial robustness metrics.",
      "Built production Playwright scrapers for large-scale legal corpus acquisition (proxy rotation, anti-bot evasion, CAPTCHA solving, rate-limit backoff, 99% uptime), providing the training and evaluation data pipeline for NLP research on hallucination in high-stakes legal reasoning.",
      "Built and open-sourced tireKicker (GPL-3.0), a Python CLI for systematic adversarial probing of conversational AI, operationalizing the NSF-funded safety evaluation methodology into a reproducible, community-accessible benchmarking tool.",
      "Built a high-throughput RAG research assistant platform with vector search over scientific literature and containerized Python + TypeScript microservices on Kubernetes, enabling scalable, reproducible NLP research workflows for literature retrieval, hypothesis exploration, and experiment tracking.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Dropbox",
    companyUrl: "https://dropbox.com",
    location: "Remote",
    period: "May – Aug 2023",
    bullets: [
      "Implemented an end-to-end video object removal pipeline (interactive segmentation on a paused frame, temporal tracking, seamless inpainting), validating the practical viability of chaining CV methods in a real-time production pipeline; integrated with front-end and placed 3rd at Dropbox Hack Week 2023.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Dropbox",
    companyUrl: "https://dropbox.com",
    location: "Remote",
    period: "May – Aug 2022",
    bullets: [
      "Trained and deployed a long-document summarization service with no context ceiling; designed hierarchical chunking and aggregation strategies to extend transformer summarization beyond fixed context windows, and prototyped the full-stack UI for VP demonstration.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    company: "University of South Florida",
    companyUrl: "https://www.usf.edu/",
    location: "Tampa, FL",
    period: "Sep 2019 – Aug 2024",
    bullets: [
      "Led an 8-person team to 1st place at COLIEE-2024 (the premier international legal reasoning AI competition); engineered prompting strategies and retrieval pipelines for legal entailment and statute retrieval, contributing novel architectures published in New Frontiers in Artificial Intelligence.",
      "Conducted foundational NLP research across three lines: pre-trained BERT from scratch to investigate transformer learning dynamics; modeled human semantic fluency and memory retrieval with transformers (IJCAI 2022); engineered GPT-4 pipelines for psychometric dataset construction and AI persona studies (arXiv 2025). 8 publications across ACL, IJCAI, FLAIRS, and legal AI venues.",
    ],
  },
];

const education: Education[] = [
  {
    degree: "Ph.D. in Computer Science and Engineering",
    institution: "University of South Florida",
    institutionUrl: "https://www.usf.edu/",
    year: "Aug 2024",
  },
  {
    degree: "M.S. in Computer Science and Engineering",
    institution: "University of South Florida",
    institutionUrl: "https://www.usf.edu/",
    year: "Dec 2021",
  },
  {
    degree: "B.E. in Computer Science and Engineering",
    institution: "Rajiv Gandhi Technical University",
    institutionUrl: "https://www.rgpv.ac.in/",
    year: "May 2019",
  },
];

const skillGroups = [
  {
    category: "Languages",
    items: ["Python", "C++", "Java", "Rust", "JavaScript", "TypeScript", "SQL", "Scala", "Bash", "LaTeX"],
  },
  {
    category: "ML / AI",
    items: ["PyTorch", "TensorFlow", "HuggingFace", "LangGraph", "LangChain", "OpenAI SDK", "Anthropic SDK", "Pydantic", "Scikit-learn"],
  },
  {
    category: "Systems",
    items: ["AWS (SageMaker, OpenSearch, Lambda)", "Azure (OpenAI, AI Search, Container Apps, Cosmos DB)", "Docker", "Kubernetes", "FastAPI", "Django"],
  },
  {
    category: "NLP / Research",
    items: ["SpaCy", "NLTK", "Gensim", "StanfordNLP", "Prompt Engineering", "RAG", "Hallucination Detection", "AI Safety", "Adversarial Evaluation"],
  },
];

const publications: Publication[] = [
  {
    title: "Giving AI Personalities Leads to More Human-Like Reasoning",
    venue: "arXiv · 2025",
    authors: "A. Nighojkar, B. Moydinboyev, M. Duong, J. Licato",
    link: "https://arxiv.org/abs/2502.14155",
  },
  {
    title: "An Inference-Centric Approach to Natural Language Processing and Cognitive Modeling",
    venue: "Ph.D. Dissertation · 2024",
    authors: "A. Nighojkar",
    link: "https://digitalcommons.usf.edu/etd/10546/",
  },
  {
    title: "AMHR COLIEE 2024 Entry: Legal Entailment and Retrieval",
    venue: "New Frontiers in Artificial Intelligence · 2024",
    authors: "A. Nighojkar, K. Jiang, L. Fields, O. Bilgin, S. Steinle, Y. Sadybekov, Z. Marji, J. Licato",
    link: "https://link.springer.com/chapter/10.1007/978-981-97-3076-6_14",
  },
  {
    title: "Exploring Prompting Approaches in Legal Textual Entailment",
    venue: "The Review of Socionetwork Strategies · 2024",
    authors: "O. Bilgin, L. Fields, A. Laverghetta Jr, Z. Marji, A. Nighojkar, S. Steinle, J. Licato",
    link: "https://link.springer.com/article/10.1007/s12626-023-00154-y",
  },
  {
    title: "No Strong Feelings One Way or Another: Re-operationalizing Neutrality in Natural Language Inference",
    venue: "17th Linguistic Annotation Workshop · 2023",
    authors: "A. Nighojkar, A. Laverghetta Jr, J. Licato",
    link: "https://aclanthology.org/2023.law-1.20/",
  },
  {
    title: "Cognitive Modeling of Semantic Fluency Using Transformers",
    venue: "IJCAI: Cognitive Aspects of Knowledge Representation · 2022",
    authors: "A. Nighojkar, A. Khlyzova, J. Licato",
    link: "https://arxiv.org/abs/2208.09719",
  },
  {
    title: "Improving Paraphrase Detection with the Adversarial Paraphrasing Task",
    venue: "ACL · 2021",
    authors: "A. Nighojkar, J. Licato",
    link: "https://aclanthology.org/2021.acl-long.552/",
  },
  {
    title: "Mutual Implication as a Measure of Textual Equivalence",
    venue: "FLAIRS Conference · 2021",
    authors: "A. Nighojkar, J. Licato",
    link: "https://journals.flvc.org/FLAIRS/article/view/128519",
  },
];
