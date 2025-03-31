import { clear } from "console";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Government Workforce & Spending Data | See the Breakdown',
  description: 'See how Canada's government spends tax dollars—track workforce data, spending trends, and federal debt with clear, non- partisan insights.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    {children}
  </>);
}
