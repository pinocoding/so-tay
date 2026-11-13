import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getMDXComponents } from '@/components/mdx';
import { DocsLangSelect } from '@/components/docs-lang-select';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { baseOptions } from '@/lib/layout.shared';
import {
  UPDATING_NOTICE,
  isSubjectLangPath,
  langFromSlug,
  langTree,
} from '@/lib/docs-lang';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;

  // /docs mở thẳng môn Claude Code, tiếng Việt, để sidebar luôn hiện theo cấu trúc chọn môn.
  if (!params.slug || params.slug.length === 0) {
    redirect('/docs/claude-code/vi/introduction');
  }

  const page = source.getPage(params.slug);
  const lang = langFromSlug(params.slug);

  // Bài không tồn tại, và không phải bài của một môn theo ngôn ngữ: báo 404.
  if (!page && !isSubjectLangPath(params.slug)) notFound();

  const tree = langTree(source.getPageTree(), lang);
  const subject = params.slug?.[0];

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions()}
      sidebar={{ banner: <DocsLangSelect current={lang} /> }}
    >
      {page ? (
        <DocsContent page={page} />
      ) : (
        <UpdatingPage subject={subject} lang={lang} />
      )}
    </DocsLayout>
  );
}

function UpdatingPage({ subject, lang }: { subject: string | undefined; lang: keyof typeof UPDATING_NOTICE }) {
  const notice = UPDATING_NOTICE[lang];
  return (
    <DocsPage>
      <DocsTitle>{notice.title}</DocsTitle>
      <DocsBody>
        <p>{notice.body}</p>
        <p>
          <Link href={`/docs/${subject}/${lang}/introduction`} className="font-medium underline">
            {notice.link}
          </Link>
        </p>
      </DocsBody>
    </DocsPage>
  );
}

function DocsContent({ page }: { page: NonNullable<ReturnType<typeof source.getPage>> }) {
  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${encodeURI(page.path)}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return { title: 'Đang cập nhật' };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
