import { ArrowRight, BookOpen, Code2, Compass, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const LANDING_LINKS = [
  {
    icon: Compass,
    title: 'Start here',
    body: 'Core concepts, your first monitored process, and the operational loop in minutes.',
    href: '/docs/start/quickstart',
  },
  {
    icon: BookOpen,
    title: 'Build',
    body: 'Processes, cases, evidence, scanner runs, and git-backed `.kiket/` configuration.',
    href: '/docs/build/workflows',
  },
  {
    icon: Code2,
    title: 'API & SDKs',
    body: 'REST reference, language SDKs, the CLI, MCP tools, and webhooks.',
    href: '/docs/api',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance',
    body: 'Findings, audit reports, optional anchoring, and billing or plan limits.',
    href: '/docs/compliance',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          Operational compliance twin
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Operations you can prove.
        </h1>
        <p className="mt-3 text-lg font-medium text-gray-800 dark:text-gray-200">
          Model policy. Observe reality. Fix drift with evidence.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Kiket models how you must operate, watches how you actually operate, and closes the gap with an evidence graph,
          explainable findings, and audit-ready exports — before audit day.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/docs/start/quickstart"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Start the quickstart
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://app.kiket.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            Open the app
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="https://kiket.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Product site
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {LANDING_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              <l.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">{l.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{l.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
