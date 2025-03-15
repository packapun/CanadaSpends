import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/MainLayout";

export const metadata: Metadata = {
	title: "Canada Spends v2",
	description: "Canada Spends v2",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
