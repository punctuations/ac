import Head from "next/head";
import { motion } from "framer-motion";
import { first, second, third, fourth } from "../components/animations";

export default function Error() {
	return (
		<>
			<Head>
				<title>Animal Crossing - 404</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
				/>
				<meta
					name="description"
					content="Animal Crossing Music Depending on the time! - 404"
				/>
				<meta property="og:title" content="Animal Crossing Time - 404" />
				<meta property="og:image" content="/favicon.ico" />
				<meta
					property="og:description"
					content="Animal Crossing Music Depending on the time! - 404"
				/>
				<meta name="twitter:image" content="/favion.ico" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Animal Crossing Time - 404" />
				<meta name="twitter:creator" content="@wwwdotca" />
				<meta name="twitter:site" content="@wwwdotca" />
				<meta name="theme-color" content="#16b816" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<div className="bg">
				<div className="h-full w-full absolute flex items-center justify-center">
					<motion.svg
						initial="initial"
						animate="enter"
						variants={second}
						viewBox="0 0 200 200"
						xmlns="http://www.w3.org/2000/svg"
						className="2xl:h-64 xl:h-64 lg:h-64 md:h-48 sm:h-48 h-28 2xl:w-64 xl:w-64 lg:w-64 md:w-48 sm:w-48 w-28 2xl:mb-64 xl:mb-64 lg:mb-64 md:mb-40 sm:mb-32 mb-8 2xl:-ml-72 xl:-ml-72 lg:-ml-72 md:-ml-36 sm:ml-40 -ml-48 drop-shadow absolute flex items-center justify-center xl:z-0 lg:z-0 md:z-0 sm:z-10 z-0"
					>
						<path
							fill="#AF6FCB"
							d="M12.4,-5.6C17.5,11.6,24,26.7,15.3,36.8C6.6,46.8,-17.3,51.8,-32.8,41.4C-48.4,31,-55.5,5.3,-48.6,-14.3C-41.8,-33.9,-20.9,-47.5,-8.6,-44.7C3.7,-41.9,7.4,-22.8,12.4,-5.6Z"
							transform="translate(100 100)"
						/>
					</motion.svg>
				</div>
				<div className="h-full w-full absolute flex items-center justify-center">
					<motion.svg
						initial="initial"
						animate="enter"
						variants={third}
						viewBox="0 0 200 200"
						xmlns="http://www.w3.org/2000/svg"
						className="2xl:h-64 xl:h-64 lg:h-64 md:h-32 sm:h-32 h-24 2xl:w-64 xl:w-64 lg:w-64 md:w-32 sm:w-32 w-24 2xl:mt-64 xl:mt-64 lg:mt-64 md:mt-48 sm:mt-32 mt-32 2xl:ml-14 xl:ml-14 lg:ml-14 md:ml-14 sm:-ml-24 ml-16 drop-shadow 2xl:z-0 xl:z-0 lg:z-0 md:z-10 sm:z-0 z-0"
					>
						<path
							fill="#FF0066"
							d="M44.2,-15.6C51.2,6.9,46.3,32,27.7,47.8C9.1,63.6,-23.3,70.2,-44,56.2C-64.6,42.2,-73.4,7.7,-64.1,-18C-54.9,-43.8,-27.4,-60.8,-4.4,-59.4C18.7,-58,37.3,-38.1,44.2,-15.6Z"
							transform="translate(100 100)"
						/>
					</motion.svg>
				</div>
				<div className="h-full w-full absolute flex items-center justify-center">
					<motion.svg
						initial="initial"
						animate="enter"
						variants={fourth}
						viewBox="0 0 200 200"
						xmlns="http://www.w3.org/2000/svg"
						className="2xl:h-64 xl:h-64 lg:h-64 md:h-32 sm:h-32 h-20 2xl:w-64 xl:w-64 lg:w-64 md:w-32 sm:w-32 w-20 2xl:ml-80 xl:ml-80 lg:ml-80 md:ml-104 sm:ml-104 ml-24 2xl:mt-0 lg:mt-0 md:mt-16 sm:mt-12 -mt-16 drop-shadow"
					>
						<path
							fill="#FA4D56"
							d="M33,-9.5C42,17.1,48.1,45.8,34.7,58C21.2,70.3,-11.8,65.9,-23.2,52.7C-34.6,39.5,-24.5,17.4,-17.1,-7C-9.6,-31.4,-4.8,-58.1,3.6,-59.2C12,-60.4,24,-36,33,-9.5Z"
							transform="translate(100 100)"
						/>
					</motion.svg>
				</div>
				<div className="h-full w-full absolute flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-center">
					<motion.div
						initial="initial"
						animate="enter"
						variants={first}
						className="glass rounded-xl 2xl:p-32 xl:p-32 lg:p-32 md:p-16 sm:p-16 p-8 text-white font-semibold shadow-2xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-xl sm:text-lg text-md"
					>
						<span className="text-shadow select-none">404</span>
					</motion.div>
					<motion.div
						initial="initial"
						animate="enter"
						variants={second}
						className="glass 2xl:z-0 xl:z-0 lg:z-0 md:z-20 sm:z-20 z-0 2xl:ml-80 xl:ml-80 lg:ml-80 md:ml-64 sm:ml-64 ml-16 2xl:mt-64 xl:mt-64 lg:mt-64 md:mt-40 sm:mt-0 mt-14 absolute rounded-xl 2xl:p-12 xl:p-12 lg:p-12 md:p-6 sm:p-6 p-3 text-white font-semibold shadow-2xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-xl sm:text-lg text-sm"
					>
						<span className="text-shadow select-none">page not found</span>
					</motion.div>
				</div>
			</div>
		</>
	);
}
