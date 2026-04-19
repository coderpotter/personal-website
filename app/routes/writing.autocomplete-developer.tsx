import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "The Autocomplete Developer — Animesh Nighojkar, Ph.D." },
  {
    name: "description",
    content:
      "How AI is rewiring developer brains and manufacturing a generation of highly productive people who don't understand what they're building.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useReveal(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { ref, count };
}

// ── Primitive components ──────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Stat({
  target,
  label,
  suffix = "",
  prefix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, count } = useCounter(target);
  return (
    <div ref={ref} className="py-20 text-center">
      <div className="font-serif text-[clamp(5rem,18vw,11rem)] leading-none text-[#C93D0E] dark:text-[#FF6B35] tabular-nums">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-5 font-mono text-xs tracking-[0.25em] uppercase text-[#111111]/35 dark:text-[#EDE9E1]/35">
        {label}
      </p>
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="my-20 pl-8 md:pl-14 border-l-[3px] border-[#C93D0E] dark:border-[#FF6B35]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: "opacity 1s ease, transform 1s ease",
      }}
    >
      <p className="font-serif text-2xl md:text-3xl leading-snug text-[#111111] dark:text-[#EDE9E1]">
        {children}
      </p>
    </div>
  );
}

function ChapterHeader({ n, title }: { n: string; title: string }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div
      ref={ref}
      className="relative mt-28 mb-14 py-16"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.9s ease",
      }}
    >
      {/* Ghost number behind title */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
        aria-hidden
        style={{
          opacity: visible ? 0.035 : 0,
          transition: "opacity 1.4s ease 200ms",
        }}
      >
        <span className="font-serif text-[clamp(8rem,28vw,18rem)] leading-none text-[#111111] dark:text-[#EDE9E1]">
          {n}
        </span>
      </div>
      <div className="relative z-10">
        <p className="font-mono text-xs tracking-[0.35em] uppercase text-[#C93D0E] dark:text-[#FF6B35] mb-5">
          Chapter {n}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] text-[#111111] dark:text-[#EDE9E1]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function TableRow({
  label,
  manual,
  ai,
  index,
}: {
  label: string;
  manual: string;
  ai: string;
  index: number;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="grid grid-cols-3 border-b border-[#111111]/8 dark:border-[#EDE9E1]/8 last:border-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.65s ease ${index * 90}ms, transform 0.65s ease ${index * 90}ms`,
      }}
    >
      <div className="p-4 font-mono text-[11px] tracking-wide text-[#111111]/45 dark:text-[#EDE9E1]/45 leading-relaxed">
        {label}
      </div>
      <div className="p-4 text-[13px] leading-relaxed text-[#111111]/65 dark:text-[#EDE9E1]/65 border-l border-[#111111]/8 dark:border-[#EDE9E1]/8">
        {manual}
      </div>
      <div className="p-4 text-[13px] leading-relaxed text-[#111111]/65 dark:text-[#EDE9E1]/65 border-l border-[#111111]/8 dark:border-[#EDE9E1]/8">
        {ai}
      </div>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#ref-${n}`}
      id={`cite-${n}`}
      className="font-mono text-[10px] text-[#C93D0E] dark:text-[#FF6B35] align-super ml-[2px] hover:opacity-60 transition-opacity"
    >
      [{n}]
    </a>
  );
}

