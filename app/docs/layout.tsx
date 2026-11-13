import type { ReactNode } from 'react';

// Sidebar được dựng trong từng trang (app/docs/[[...slug]]/page.tsx)
// để lọc đúng ngôn ngữ đang chọn.
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
