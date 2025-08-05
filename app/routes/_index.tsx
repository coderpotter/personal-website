import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useTheme } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Animesh Nighojkar - AI Research Engineer & CTO" },
    { name: "description", content: "Founding Engineer (CTO) at Actualization.AI. Ph.D. in Natural Language Processing, specializing in advanced language modeling, prompt engineering, and transformer-based language models." },
    { name: "keywords", content: "AI, Machine Learning, NLP, CTO, Research, Python, Transformers, GPT, BERT" },
  ];
};

export default function Index() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Handle smooth scrolling for navigation links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listener to navigation
    const nav = document.querySelector('nav');
    if (nav) {
      nav.addEventListener('click', handleNavClick);
    }

    // Cleanup
    return () => {
      if (nav) {
        nav.removeEventListener('click', handleNavClick);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container-max section-padding py-4">
          <div className="flex justify-between items-center">
            <a href="#hero" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Animesh Nighojkar
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</a>
              <a href="#education" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Education</a>
              <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
              <a href="#publications" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Publications</a>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile Theme Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 section-padding">
        <div className="container-max">
          <div className="text-center bounce-in">
            {/* Profile Photo */}
            <div className="mb-1 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg overflow-hidden">
                  {/* Replace 'profile-photo.jpg' with your actual photo filename */}
                  <img 
                    src="/AM-19.png" 
                    alt="Animesh Nighojkar" 
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: 'center 10%' }}
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = 'AN';
                        parent.className = 'w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              ANIMESH NIGHOJKAR
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              AI Research Engineer & CTO
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-600 dark:text-gray-400">
              <a 
                href="https://maps.google.com/?q=Tampa,FL,USA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Tampa, FL, USA
              </a>
              <a 
                href="tel:+16463715208" 
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (646) 371-5208
              </a>
              <a 
                href="mailto:a@nighojkar.com" 
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                a@nighojkar.com
              </a>
            </div>
            <div className="flex justify-center gap-4">
              <a 
                href="https://linkedin.com/in/animesh-nighojkar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://scholar.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Google Scholar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 section-padding bg-white dark:bg-gray-800">
        <div className="container-max">
          <div className="slide-up">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">About</h2>
            <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="mb-6">
                Founding Engineer (CTO) at Actualization.AI with a Ph.D. in Natural Language Processing. 
                I seek challenging roles where I can apply my expertise in advanced language modeling, 
                prompt engineering, and transformer-based language models.
              </p>
              <p className="mb-6">
                With 2 impactful internships at Dropbox, 5 years of research at University of South Florida, 
                and a win in an international legal reasoning competition, I have a proven track record 
                developing innovative ML solutions.
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Principal Investigator on a $275K NSF SBIR grant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 section-padding">
        <div className="container-max">
          <div className="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Experience</h2>
            <div className="space-y-8">
              {/* Actualization.AI */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Founding Engineer and CTO</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Actualization.AI</p>
                    <p className="text-gray-600 dark:text-gray-400">Tampa, FL, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base">September 2024 - Present</span>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Principal Investigator (PI) on a $275K NSF SBIR Phase-I grant.</li>
                  <li>• Made the product 2x faster and 10x cheaper without compromising performance.</li>
                  <li>• Working with Tampa International Airport (TPA) and other companies on separate pilot programs.</li>
                  <li>• Creating various LLM jailbreaks and prompt engineering techniques to test the robustness of AI systems.</li>
                  <li>• Led a team of four engineers with various skill levels and backgrounds to deliver an MVP in just 10 days.</li>
                </ul>
              </div>

              {/* Dropbox 2023 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Machine Learning Intern</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Dropbox</p>
                    <p className="text-gray-600 dark:text-gray-400">Remote, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base">May 2023 – August 2023</span>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Implemented end-to-end object removal from videos. The user can pause a video at any frame, and click on any object, and that object is tracked through the rest of the video and removed.</li>
                  <li>• Cross-collaborated with the front-end teams to get the feature shipped.</li>
                  <li>• Feature showcased in Dropbox hack week 2023. Won third place in the hack week competition.</li>
                </ul>
              </div>

              {/* Dropbox 2022 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Machine Learning Intern</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Dropbox</p>
                    <p className="text-gray-600 dark:text-gray-400">Remote, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base">May 2022 – August 2022</span>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Trained summarization models and deployed a document and transcript summarization service which can summarize theoretically infinite length of text.</li>
                  <li>• Prototyped the UI of the feature for demonstration to the VP.</li>
                </ul>
              </div>

              {/* USF Research */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Graduate Research Assistant</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">University of South Florida</p>
                    <p className="text-gray-600 dark:text-gray-400">Tampa, FL, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base">September 2019 – August 2024</span>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Prompt engineering for GPT-4 to create a dataset with specific psychological and psychometric properties.</li>
                  <li>• Modeled semantic fluency tasks using transformers to understand human cognition and memory retrieval.</li>
                  <li>• Pre-trained BERT from scratch to explore how LLMs learn and understand human language.</li>
                  <li>• Led a team of 8 researchers to win the COLIEE-2024 legal reasoning competition.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 section-padding bg-white dark:bg-gray-800">
        <div className="container-max">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Education</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ph.D. in Computer Science and Engineering</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">University of South Florida, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">August 2024</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Master of Science in Computer Science and Engineering</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">University of South Florida, USA</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">December 2021</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bachelor of Engineering in Computer Science and Engineering</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Rajiv Gandhi Technical University, India</p>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">May 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 section-padding">
        <div className="container-max">
          <div className="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "C++", "Java", "Rust", "JavaScript", "SQL", "Scala", "R", "Bash/Shell", "LaTeX"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "TensorFlow", "Keras", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Plotly", "Git", "GitHub", "Linux", "OpenCV", "Django", "Flask", "Docker", "AWS", "Google Cloud", "Kubernetes"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AI & NLP</h3>
                <div className="flex flex-wrap gap-2">
                  {["HuggingFace", "SpaCy", "NLTK", "Gensim", "StanfordNLP", "FastText", "Prompt Engineering", "AI Safety", "LLM Jailbreaks"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-16 section-padding bg-white dark:bg-gray-800">
        <div className="container-max">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Selected Publications</h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{pub.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{pub.venue}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{pub.authors}</p>
                  {pub.link && (
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Publication
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 section-padding bg-gray-900 dark:bg-gray-950 text-white">
        <div className="container-max text-center">
          <p className="text-gray-300">© 2024 Animesh Nighojkar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const publications = [
  {
    title: "Giving AI Personalities Leads to More Human-Like Reasoning",
    venue: "arXiv (2025)",
    authors: "A. Nighojkar, B. Moydinboyev, M. Duong, J. Licato",
    link: "https://arxiv.org"
  },
  {
    title: "An Inference-Centric Approach to Natural Language Processing and Cognitive Modeling",
    venue: "Ph.D. Dissertation (2025)",
    authors: "A. Nighojkar"
  },
  {
    title: "AMHR COLIEE 2024 Entry: Legal Entailment and Retrieval",
    venue: "New Frontiers in Artificial Intelligence (2024)",
    authors: "A. Nighojkar, K. Jiang, L. Fields, O. Bilgin, S. Steinle, Y. Sadybekov, Z. Marji, J. Licato"
  },
  {
    title: "Exploring Prompting Approaches in Legal Textual Entailment",
    venue: "The Review of Socionetwork Strategies (2024)",
    authors: "O. Bilgin, L. Fields, A. Laverghetta Jr, Z. Marji, A. Nighojkar, S. Steinle, J. Licato"
  },
  {
    title: "No Strong Feelings One Way or Another: Re-operationalizing Neutrality in Natural Language Inference",
    venue: "The 17th Linguistic Annotation Workshop (2023)",
    authors: "A. Nighojkar, A. Laverghetta Jr, J. Licato"
  },
  {
    title: "Cognitive Modeling of Semantic Fluency Using Transformers",
    venue: "The 31st International Joint Conference on Artificial Intelligence: Cognitive Aspects of Knowledge Representation (2022)",
    authors: "A. Nighojkar, A. Khlyzova, J. Licato"
  },
  {
    title: "Improving Paraphrase Detection with the Adversarial Paraphrasing Task",
    venue: "The 59th Annual Meeting of the Association for Computational Linguistics (2021)",
    authors: "A. Nighojkar, J. Licato"
  },
  {
    title: "Mutual Implication as a Measure of Textual Equivalence",
    venue: "The International FLAIRS Conference (2021)",
    authors: "A. Nighojkar, J. Licato"
  }
];