import Image from "next/image";
import logoText from "./logo-text.svg";

export const Footer = () => {
	return (
		<section className="bg-neutral-100 p-6">
			<div className="bg-white auto-cols-fr grid-cols-[1.75fr] grid-rows-[auto] grid border-2 border-gray-200 border-solid">
				<div className="flex-col auto-cols-fr grid-cols-[1fr] grid-rows-[1fr_auto] grid">
					<div className="px-12 py-0">
						<div className="gap-x-40 auto-cols-fr grid-cols-[1fr_.75fr] grid-rows-[auto] pb-16 pt-12 gap-y-12 grid">
							<a
								className="text-indigo-950 justify-self-center underline inline-block w-full max-w-full col-span-2 row-span-1"
								href="/"
							>
								<Image
									className="cursor-pointer align-middle inline-block w-full h-32 max-w-full"
									src={logoText}
									alt="Canada Spends"
								/>
							</a>
							<div className="items-stretch flex-col justify-start flex">
								<div className="items-start flex-col justify-start flex max-w-[34.38rem]">
									Sharing clear insights on government spending.{" "}
									<div className="items-center justify-start flex mt-3 text-indigo-950">
										<a
											className="items-center justify-center relative underline flex w-8 h-8 max-w-full overflow-hidden border-2 border-gray-200 border-solid"
											href="https://x.com/canada_spends"
										>
											<div className="items-center cursor-pointer justify-center relative flex overflow-hidden">
												<div className="items-center justify-center flex p-1">
													<Image
														className="align-middle inline-block w-3 h-3 min-w-[0.80rem] min-h-[0.80rem] max-w-none"
														src={logoText}
														alt="Canada Spends"
													/>
												</div>
											</div>
											<div className="bg-gray-200 bottom-0 cursor-pointer left-0 absolute top-0 z-[1] -m-0" />
										</a>
									</div>
								</div>
							</div>
							{/* <div className="items-stretch self-end flex-col justify-start flex">
								<div className="items-start flex-col justify-center flex">
									<div className="w-full mt-0  mx-0 mb-3.5">
										<div className="items-center justify-start opacity-75 pb-4 flex">
											Get the facts weekly, right in your inbox
											<div className="pt-1 flex">
												<img
													className="align-middle inline-block w-3 h-3 max-w-full"
													src="https://cdn.prod.website-files.com/67aa9b6643a673905e60692a/67aa9b6643a673905e6069b5_corner-right-down-dark.svg"
												/>
											</div>
										</div>
										<form className="bg-neutral-100 flex border-2 border-gray-200 border-solid gap-2 p-1.5">
											<input
												className="bg-white cursor-text text-sm py-2 pl-4 pr-3 w-full h-12 min-w-[12.50rem] min-h-[2.88rem] border-2 border-gray-200 border-solid m-0"
												placeholder="Enter your email"
												type="email"
											/>
											<input
												className="text-white bg-indigo-950 items-center cursor-pointer font-medium justify-center py-2 px-4 text-center flex w-auto h-12 min-w-[7.00rem] overflow-hidden border-2 border-indigo-950 border-solid m-0"
												type="submit"
												value="Subscribe now"
											/>
										</form>
									</div>
								</div>
							</div> */}
						</div>
					</div>
					<div className="border-t-gray-200 border-t-2 py-6 border-solid text-sm">
						<div className="px-12 py-0">
							<div className="items-center justify-between flex">
								<div>© Copyright Canada Spends 2025</div>
								<div>
									A Project of{" "}
									<a
										className="text-indigo-950 underline"
										href="https://www.buildcanada.com/"
									>
										Build Canada
									</a>
									.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
