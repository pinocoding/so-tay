// Nội dung trang chủ theo ngôn ngữ.
// Thêm ngôn ngữ mới: thêm một khóa vào LANGUAGES và một mục vào HOME_TEXT.
export const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'Tiếng Anh' },
  { code: 'ja', label: 'Tiếng Nhật' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

export const HOME_TEXT: Record<
  LangCode,
  { intro: string; note: string; docsHint: string }
> = {
  vi: {
    intro:
      'Xin chào, mình là Pino, đây là trang Fumadocs của mình, nơi tập trung những gì mình đang học được về Claude, Mendix, Tiếng Nhật',
    note: 'Với quan điểm giải thích bằng ngôn ngữ dễ hiểu, lowcode hay noncode vẫn dễ dàng hiểu được.',
    docsHint: 'Nhấn để mở tài liệu.',
  },
  en: {
    intro:
      "Hello, I'm Pino. This is my Fumadocs site, where I collect what I'm learning about Claude, Mendix and Japanese.",
    note: 'My goal is to explain things in plain language, so that low-code and no-code people can easily understand them too.',
    docsHint: 'Click to open the documentation.',
  },
  ja: {
    intro:
      'こんにちは、Pino です。ここは私の Fumadocs サイトで、Claude、Mendix、日本語について学んだことをまとめています。',
    note: 'ローコードやノーコードの方にも分かりやすいように、やさしい言葉で説明することを大切にしています。',
    docsHint: 'クリックしてドキュメントを開く。',
  },
};

export function isLangCode(value: string): value is LangCode {
  return LANGUAGES.some((l) => l.code === value);
}
