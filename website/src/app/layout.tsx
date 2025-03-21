import { MainLayout } from "@/components/MainLayout";
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
	title: 'Get The Facts About Government Spending | Canada Spends',
	description: 'Government spending shouldn’t be a black box. We turn complex data into clear, non-partisan insights so every Canadian knows where their money goes.',
}

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
