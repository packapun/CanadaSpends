"use client"

import { ExternalLink } from "@/components/Layout";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import logoText from "./logo-text.svg";

const navigation = {
	company: [
		{ name: 'Spending', href: '/spending' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' },
	],
	social: [
		{
			name: 'X',
			href: 'https://x.com/canada_spends',
			icon: (props: any) => (
				<FaXTwitter {...props} />
			),
		},

	],
}

const Subscribe = () => {
	return <div className="mt-10 xl:mt-0">
		<h3 className="text-sm/6 font-semibold text-gray-900">Subscribe to our newsletter</h3>
		<p className="mt-2 text-sm/6 text-gray-600">
			Get the facts weekly, right in your inbox.
		</p>
		<form className="mt-6 sm:flex sm:max-w-md">
			<label htmlFor="email-address" className="sr-only">
				Email address
			</label>
			<input
				id="email-address"
				name="email-address"
				type="email"
				required
				placeholder="Enter your email"
				autoComplete="email"
				className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:w-64 sm:text-sm/6 xl:w-full"
			/>
			<div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
				<button
					type="submit"
					className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Subscribe
				</button>
			</div>
		</form>
	</div>
}

export const Footer = () => {
	return (
		<footer className="border-t-gray-200 border-t-2 border-solid">
			<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 ">
				<div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
					<div className="xl:grid xl:grid-cols-3 xl:gap-8">
						<div className="grid grid-cols-2 gap-8 xl:col-span-2">
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<Image src={logoText} alt="Canada Spends Logo" height={300} />
									<ul role="list" className="mt-6 space-y-4">
										{navigation.company.map((item) => (
											<li key={item.name}>
												<a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{/* <Subscribe /> */}

					</div>
					<div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
						<div className="flex gap-x-6 md:order-2">
							{navigation.social.map((item) => (
								<ExternalLink key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
									<span className="sr-only">{item.name}</span>
									<item.icon aria-hidden="true" className="size-6" />
								</ExternalLink>
							))}
						</div>
						<p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
							&copy; 2025 Canada Spends. All rights reserved. A Project of <ExternalLink href="https://www.buildcanada.ca" className="underline text-gray-900 font-bold">Build Canada</ExternalLink>.
						</p>
					</div>
				</div>

			</div>
		</footer>
	);
};
