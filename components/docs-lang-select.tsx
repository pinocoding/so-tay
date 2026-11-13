'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LANGUAGES, isLangCode, type LangCode } from '@/lib/home-i18n';

// Dropdown ngôn ngữ trong sidebar của sổ tay. Đổi ngôn ngữ sẽ giữ nguyên bài đang xem.
export function DocsLangSelect({ current }: { current: LangCode }) {
  const router = useRouter();
  const pathname = usePathname();

  function onChange(next: string) {
    // pathname dạng: ['', 'docs', môn, ngôn ngữ, ...bài]
    const parts = pathname.split('/');
    let target: string;

    if (parts.length >= 4 && isLangCode(parts[3])) {
      parts[3] = next;
      target = parts.join('/');
    } else {
      // Đang ở trang chủ sổ tay: mở phần giới thiệu của Claude Code theo ngôn ngữ đã chọn.
      target = `/docs/claude-code/${next}/introduction`;
    }

    router.push(target);
  }

  return (
    <label className="flex flex-col gap-1 text-sm mb-2">
      <span className="text-fd-muted-foreground">Ngôn ngữ</span>
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
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
