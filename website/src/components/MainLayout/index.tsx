import Image from "next/image";
import logo from "./logo.svg";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div className="min-h-full">
				<div className="items-center flex-col justify-between overflow-clip">
					<div className="w-full max-w-[120.00rem] m-auto">
						<main className="bg-white">
							<div className="sticky z-[100]">
								<div className="border-b-gray-200 border-b-2 relative w-full border-solid">
									<div className="px-12 py-0">
										<div className="items-stretch auto-cols-fr grid-cols-[1fr_1fr_1fr] grid-rows-[auto] justify-between flex min-h-[4.00rem] gap-8 m-auto">
											<Link
												className="items-center float-left justify-center flex pl-0"
												href="/"
											>
												<Image
													className="cursor-pointer align-middle inline-block w-40 h-12 max-w-full"
													alt="Canada Spends Logo"
													src={logo}
												/>
											</Link>
											<div className="bg-gray-200 w-0" />
											<Navbar />
										</div>
									</div>
								</div>
							</div>
							{children}
							<Footer />
						</main>
					</div>
				</div>
			</div>
		</div>
	);
};
