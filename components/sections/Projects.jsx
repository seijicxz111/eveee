'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const LANG_COLORS = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
  HTML: '#E34C26', CSS: '#563D7C', Vue: '#42B883',
  Ruby: '#CC342D', Go: '#00ADD8', Rust: '#CE412B',
  PHP: '#777BB4', Java: '#B07219', 'C++': '#F34B7D',
  default: '#9CD5FF',
};

const FILTERS = ['All', 'JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'];

function RepoCard({ repo, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.08, type: 'spring', stiffness: 220, damping: 22 }}
      className="chiikawa-card p-6 flex flex-col h-full group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky/15 flex items-center justify-center icon-sq">
            <i className="fab fa-github text-deep/60 text-sm" />
          </div>
          <h3 className="font-display font-700 text-deep text-sm leading-tight line-clamp-1">
            {repo.name}
          </h3>
        </div>
        {repo.fork && (
          <span className="tag-pill text-[10px] flex-shrink-0">fork</span>
        )}
      </div>

      {/* Description */}
      <p className="text-deep/55 text-xs font-body leading-relaxed flex-1 mb-4 line-clamp-3">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} className="tag-pill text-[10px]">{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-sky/15 mt-auto">
        <div className="flex items-center gap-3 text-xs text-deep/45 font-body">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
              <span className="font-700">{repo.language}</span>
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1"><i className="fas fa-star text-[10px]" />{repo.stargazers_count}</span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1"><i className="fas fa-code-branch text-[10px]" />{repo.forks_count}</span>
          )}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-sky/15 text-mid hover:bg-mid hover:text-white transition-all duration-200 border border-sky/30"
          aria-label={`View ${repo.name} on GitHub`}
        >
          <i className="fas fa-arrow-up-right-from-square text-[10px]" />
        </a>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="chiikawa-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="skeleton w-8 h-8 rounded-lg" />
        <div className="skeleton h-4 w-32 rounded" />
      </div>
      <div className="skeleton h-3 w-full rounded mb-2" />
      <div className="skeleton h-3 w-4/5 rounded mb-2" />
      <div className="skeleton h-3 w-3/5 rounded mb-4" />
      <div className="flex gap-1.5 mb-4">
        <div className="skeleton h-5 w-14 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="flex justify-between pt-3 border-t border-sky/15">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton w-7 h-7 rounded-full" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState('All');
  const [page,    setPage]    = useState(1);
  const PER_PAGE = 6;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          'https://api.github.com/users/seijicxz/repos?sort=updated&per_page=40',
          { headers: { Accept: 'application/vnd.github.mercy-preview+json' } }
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRepos(data.filter(r => !r.fork || r.stargazers_count > 0));
      } catch (e) {
        setError('Could not load repositories.');
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const filtered = filter === 'All'
    ? repos
    : repos.filter(r => r.language === filter);

  const visible = filtered.slice(0, page * PER_PAGE);
  const hasMore = visible.length < filtered.length;

  const langs = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))).slice(0, 5)];

  return (
    <section id="projects" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle icon="fas fa-folder-open" title="GitHub Projects" sub="Open source work & experiments" />

        {/* Filter bar */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {langs.map(lang => (
              <motion.button
                key={lang}
                onClick={() => { setFilter(lang); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-800 border-2 transition-all duration-200 ${
                  filter === lang
                    ? 'bg-deep text-white border-deep shadow-chiikawa'
                    : 'bg-white text-deep/55 border-sky/25 hover:border-mid hover:text-deep'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">😿</span>
            <p className="text-deep/45 font-body">{error}</p>
            <a
              href="https://github.com/seijicxz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chiikawa btn-chiikawa-primary mt-4 inline-flex"
            >
              <i className="fab fa-github" /> View on GitHub
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl mb-3 block">🔍</span>
            <p className="text-deep/45 font-body">No {filter} repos found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {visible.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn-chiikawa btn-chiikawa-secondary"
                >
                  <i className="fas fa-plus text-xs" /> Load More
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
