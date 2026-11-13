import type * as PageTree from 'fumadocs-core/page-tree';
import { isLangCode, type LangCode } from '@/lib/home-i18n';

export const DEFAULT_LANG: LangCode = 'vi';

// Lấy ngôn ngữ từ địa chỉ: /docs/{môn}/{ngôn ngữ}/...
export function langFromSlug(slug: string[] | undefined): LangCode {
  const code = slug?.[1];
  return code && isLangCode(code) ? code : DEFAULT_LANG;
}

// Trang có thuộc một môn theo ngôn ngữ không: /docs/{môn}/{ngôn ngữ}/...
export function isSubjectLangPath(slug: string[] | undefined): boolean {
  return !!slug && slug.length >= 2 && isLangCode(slug[1]);
}

// Lấy mã ngôn ngữ của một thư mục con từ địa chỉ của bài đầu tiên bên trong.
function firstPage(node: PageTree.Node): PageTree.Item | undefined {
  if (node.type === 'page') return node;
  if (node.type === 'folder') {
    for (const child of node.children) {
      const found = firstPage(child);
      if (found) return found;
    }
  }
  return undefined;
}

function folderLang(node: PageTree.Folder): LangCode | undefined {
  const code = firstPage(node)?.url.split('/')[3];
  return code && isLangCode(code) ? code : undefined;
}

// Trong mỗi môn, chỉ giữ thư mục của ngôn ngữ đang chọn.
export function langTree(root: PageTree.Root, lang: LangCode): PageTree.Root {
  return {
    ...root,
    children: root.children.map((node) => {
      if (node.type !== 'folder') return node;

      const langFolders = node.children.filter(
        (c): c is PageTree.Folder => c.type === 'folder' && folderLang(c) !== undefined,
      );
      if (langFolders.length === 0) return node;

      const chosen = langFolders.find((c) => folderLang(c) === lang);
      return { ...node, children: chosen ? chosen.children : [] };
    }),
  };
}

export const UPDATING_NOTICE: Record<LangCode, { title: string; body: string; link: string }> = {
  vi: {
    title: 'Đang cập nhật',
    body: 'Nội dung này chưa có bản tiếng Việt, đang được cập nhật.',
    link: 'Xem trang giới thiệu',
  },
  en: {
    title: 'Coming soon',
    body: 'This page is not available in English yet. It is being updated.',
    link: 'Go to the introduction',
  },
  ja: {
    title: '準備中',
    body: 'この内容の日本語版はまだありません。現在準備中です。',
    link: '紹介ページへ',
  },
};
