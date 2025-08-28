import { Layout } from '@/components/layout/layout';

export default function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}