function SolutionItem({
  index,
  number,
  title,
  body,
}: {
  index: number;
  number: string;
  title: string;
  body: string;
}) {
  const { ref, visible } = useReveal(0.08);
  return (
    <div
      ref={ref}
      className="py-10 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 grid md:grid-cols-[80px_1fr] gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.75s ease ${index * 80}ms, transform 0.75s ease ${index * 80}ms`,
      }}
    >
      <span className="font-mono text-xs tracking-widest text-[#C93D0E] dark:text-[#FF6B35] pt-1.5">
        {number}
      </span>
      <div>
        <h3 className="font-serif text-xl mb-3 text-[#111111] dark:text-[#EDE9E1]">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[#111111]/60 dark:text-[#EDE9E1]/60">
          {body}
        </p>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const tableRows = [
  [
    "Cognitive Friction",
    "High — requires exploring the problem space",
    "Low — paste prompt, verify output",
  ],
  [
    "Skill Retention",
    "High — neural pathways reinforced",
    "17% decrease in measurable mastery",
  ],
  [
    "Engagement Mode",
    "Active, constructive",
    "Passive consumption",
  ],
  [
    "Neurological Effect",
    "Enlarged hippocampus",
    "Atrophied spatial memory",
  ],
  [
    "Systemic Output",
    "Deep tacit knowledge",
    "Superficial pattern matching",
  ],
];

const vibe = [
  {
    day: "Day 1",
    text: "Magic. Beautiful, working code. You've never been this productive.",
    accent: false,
  },
  {
    day: "Day 2",
    text: "Still magic. The feature is almost done. You haven't written a single line manually.",
    accent: false,
  },
  {
    day: "Day 3",
    text: "The app has grown past the AI's context window. It forgets the file structure. It hallucinates dependencies. It rewrites your session management while trying to change a button color. You cannot debug it. You didn't write it.",
    accent: true,
  },
];

const references = [
  {
    n: 1,
    label: "National Geographic — The bigger brains of London taxi drivers",
    href: "https://www.nationalgeographic.com/culture/article/the-bigger-brains-of-london-taxi-drivers",
  },
  {
    n: 2,
    label: "Anthropic — AI assistance and coding skills (2024)",
    href: "https://www.anthropic.com/research/AI-assistance-coding-skills",
  },
  {
    n: 3,
    label: "PMC — Automation bias in high-stakes domains",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4221095/",
  },
  {
    n: 4,
    label: "The Decision Lab — Daniel Kahneman",
    href: "https://thedecisionlab.com/thinkers/economics/daniel-kahneman",
  },
  {
    n: 5,
    label: "Thinking, Fast and Slow — Chapter 5: Cognitive Ease",
    href: "https://tcagley.wordpress.com/2019/05/25/thinking-fast-and-slow-by-daniel-kahneman-re-read-week-6-chapter-5-cognitive-ease/",
  },
  {
    n: 6,
    label: "r/vibecoding — AI hallucinations in the wild",
    href: "https://www.reddit.com/r/vibecoding/comments/1n8mq8s/whats_the_wildest_ai_hallucination_youve_actually/",
  },
  {
    n: 7,
    label: "Sify — The hilarious and horrifying hallucinations of AI",
    href: "https://www.sify.com/ai-analytics/the-hilarious-and-horrifying-hallucinations-of-ai/",
  },
  {
    n: 8,
    label: "Addy Osmani — Comprehension debt: the hidden cost of AI-generated code",
    href: "https://medium.com/@addyosmani/comprehension-debt-the-hidden-cost-of-ai-generated-code-285a25dac57e",
  },
];

const solutions = [
  {
    number: "01",
    title: "Skeleton First",
    body: "The AI is the bricklayer. You are the architect. Never let AI generate the foundational structure, the routing skeleton, data types, core interfaces. Build those by hand. Only then direct the AI to fill in isolated components with explicit constraints. Forcing yourself to define the skeleton means you always hold the mental model required to debug the software.",
  },
  {
    number: "02",
    title: "Context Isolation",
    body: 'Small files equal a smart AI; large files equal a dumb AI. Point AI only to the exact file requiring modification. Replace "write a function that does X" with "act as a senior systems architect, ask me clarifying questions about edge cases, then outline your approach before writing any code." You stay in the cognitive loop.',
  },
  {
    number: "03",
    title: "Redesign the Review Process",
    body: "Reintroduce the friction that AI removed from writing into the review phase. Require developers to explain the time complexity, data flow, and edge-case handling of any generated code before it merges. If they can't explain how it works, it doesn't ship.",
  },
  {
    number: "04",
    title: "Ground Your AI with RAG",
    body: "Stop relying on the model's training weights for domain knowledge. Invest in Retrieval-Augmented Generation: fetch your internal documentation and inject the relevant parts directly into the prompt. It's the difference between a closed-book exam (educated guessing, and sometimes hallucinating) and an open-book exam with the exact reference manual in hand.",
  },
  {
    number: "05",
    title: "Protect the Junior Pathway",
    body: "Junior engineers should be restricted from AI autocomplete tools in their first few months. They need to read legacy code, hit walls, and build mental maps through failure. You cannot audit a machine-generated SQL join if you've never felt the pain of writing a broken one yourself. Friction isn't the enemy of learning, it's the prerequisite.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AutocompleteDeveloper() {
  const progress = useScrollProgress();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const titleWords = ["The", "Autocomplete", "Developer"];

  return (
    <div className="min-h-screen bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#111111] dark:text-[#EDE9E1]">

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#C93D0E] dark:bg-[#FF6B35] z-50"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      />

      {/* Back nav */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto font-mono text-xs tracking-[0.2em] uppercase text-[#111111]/35 dark:text-[#EDE9E1]/35 hover:text-[#C93D0E] dark:hover:text-[#FF6B35] transition-colors"
        >
          ← AN
        </Link>
        <span
          className="font-mono text-xs text-[#111111]/25 dark:text-[#EDE9E1]/25"
          style={{
            opacity: progress > 5 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {Math.round(progress)}%
        </span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 max-w-5xl mx-auto">
        <p
          className="font-mono text-xs tracking-[0.35em] uppercase text-[#C93D0E] dark:text-[#FF6B35] mb-10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.9s ease 150ms",
          }}
        >
          Essay · April 2026
        </p>

        <h1 className="font-serif text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.93] tracking-tight">
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.18em]"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(48px)",
                transition: `opacity 1s ease ${280 + i * 160}ms, transform 1s ease ${280 + i * 160}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="mt-10 max-w-lg text-lg leading-relaxed text-[#111111]/55 dark:text-[#EDE9E1]/55"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 860ms, transform 1s ease 860ms",
          }}
        >
          How AI is rewiring developer brains and manufacturing a generation of
          highly productive people who don't understand what they're building.
        </p>

        <div
          className="mt-12 flex gap-8 font-mono text-xs text-[#111111]/28 dark:text-[#EDE9E1]/28"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 1100ms",
          }}
        >
          <span>Animesh Nighojkar, Ph.D.</span>
          <span>12 min read</span>
        </div>

        <div
          className="mt-20 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1.2s ease 1300ms",
          }}
        />
      </section>

      {/* ── Article body ─────────────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 pb-40">

        {/* Intro */}
        <Reveal>
          <p className="text-xl leading-[1.75] mb-8 text-[#111111]/80 dark:text-[#EDE9E1]/80">
            Before November 2022, getting a complicated feature request kicked off a
            familiar ritual. You'd stare at a whiteboard, sigh heavily, and spend
            a few hours just mapping the problem before writing a single line. It was
            slow, frustrating, and, it turns out, entirely the point.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Today, the same Jira ticket gets pasted into a chat window. The AI
            streams out clean, beautifully indented code. Velocity is through the roof
            and executives love the metrics. But something quiet and genuinely alarming
            is happening underneath all of it: we're delegating the act of{" "}
            <em>understanding</em> to a machine, and we're calling
            it a productivity gain.
          </p>
        </Reveal>

        {/* ── Ch 1 ── */}
        <ChapterHeader n="01" title="The Neuroscience of the Magic Button" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            To understand what AI is doing to a developer's brain, start with
            London cab drivers.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Getting a black cab license in London required passing "The Knowledge", a
            genuinely brutal exam demanding the memorization of roughly 26,000 streets
            and thousands of landmarks. Neuroscientists who studied these drivers found
            their posterior hippocampus (the region handling spatial memory) was
            physically larger than average. The brain had literally rewired itself to
            handle the cognitive load.<Cite n={1} />
          </p>
        </Reveal>

        <Stat target={26000} label="streets memorized by London cab drivers" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Then GPS arrived. Drivers who switched started showing hippocampal
            shrinkage. The capability wasn't a permanent installation, it required
            constant exercise. Use it or lose it.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Software engineers are experiencing the same effect. The hours spent
            wrestling with a problem, reading the docs, misreading them, writing
            wrong code, debugging it, were all building what practitioners call tacit
            knowledge: the undocumented mental model of how a system actually behaves.
            AI removes that friction. Without friction, the knowledge doesn't form.
          </p>
        </Reveal>

        <PullQuote>
          Engineers who used AI to learn a new Python library completed tasks faster
          but scored 17% lower on concept retention than those who coded by hand. They
          built working software. They just didn't understand any of it.<Cite n={2} />
        </PullQuote>

        <Stat target={17} suffix="%" label="drop in concept retention — Anthropic, 2024" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The 17% figure is the gap between someone
            who can do the job and someone who can only appear to. They're successful
            typists. They're failing engineers.
          </p>
        </Reveal>

        {/* Comparison table */}
        <Reveal>
          <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 overflow-hidden rounded-sm">
            <div className="grid grid-cols-3 bg-[#111111]/3 dark:bg-[#EDE9E1]/3 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10">
              <div className="p-4 font-mono text-[10px] tracking-widest uppercase text-[#111111]/30 dark:text-[#EDE9E1]/30" />
              <div className="p-4 font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 border-l border-[#111111]/10 dark:border-[#EDE9E1]/10">
                Manual · The Knowledge
              </div>
              <div className="p-4 font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 border-l border-[#111111]/10 dark:border-[#EDE9E1]/10">
                AI-Assisted · The GPS
              </div>
            </div>
            {tableRows.map(([label, manual, ai], i) => (
              <TableRow key={i} label={label} manual={manual} ai={ai} index={i} />
            ))}
          </div>
        </Reveal>

        {/* ── Ch 2 ── */}
        <ChapterHeader n="02" title="Automation Bias and the Cult of LGTM" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            When cognitive engagement drops, a second vulnerability moves in.
            Automation bias is the tendency to trust a machine's output even when
            something seems off. It's been documented in aviation, military defense,
            and healthcare.<Cite n={3} /> Now it lives in your code review queue.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Daniel Kahneman mapped the mechanism decades ago.<Cite n={4} /><Cite n={5} /> System 1 thinking is
            fast, automatic, and operates on feel. System 2 is slow, deliberate,
            effortful. When information arrives in a clean, confident format, System 1
            handles it without ever calling System 2. AI tools present code in exactly
            that format: syntactically perfect, beautifully indented, no obvious red
            flags.
          </p>
        </Reveal>

        <PullQuote>
          A senior engineer reviewed a pristine pull request that used a massive
          concurrency feature for a basic I/O task, a severe anti-pattern. When asked
          why, the author said "Copilot put it there."<Cite n={6} />
        </PullQuote>

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The reviewer sees clean code, assumes sound logic, types "LGTM," and
            clicks Approve. Another developer asked AI to implement basic
            authentication; it helpfully added a leaderboard for failed login
            attempts. We are getting correct code. We are not getting the{" "}
            <em>right</em> code.
          </p>
        </Reveal>

        {/* ── Ch 3 ── */}
        <ChapterHeader n="03" title="Hallucination Is Not a Bug" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            When management sees an LLM confidently explain that the world record for
            crossing the English Channel on foot is held by a German man who completed
            it in 14 hours, the instinct is to file a bug report.<Cite n={7} /> That instinct is
            wrong.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            An LLM doesn't query a facts database. It's a next-token predictor. It
            generates the statistically most plausible continuation of text given its
            training distribution. Training it to reliably say "I don't know" would
            require destroying the generative fluidity that makes the whole thing
            useful. The model is architecturally rewarded for sounding confident, not
            for knowing when to stop.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            In software, this creates a specific attack surface. AI knows npm naming
            conventions deeply. When it hallucinates an{" "}
            <code className="font-mono text-[13px] bg-[#111111]/6 dark:bg-[#EDE9E1]/6 px-1.5 py-0.5">
              npm install fictional-package
            </code>{" "}
            command, threat actors monitor these outputs and publish real malware under
            those exact fake package names. The developer pastes the command and
            downloads a live payload into production.
          </p>
        </Reveal>

        <PullQuote>
          Hallucination isn't a bug waiting to be patched. It's an architectural
          property of how these models work. Expecting it to disappear is like
          expecting a calculator to write poetry.
        </PullQuote>

        {/* ── Ch 4 ── */}
        <ChapterHeader n="04" title="Vibe Coding and Comprehension Debt" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            "Vibe coding" is what happens when you stop thinking of yourself as a
            developer and start thinking of yourself as a creative director. Natural
            language in, working React components out. It genuinely feels like magic.
          </p>
        </Reveal>

        {/* Day timeline */}
        <Reveal>
          <div className="my-12 space-y-0">
            {vibe.map(({ day, text, accent }, i) => (
              <Reveal key={i} delay={i * 140}>
                <div className="py-9 border-b border-[#111111]/8 dark:border-[#EDE9E1]/8 grid grid-cols-[72px_1fr] gap-6">
                  <span
                    className={`font-mono text-xs tracking-widest pt-1 ${
                      accent
                        ? "text-[#C93D0E] dark:text-[#FF6B35]"
                        : "text-[#111111]/28 dark:text-[#EDE9E1]/28"
                    }`}
                  >
                    {day}
                  </span>
                  <p
                    className={`text-[15px] leading-relaxed ${
                      accent
                        ? "text-[#111111]/85 dark:text-[#EDE9E1]/85"
                        : "text-[#111111]/55 dark:text-[#EDE9E1]/55"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The software industry has long understood Technical Debt: rushed, messy
            code that will cost you later. AI introduces something worse: {" "}
            <em>Comprehension Debt</em>.<Cite n={8} /> The codebase looks clean. It passes CI. But
            nobody on the team can explain why the architectural decisions were made or
            how the modules connect. The theory of the system has evaporated.
          </p>
        </Reveal>

        {/* ── Ch 5 ── */}
        <ChapterHeader n="05" title="The Pipeline Nobody Is Refilling" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Companies are canceling junior developer hiring, making the pitch that a
            single senior engineer with AI can handle the workload of three. On a
            spreadsheet, this makes sense. In practice, it's eating the seed corn.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Senior engineers are not born. They are forged in years of
            debugging boilerplate syntax errors, wrestling with production failures at
            2am, and slowly developing an intuition that no amount of prompt
            engineering can substitute. By eliminating the junior role, you're
            destroying the pipeline.
          </p>
        </Reveal>

        <PullQuote>
          In five years, who will have the systems-level thinking required to audit
          what the AI produced? If the answer is nobody, then "AI-augmented
          engineering" was just deferred hiring.
        </PullQuote>

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Senior engineers are already burning out. Their role has quietly shifted
            from creative problem-solving to reviewing a high-volume stream of
            AI-generated code that looks fine on the surface and requires deep scrutiny
            to evaluate. The promised 10× productivity gain quickly becomes a 10×
            technical debt multiplier when the architect spends more time untangling
            hallucinated middleware than it would have taken to just write the feature.
          </p>
        </Reveal>

        {/* ── Ch 6 ── */}
        <ChapterHeader n="06" title="Architecting the Human-AI Alliance" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-16 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            None of this is an argument for banning the tools. A developer who uses AI
            well will consistently outpace one who doesn't. The question is how to
            structure that use so it amplifies human capability instead of quietly
            replacing it.
          </p>
        </Reveal>

        <div className="space-y-0">
          {solutions.map((s, i) => (
            <SolutionItem key={i} index={i} {...s} />
          ))}
        </div>

        {/* Closing */}
        <Reveal>
          <div className="mt-28 pt-16 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10 space-y-7">
            <p className="text-[17px] leading-[1.8] text-[#111111]/65 dark:text-[#EDE9E1]/65">
              Writing manual syntax may eventually become a lost art, the way manual
              memory management in C is now a specialty rather than a requirement. But
              the underlying principles, computational logic, systems thinking, the
              ability to model how a program behaves, cannot be abstracted away. They
              can only be developed through friction.
            </p>
            <p className="text-[17px] leading-[1.8] text-[#111111]/65 dark:text-[#EDE9E1]/65">
              The tools that most aggressively remove friction are the same tools most
              aggressively eroding the expertise required to use them well. That's not
              a contradiction to manage around. It's the core problem to design for.
            </p>
          </div>
        </Reveal>

        {/* References */}
        <Reveal>
          <div className="mt-24 pt-12 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#111111]/30 dark:text-[#EDE9E1]/30 mb-8">
              References
            </p>
            <ol className="space-y-4">
              {references.map(({ n, label, href }) => (
                <li key={n} id={`ref-${n}`} className="flex gap-4 group">
                  <a
                    href={`#cite-${n}`}
                    className="font-mono text-[11px] text-[#C93D0E] dark:text-[#FF6B35] pt-0.5 flex-shrink-0 hover:opacity-60 transition-opacity"
                  >
                    [{n}]
                  </a>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-relaxed text-[#111111]/45 dark:text-[#EDE9E1]/45 hover:text-[#111111]/75 dark:hover:text-[#EDE9E1]/75 transition-colors"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal>
          <div className="mt-20 pt-10 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10 flex items-center justify-between">
            <Link
              to="/"
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#111111]/35 dark:text-[#EDE9E1]/35 hover:text-[#C93D0E] dark:hover:text-[#FF6B35] transition-colors"
            >
              ← Animesh Nighojkar, Ph.D.
            </Link>
            <span className="font-mono text-xs text-[#111111]/20 dark:text-[#EDE9E1]/20">
              © {new Date().getFullYear()}
            </span>
          </div>
        </Reveal>

      </article>
    </div>
  );
}
