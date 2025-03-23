import Image from "next/image";
import Link from "next/link";
import { Footer } from "./Footer";
import logoFull from "./logo-full.svg";
import logoGlyph from "./logo-glyph.svg";

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
	return (
		<Link
			className="items-center justify-center px-2 relative flex max-w-full -mb-0 py-0 text-black"
			href={href}
		>
			{children}
		</Link>
	);
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="sticky z-[100] border-b-gray-200 border-b-2 w-full border-solid px-4 sm:px-12 py-0">
				<div className="w-full max-w-6xl mx-auto">
					<div className="items-stretch auto-cols-fr justify-between flex min-h-16 gap-2 sm:gap-8 m-auto">
						<Link
							className="items-center float-left justify-center flex pl-0"
							href="/"
						>
							<Image
								className="cursor-pointer align-middle w-40 h-12 max-w-full hidden sm:block"
								alt="Canada Spends Logo"
								src={logoFull}
							/>
							<Image
								className="cursor-pointer align-middle inline-block w-40 h-12 max-w-full sm:hidden min-w-[75px]"
								alt="Canada Spends Logo"
								src={logoGlyph}
							/>
						</Link>
						<div className="items-stretch justify-end flex min-h-full gap-6">
							<NavLink href="/spending">Spending</NavLink>
							<NavLink href="/about">About</NavLink>
							<NavLink href="/contact">Contact</NavLink>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="min-h-full items-center flex-col justify-between overflow-clip">
					<div className="w-full max-w-[120.00rem] m-auto">
						<main >
							{children}
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
