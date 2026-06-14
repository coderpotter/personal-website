import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "The Temperature Zero Myth — Animesh Nighojkar, Ph.D." },
  {
    name: "description",
    content:
      "5 Counter-Intuitive Ways to Force LLMs into Total Submission. From stochastic chaos to rigorous engines.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
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
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] text-[#111111] dark:text-[#EDE9E1]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function PromptComparison() {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
    >
      <div className="grid md:grid-cols-[1fr_2fr] bg-[#111111]/3 dark:bg-[#EDE9E1]/3 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10">
        <div className="p-4 font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45">
          Prompt Type
        </div>
        <div className="p-4 font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 md:border-l border-[#111111]/10 dark:border-[#EDE9E1]/10">
          Example Formulation
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr] border-b border-[#111111]/8 dark:border-[#EDE9E1]/8 transition-colors hover:bg-[#111111]/[0.02] dark:hover:bg-[#EDE9E1]/[0.02]">
        <div className="p-6 md:p-8 font-serif text-lg text-[#111111]/60 dark:text-[#EDE9E1]/60">
          Standard (Diffuse)
        </div>
        <div className="p-6 md:p-8 text-[14px] leading-relaxed text-[#111111]/60 dark:text-[#EDE9E1]/60 md:border-l border-[#111111]/8 dark:border-[#EDE9E1]/8 italic">
          "You are a helpful assistant. Extract the sentiment from the user's text."
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr] transition-colors hover:bg-[#111111]/[0.02] dark:hover:bg-[#EDE9E1]/[0.02]">
        <div className="p-6 md:p-8 font-serif text-lg text-[#C93D0E] dark:text-[#FF6B35]">
          Anchored Prompt
        </div>
        <div className="p-6 md:p-8 text-[14px] leading-relaxed text-[#111111]/85 dark:text-[#EDE9E1]/85 md:border-l border-[#111111]/8 dark:border-[#EDE9E1]/8 font-medium">
          "You are an exacting ontologist. Distill the affective valence from the user's text. Return exclusively the monolexemic valence."
        </div>
      </div>
    </div>
  );
}

function AlgorithmStep({
  index,
  title,
  body,
  math,
}: {
  index: number;
  title: string;
  body: string;
  math?: string;
}) {
  const { ref, visible } = useReveal(0.08);
  return (
    <div
      ref={ref}
      className="py-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 flex flex-col md:flex-row gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.75s ease ${index * 100}ms, transform 0.75s ease ${index * 100}ms`,
      }}
    >
      <div className="flex-1">
        <h3 className="font-mono text-sm tracking-wider text-[#C93D0E] dark:text-[#FF6B35] mb-3">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[#111111]/70 dark:text-[#EDE9E1]/70">
          {body}
        </p>
      </div>
      {math && (
        <div className="md:w-[280px] shrink-0 flex items-center justify-center bg-[#111111]/5 dark:bg-[#EDE9E1]/5 rounded p-6">
          <code className="font-mono text-sm tracking-tight text-[#111111] dark:text-[#EDE9E1]">
            {math}
          </code>
        </div>
      )}
    </div>
  );
}

