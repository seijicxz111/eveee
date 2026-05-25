'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';

const PROJECTS = [
  // Add your projects here. Example shape:
  // {
  //   id: 1,
  //   name: 'Project Name',
  //   description: 'Short description of what the project does.',
  //   tags: ['React', 'Tailwind', 'Next.js'],
  //   language: 'JavaScript',
  //   demo: 'https://your-live-demo.vercel.app',
  //   repo: 'https://github.com/seijicxz/your-repo',
  //   image: null, // optional: '/assets/project-preview.png'
  // },
];

const LANG_COLORS = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
  HTML: '#E34C26', CSS: '#563D7C', Vue: '#42B883',
  GDScript: '#478CBF', 'C#': '#9B4F96', default: '#9CD5FF',
};

const ALL_TAGS = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags))).slice(0, 6)];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const langColor = LANG_COLORS[project.language] || LANG_COLORS.default;

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
            <Icon name="fas fa-folder" className="text-mid text-sm" />
          </div>
          <h3 className="font-display font-700 text-deep text-sm leading-tight line-clamp-1">
            {project.name}
          </h3>
        </div>
        {project.demo && (
          <span className="tag-pill text-[10px] flex-shrink-0 bg-leaf/20 text-emerald-600 border-leaf/40">live</span>
        )}
      </div>

      {/* Description */}
      <p className="text-deep/55 text-xs font-body leading-relaxed flex-1 mb-4 line-clamp-3">
        {project.description || 'No description provided.'}
      </p>

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map(t => (
            <span key={t} className="tag-pill text-[10px]">{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-sky/15 mt-auto">
        <div className="flex items-center gap-3 text-xs text-deep/45 font-body">
          {project.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: langColor }} />
              <span className="font-700">{project.language}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-sky/15 text-mid hover:bg-mid hover:text-white transition-all duration-200 border border-sky/30"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Icon name="fab fa-github" className="text-[11px]" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-200 border border-emerald-200"
              aria-label={`Live demo of ${project.name}`}
            >
              <Icon name="fas fa-arrow-up-right-from-square" className="text-[10px]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [page,   setPage]   = useState(1);
  const PER_PAGE = 6;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(filter));

  const visible = filtered.slice(0, page * PER_PAGE);
  const hasMore = visible.length < filtered.length;

  return (
    <section id="projects" className="py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle icon="fas fa-folder-open" title="Projects" sub="Things I've built & shipped" />

        {/* Filter bar — only shown when there are projects */}
        {PROJECTS.length > 0 && ALL_TAGS.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {ALL_TAGS.map(tag => (
              <motion.button
                key={tag}
                onClick={() => { setFilter(tag); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-800 border-2 transition-all duration-200 ${
                  filter === tag
                    ? 'bg-deep text-white border-deep shadow-chiikawa'
                    : 'bg-white text-deep/55 border-sky/25 hover:border-mid hover:text-deep'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Empty / no-projects state */}
        {PROJECTS.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4">
              <img src="/error.png" alt="empty" className="w-full h-full object-contain" />
            </div>
            <p className="text-deep/45 font-body">Could not load projects.</p>
            <a
              href="https://github.com/seijicxz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chiikawa btn-chiikawa-primary mt-4 inline-flex items-center gap-2"
            >
              <Icon name="fab fa-github" /> View on GitHub
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl mb-3 block">🔍</span>
            <p className="text-deep/45 font-body">No {filter} projects found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {visible.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
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
                  className="btn-chiikawa btn-chiikawa-secondary inline-flex items-center gap-2"
                >
                  <Icon name="fas fa-plus" className="text-xs" /> Load More
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
