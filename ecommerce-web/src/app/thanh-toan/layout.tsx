import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Thanh toán",
  icons: "ly-icon.png",
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
