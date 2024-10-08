import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Notification panel",
	description: "Created by Dimitar P.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/svg+xml"
					href="/favicon.svg"
				/>
			</head>
			<body className={inter.className}>
				<main className="flex min-h-screen flex-col items-center md:p-24">
					{children}
				</main>
			</body>
		</html>
	);
}
