import { Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { TwitterFeed } from "@/components/TwitterFeed";
import Link from "next/link";
import { FiCornerLeftDown, FiCornerRightDown } from "react-icons/fi";


export default function Home() {
	return (
		<>
			<section className="border-b-gray-200 border-b-2 flex-col justify-center relative flex overflow-hidden border-solid">
				<div className="px-4 py-0">
					<div className="items-center flex-col auto-cols-fr grid-cols-[.5fr_1.5fr_.5fr] grid-rows-[50px_auto_auto] justify-center justify-items-stretch text-center grid min-h-[88vh] py-0">
						<div
							className="items-center self-end flex-col col-end-3 col-start-2 justify-center flex max-w-[90.00rem]"
							style={{
								gridRow: "2",
							}}
						>
							<div className="relative my-4">
								<div className="text-fuchsia-600 bg-gray-200 bottom-0 left-0 absolute right-[51.88rem] top-[-216.75rem] z-[1] w-0 h-[200vw]" />
								<div className="text-gray-200 bg-gray-200 col-end-2 col-start-1 row-end-3 row-start-2 left-[-100vw] absolute z-[2] w-[300vw] h-0" />
								<div className="overflow-hidden text-[5.00rem] leading-none font-medium">
									<h1 className="pb-3 max-w-[18ch] m-0" id="h1-1">
										Get The Facts About Government Spending
									</h1>
								</div>
								<div className="text-gray-200 bg-gray-200 bottom-0 left-[-113.75rem] absolute right-0 top-[10.75rem] z-[2] w-[300vw] h-0" />
								<div className="bg-gray-200 self-start bottom-[-103.00rem] col-end-2 col-start-1 row-end-2 row-start-1 justify-self-start left-[51.88rem] absolute right-0 top-0 z-[1] w-0 h-[100vw]" />
							</div>
						</div>
						<div className="self-start col-end-3 col-start-2 row-end-4 row-start-3 relative overflow-hidden">
							<div className="items-center flex-col justify-center flex gap-8">
								<div className="flex-col flex max-w-[45.00rem] text-[1.63rem] leading-8 font-light">
									<p className="opacity-75">
										We share clear insights to level up transparency
										<br />
									</p>
								</div>
								<Link
									className="text-white bg-indigo-950 items-center font-medium justify-center py-2 px-4 relative flex w-auto min-w-[7.00rem] max-w-full overflow-hidden"
									href="/spending"
								>
									<div className="items-center cursor-pointer justify-center relative flex overflow-hidden">
										<div className="items-center justify-center flex p-1">
											Explore data
										</div>
									</div>
								</Link>
							</div>
						</div>
						<div className="items-center bottom-0 justify-center left-0 opacity-75 pb-3 absolute right-0 flex gap-[0.38rem] m-auto">
							<div className="pt-1 flex">
								<FiCornerLeftDown className="align-middle inline-block w-3 h-3 max-w-full" />
							</div>
							Start reading
							<div className="pt-1 flex">
								<FiCornerRightDown className="align-middle inline-block w-3 h-3 max-w-full" />
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-white">
				<div className="items-center flex-col justify-center py-20 flex">
					<div className="px-12 py-0">
						<div className="items-center flex-col justify-center text-center flex max-w-3xl gap-5">
							<div className="overflow-hidden text-5xl font-medium">
								<h2>You deserve the facts</h2>
							</div>
							<div className="overflow-hidden text-xl">
								<div className="items-center flex-col justify-center flex max-w-3xl gap-5">
									<p className="opacity-75">
										Government spending shouldn’t be a black box. Every year,
										the federal government spends hundreds of billions of
										dollars but most Canadians have no clue where it all goes.
										The data is available, but it’s buried on obscure websites
										and impossible to navigate.
									</p>
									<p className="opacity-75">
										Canada Spends changes this. We take raw federal spending
										data and turn it into accurate, straightforward facts so you
										can understand how your money is used.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Section className="bg-[#fafafa]">
				<NoSSR>
					<TwitterFeed />
				</NoSSR>
			</Section>

		</>
	);
}
