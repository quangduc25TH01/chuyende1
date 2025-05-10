import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức",
  icons: "ly-icon.png",
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