function StateBlock({
  state,
  label,
  body,
  delay = 0,
}: {
  state: string;
  label: string;
  body: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="relative p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <span className="absolute -top-3 left-6 px-2 bg-[#F8F6F1] dark:bg-[#0D0D0B] font-mono text-xs tracking-widest text-[#C93D0E] dark:text-[#FF6B35] uppercase">
        {state}
      </span>
      <h4 className="font-serif text-xl mb-4 text-[#111111] dark:text-[#EDE9E1]">
        {label}
      </h4>
      <p className="text-[15px] leading-relaxed text-[#111111]/65 dark:text-[#EDE9E1]/65">
        {body}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TemperatureZeroMyth() {
  const progress = useScrollProgress();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const titleWords = ["The", "Temperature", "Zero", "Myth"];

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
          to="/#writing"
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
          Essay · June 2026
        </p>

        <h1 className="font-serif text-[clamp(3.2rem,10vw,7rem)] leading-[0.93] tracking-tight max-w-4xl">
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.25em] mb-2"
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
            transition: "opacity 1s ease 950ms, transform 1s ease 950ms",
          }}
        >
          5 Counter-Intuitive Ways to Force LLMs into Total Submission.
        </p>

        <div
          className="mt-12 flex gap-8 font-mono text-xs text-[#111111]/28 dark:text-[#EDE9E1]/28"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 1200ms",
          }}
        >
          <span>Animesh Nighojkar, Ph.D.</span>
          <span>8 min read</span>
        </div>

        <div
          className="mt-20 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1.2s ease 1400ms",
          }}
        />
      </section>

      {/* ── Article body ─────────────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 pb-40">
        
        {/* Intro */}
        <Reveal>
          <h3 className="font-serif text-2xl mb-6 text-[#111111] dark:text-[#EDE9E1]">
            1. Introduction: The Illusion of Control
          </h3>
          <p className="text-lg leading-[1.75] mb-8 text-[#111111]/80 dark:text-[#EDE9E1]/80">
            It is a common ritual among AI developers: set the sampling temperature
            to exactly 0.0, fix the pseudo-random number generator (PRNG) seed to 42,
            and expect bit-exact reproducibility. Yet, the output frequently diverges.
            This frustration stems from the illusion of parameterized control. While
            we treat these parameters as absolute commands, they are actually fragile
            suggestions in a cloud-hosted environment.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            To master Large Language Models (LLMs) in production, you must stop being
            a "prompt engineer" and start becoming a latent space architect. Mastering
            these stochastic models requires shifting from internal parameter tuning to
            "outside-in" control. This guide explores how to bypass the hardware-level
            noise of modern inference and force rigorous, deterministic behavior from
            the world's most sophisticated hallucination machines.
          </p>
        </Reveal>

        {/* ── Ch 2 ── */}
        <ChapterHeader n="02" title="The Hardware Traitor" />

        <Reveal>
          <div className="mb-10 font-mono text-xl tracking-widest text-[#C93D0E] dark:text-[#FF6B35] bg-[#111111]/3 dark:bg-[#EDE9E1]/3 inline-block py-2 px-4 rounded-sm border border-[#111111]/10 dark:border-[#EDE9E1]/10">
            A + (B + C) ≠ (A + B) + C
          </div>
        </Reveal>

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The root of non-determinism in API-based models is not just the software,
            but the microscopic nature of GPU computation. In the world of high-speed
            matrix multiplication, floating-point arithmetic is fundamentally
            non-associative. Tiny rounding errors during accumulation mean that the
            sequence of operations dictates the final result.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Cloud providers utilize dynamic, continuous batching to maximize
            throughput. Your request is constantly being interleaved with fluctuating
            sets of other user requests, causing the GPU to alter its accumulation
            order for every token. If you owned the hardware, the architectural
            mitigation would involve frameworks like Microsoft's LLM-42, which uses a
            "Decode-Verify-Rollback" loop to isolate compute, or AICI virtual machines
            to co-locate state machines on the CPU.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            However, for the API user, this is a classic leaky abstraction. You cannot
            dictate the GPU's reduction schedule.
          </p>
        </Reveal>

        <PullQuote>
          While cloud providers have introduced seed parameters, these are officially
          classified as 'best effort' features; they do not guarantee deterministic
          output, and underlying server updates (often tracked via changing
          system_fingerprint values) will quietly break reproducibility.
        </PullQuote>

        {/* ── Takeaway 1 ── */}
        <ChapterHeader n="03" title="Takeaway 1: Create a Gravity Well with Semantic Anchoring" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            When a prompt uses common, "diffuse" vocabulary like "summarize" or
            "extract," it navigates through a broad, high-entropy region of the
            model's latent space. These words have thousands of nearby synonyms,
            meaning even a microscopic hardware fluctuation can nudge the model
            toward a different, but semantically similar, token.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            To force determinism, you must implement <em>Semantic Anchoring</em>. By
            replacing common words with hyper-specific, rare tokens, you create a
            microscopic "gravity well." These anchors collapse the probability
            distribution into a narrow semantic corridor where the "top choice"
            becomes statistically overwhelming.
          </p>
        </Reveal>

        <PromptComparison />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mt-8 mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            By using "exacting ontologist" and "monolexemic valence," you constrain
            the model's trajectory so tightly that hardware-level noise is
            insufficient to derail the token selection.
          </p>
        </Reveal>

        {/* ── Takeaway 2 ── */}
        <ChapterHeader n="04" title="Takeaway 2: Turning the LLM into its Own RNG (SSoT)" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Relying on an API to be "random" for tasks like diverse synthetic data
            generation or game theory is as unreliable as relying on it to be
            deterministic. Standard prompts for randomness are notoriously biased
            toward specific patterns.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The <em>String Seed of Thought (SSoT)</em> methodology architecturalizes
            randomness by turning the model into its own PRNG. The model is instructed
            to generate a chaotic string of characters within an XML tag{" "}
            <code className="font-mono text-sm bg-[#111111]/5 dark:bg-[#EDE9E1]/5 px-1 rounded">&lt;random_string&gt;</code>.
            Because this string draws from the vast entropy of the model's pretraining
            distribution, it acts as a high-quality stochastic seed.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The model then executes mathematically verifiable logic within its latent
            text trace (an intermediate scratchpad) to produce the final output:
          </p>
        </Reveal>

        <div className="my-10 space-y-0">
          <AlgorithmStep
            index={0}
            title="Sum-Mod Execution"
            body="The model sums the ASCII values of the characters in its random string and applies a modulo operation to decide between choices."
            math="Sum mod N"
          />
          <AlgorithmStep
            index={1}
            title="Rolling Hash Execution"
            body="For complex distributions, the model executes a sequential polynomial rolling hash and evaluates the result against a threshold."
            math="H_i = (H_{i-1} × P + C_i) mod M"
          />
        </div>

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            By embedding the algorithmic generation of randomness directly into the
            deductive trace, you decouple the choice from the API's internal sampling
            logic.
          </p>
        </Reveal>

        {/* ── Takeaway 3 ── */}
        <ChapterHeader n="05" title="Takeaway 3: Stop Choking Your Model with Premature JSON" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Many developers use "JSON Mode" to ensure predictable formatting, but
            forcing a model to follow a strict schema from the first token creates a
            cognitive bottleneck. LLMs allocate computation based on the number of
            tokens generated; denying them a scratchpad effectively truncates the
            computation graph and degrades reasoning.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-12 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            The superior paradigm is <em>Unified Decoding</em>, which uses two
            distinct states:
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <StateBlock
            state="State -1"
            label="Unconstrained"
            body="The model generates a free-form reasoning trace (a 'thought' block) where it is free to process logic without formatting pressure."
            delay={0}
          />
          <StateBlock
            state="State 0"
            label="Constrained"
            body="Only after a trigger token (e.g., </thought>) is the model forced into a strict grammar or JSON schema to distill its findings."
            delay={100}
          />
        </div>

        <PullQuote>
          This phased approach prevents the model from being clamped before it has
          solved the problem, yielding accuracy gains of up to 27% on complex reasoning
          tasks compared to standard constrained generation.
        </PullQuote>

        {/* ── Takeaway 4 ── */}
        <ChapterHeader n="06" title="Takeaway 4: The Echo Chamber and State Collapse" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            To achieve absolute predictability in multi-step workflows, you can induce{" "}
            <em>State Collapse</em>. This architectural mitigation involves multi-call
            API chaining where the model's previous output is hashed and fed back to
            it as the mandatory prefix for the next call.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            By forcing the LLM to read its own highly constrained state matrix as its
            primary context, you create an "Echo Chamber." The self-attention
            mechanism locks onto this prefix, narrowing the probability distribution
            until only one logical path remains. While this increases
            "time-to-first-token" latency, it provides zero-variance predictability
            for the final output.
          </p>
        </Reveal>

        {/* ── Takeaway 5 ── */}
        <ChapterHeader n="07" title="Takeaway 5: Determinism as a Secret Key to Intelligence" />

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            Forcing a model into absolute deterministic confidence does more than
            provide consistency; it is an active mechanism for eliciting latent
            reasoning capabilities. This is known as <em>Unsupervised Entropy
            Minimization</em>.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            By using aggressive confidence-forcing prompts that actively discourage
            the model from exploring the probability space, you force the model's
            internal pretraining priors to dominate.
          </p>
        </Reveal>

        <PullQuote>
          Forcing entropy collapse enables smaller models (like a 32B parameter model)
          to match or exceed the reasoning performance of massive proprietary models
          (like GPT-4o or Claude 3 Opus)... determinism isn't just a deployment
          requirement; it is an active mechanism for eliciting hidden intelligence.
        </PullQuote>

        <Reveal>
          <p className="text-[17px] leading-[1.8] mb-8 text-[#111111]/65 dark:text-[#EDE9E1]/65">
            When the model is forced to concentrate entirely on its highest-confidence
            trajectory, it can solve complex coding and math benchmarks that would
            otherwise be lost to stochastic exploration.
          </p>
        </Reveal>

        {/* ── Conclusion ── */}
        <Reveal>
          <div className="mt-28 pt-16 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10 space-y-7">
            <h3 className="font-serif text-2xl mb-6 text-[#111111] dark:text-[#EDE9E1]">
              Conclusion: From Stochastic Chaos to Rigorous Engines
            </h3>
            <p className="text-[17px] leading-[1.8] text-[#111111]/65 dark:text-[#EDE9E1]/65">
              The path to reliable AI applications requires moving from adjusting
              "simple parameters" like temperature to a framework of engineered
              determinism. By using semantic anchors, self-generated seeds, and
              phased decoding, we can bypass hardware limitations and treat LLMs as
              rigorous engines rather than unpredictable black boxes.
            </p>
            <p className="text-[17px] leading-[1.8] text-[#111111]/65 dark:text-[#EDE9E1]/65 font-medium">
              As we move forward, we must ask: does the future of AI lie in its
              creative variability, or in our architectural ability to make it
              perfectly, boringly predictable?
            </p>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal>
          <div className="mt-24 pt-10 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10 flex items-center justify-between">
            <Link
              to="/#writing"
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
