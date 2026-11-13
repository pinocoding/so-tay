import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LangSelect } from '@/components/lang-select';
import { HOME_TEXT, LANGUAGES, isLangCode } from '@/lib/home-i18n';

export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ lang: l.code }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLangCode(lang)) notFound();

  const text = HOME_TEXT[lang];

  return (
    <div className="flex flex-col justify-center items-center text-center flex-1 px-4">
      <LangSelect current={lang} />
      <h1 className="text-2xl font-bold mb-4 max-w-2xl">{text.intro}</h1>
      <p className="max-w-2xl mb-4 text-fd-muted-foreground">{text.note}</p>
      <p>
        <Link href="/docs" className="font-medium underline">
          {text.docsHint}
        </Link>
      </p>
    </div>
  );
}
