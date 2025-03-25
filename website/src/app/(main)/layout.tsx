import { MainLayout } from "@/components/MainLayout";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MainLayout>{children}</MainLayout>
	);
}
