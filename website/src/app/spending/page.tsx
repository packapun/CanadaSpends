import NoSSR from "@/components/NoSSR";
import { Sankey } from "@/components/Sankey";

export default function Spending() {
	return (
		<>
			<section className="border-b-gray-200 border-b-2 flex-col justify-center relative flex overflow-hidden border-solid">
				<div className="items-center flex-col justify-center py-20 flex">
					<div className="px-12 py-0">
						<div className="items-center flex-col justify-center text-center flex max-w-3xl gap-5">
							<div className="overflow-hidden text-5xl font-medium">
								<h2>Government spending in Canada</h2>
							</div>
							<div className="overflow-hidden text-xl">
								<div className="items-center flex-col justify-center flex max-w-3xl gap-5">
									<p className="opacity-75">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Quisquam, quos.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-black">
				<Sankey />
			</section>
		</>
	);
}
