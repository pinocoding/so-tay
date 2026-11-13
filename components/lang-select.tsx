'use client';

import { useRouter } from 'next/navigation';
import { LANGUAGES, type LangCode } from '@/lib/home-i18n';

export function LangSelect({ current }: { current: LangCode }) {
  const router = useRouter();

  return (
    <label className="mb-6 inline-flex items-center gap-2 text-sm">
      <span>Ngôn ngữ:</span>
      <select
        value={current}
        onChange={(e) => router.push(`/${e.target.value}`)}
        className="rounded-md border bg-fd-background px-3 py-1.5"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
