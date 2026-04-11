import type { MetaFunction } from "@remix-run/node";
import { useTheme } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Animesh Nighojkar" },
    { name: "description", content: "AI Research Engineer & CTO. Ph.D. in Natural Language Processing. Founding Engineer at Actualization.AI." },
    { name: "keywords", content: "AI, Machine Learning, NLP, CTO, Research, Python, Transformers, GPT, BERT" },
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
              AI Research Engineer & CTO
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.92] tracking-tight text-[#111111] dark:text-[#EDE9E1]">
              Animesh<br />Nighojkar
            </h1>
            <p className={`mt-8 max-w-sm text-[15px] leading-relaxed ${MUTED}`}>
              Ph.D. in Natural Language Processing. Founding Engineer (CTO) at Actualization.AI.
              Principal Investigator on a $275K NSF SBIR grant.
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
              Founding Engineer (CTO) at{" "}
              <a href="https://actualization.ai" target="_blank" rel="noopener noreferrer" className={`${ACCENT} hover:opacity-70 transition-opacity`}>
                Actualization.AI
              </a>
              {" "}with a Ph.D. in Natural Language Processing from the{" "}
              <a href="https://www.usf.edu/" target="_blank" rel="noopener noreferrer" className={`${ACCENT} hover:opacity-70 transition-opacity`}>
                University of South Florida
              </a>.
              I seek roles where I can apply expertise in advanced language modeling,
              prompt engineering, and transformer-based architectures.
            </p>
            <p>
              Two impactful internships at Dropbox, five years of research at USF, and a win
              in an international legal reasoning competition — I have a track record of delivering
              innovative ML solutions that work in production.
            </p>
            <p className={`font-medium ${ACCENT}`}>
              Principal Investigator on a $275K NSF SBIR Phase-I grant.
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
          <div className="mt-10 space-y-6">
            {skillGroups.map(({ category, items }) => (
              <div key={category} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4 border-b border-[#111111]/5 dark:border-[#EDE9E1]/5">
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
        <ul className={`space-y-2 text-[14px] leading-relaxed text-[#111111]/70 dark:text-[#EDE9E1]/70`}>
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className={`mt-[6px] w-1 h-1 rounded-full flex-shrink-0 bg-[#C93D0E] dark:bg-[#FF6B35] opacity-60`} />
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
    title: "Founding Engineer and CTO",
    company: "Actualization.AI",
    companyUrl: "https://actualization.ai",
    location: "Tampa, FL",
    period: "Sep 2024 – Present",
    bullets: [
      "Principal Investigator (PI) on a $275K NSF SBIR Phase-I grant.",
      "Made the product 2× faster and 10× cheaper without compromising performance.",
      "Working with Tampa International Airport (TPA) and other companies on separate pilot programs.",
      "Creating LLM jailbreaks and prompt engineering techniques to test the robustness of AI systems.",
      "Led a team of four engineers to deliver an MVP in 10 days.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Dropbox",
    companyUrl: "https://dropbox.com",
    location: "Remote",
    period: "May – Aug 2023",
    bullets: [
      "Implemented end-to-end object removal from videos — users pause, click an object, and it's tracked and removed through the rest of the video.",
      "Cross-collaborated with front-end teams to ship the feature.",
      "Feature showcased at Dropbox Hack Week 2023. Won third place.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Dropbox",
    companyUrl: "https://dropbox.com",
    location: "Remote",
    period: "May – Aug 2022",
    bullets: [
      "Trained summarization models and deployed a document and transcript summarization service capable of handling theoretically infinite text length.",
      "Prototyped the UI for demonstration to the VP.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    company: "University of South Florida",
    companyUrl: "https://www.usf.edu/",
    location: "Tampa, FL",
    period: "Sep 2019 – Aug 2024",
    bullets: [
      "Prompt engineering for GPT-4 to create datasets with specific psychological and psychometric properties.",
      "Modeled semantic fluency tasks using transformers to understand human cognition and memory retrieval.",
      "Pre-trained BERT from scratch to explore how LLMs learn and understand language.",
      "Led a team of 8 researchers to win the COLIEE-2024 international legal reasoning competition.",
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
    items: ["Python", "C++", "Java", "Rust", "JavaScript", "SQL", "Scala", "R", "Bash", "LaTeX"],
  },
  {
    category: "Frameworks",
    items: ["PyTorch", "TensorFlow", "Keras", "Pandas", "NumPy", "Scikit-learn", "OpenCV", "Django", "Flask", "Docker", "AWS", "Google Cloud", "Kubernetes"],
  },
  {
    category: "AI / NLP",
    items: ["HuggingFace", "SpaCy", "NLTK", "Gensim", "StanfordNLP", "FastText", "Prompt Engineering", "AI Safety", "LLM Jailbreaks"],
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
    venue: "Ph.D. Dissertation · 2025",
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
