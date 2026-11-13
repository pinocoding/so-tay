import { redirect } from 'next/navigation';

// Trang gốc chuyển sang ngôn ngữ mặc định (tiếng Việt).
export default function RootPage() {
  redirect('/vi');
}
