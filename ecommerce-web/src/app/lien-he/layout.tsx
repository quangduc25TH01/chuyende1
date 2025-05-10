import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Giới thiệu",
  icons: "ly-icon.png",
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
