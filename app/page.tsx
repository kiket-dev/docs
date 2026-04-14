import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, Compass, ShieldCheck } from 'lucide-react';

const LANDING_LINKS = [
  {
    icon: Compass,
    title: 'Start here',
    body: 'Core concepts, your first workflow, and the 60-second tour.',
    href: '/docs/start/quickstart',
  },
  {
    icon: BookOpen,
    title: 'Build',
    body: 'Workflows, boards, intake forms, automations — everything file-backed.',
    href: '/docs/build/workflows',
  },
  {
    icon: Code2,
    title: 'API & SDKs',
    body: 'REST reference, six language SDKs, the CLI, and webhooks.',
    href: '/docs/api',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance',
    body: 'SOC 2, HIPAA, GDPR, blockchain anchor, audit exports.',
    href: '/docs/compliance',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          Documentation
        </div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Kiket, explained.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          The platform that produces audit-grade evidence as a side effect of doing the work. Start with the
          quickstart, then dive into whichever pillar fits your role.
        </p>
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
