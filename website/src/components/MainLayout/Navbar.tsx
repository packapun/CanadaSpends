import Link from "next/link";

export const Navbar = () => {
	return (
		<nav className="flex-grow float-right relative block font-medium">
			<div className="items-center auto-cols-fr grid-cols-[auto_auto_auto_auto_1fr] grid-rows-[auto] justify-between flex h-full">
				<div className="items-stretch justify-end flex min-h-full gap-6">
					<Link
						className="items-center justify-center px-2 relative flex max-w-full -mb-0 py-0 text-black"
						href="/spending"
					>
						Spending
					</Link>
				</div>
			</div>
		</nav>
	);
};
