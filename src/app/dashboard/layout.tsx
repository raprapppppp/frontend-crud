import SideNavbar from "@/components/SideNavbar"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="min-h-screen flex max-w-full w-full">
			<SideNavbar />
			{children}
		</div>
	)
}
