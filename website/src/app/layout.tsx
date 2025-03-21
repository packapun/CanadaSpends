import { MainLayout } from "@/components/MainLayout";
import { cn } from '@/lib/utils';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
	title: "Canada Spends v2",
	description: "Canada Spends v2",
};

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['600', '700'],
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("antialiased", plusJakartaSans.className)}>
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
