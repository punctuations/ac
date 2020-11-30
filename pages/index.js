import Head from "next/head";
import { useState, useEffect } from "react";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "../components/AudioPlayer";
import useSWR from "swr";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
	first,
	second,
	third,
	fourth,
	songName,
	menu,
	playButton,
} from "../components/animations";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
	const fetcher = (url) => fetch(url).then((res) => res.json());

	const req = await fetcher("https://api.ipify.org/?format=json");
	return { props: { req } };
}

export default function Home(props) {
	useEffect(() => {
		const albumElm = document.getElementById("album");
		const { x, y, width, height } = albumElm.getBoundingClientRect();
		const centerPoint = { x: x + width / 2, y: y + height / 2 };

		window.addEventListener("mousemove", (e) => {
			const degreeX = (e.clientY - centerPoint.y) * -0.008;
			const degreeY = (e.clientX - centerPoint.x) * 0.008;

			albumElm.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
		});
	}, []);

	function dragToVolume() {}

	function audioUp() {
		Howler.volume(Howler.volume() + 0.1);
	}

	function audioDown() {
		Howler.volume(Howler.volume() - 0.1);
	}

	function menuSelection() {
		switch (album) {
			case 0:
				return "/albums/newhorizons.jpeg";
			case 1:
				return "/albums/newleaf.jpeg";
			case 2:
				return "/albums/cityfolk.jpeg";
			case 3:
				return "/albums/GCN.jpeg";
			default:
				return "";
		}
	}
	function backgroundArt() {
		switch (album) {
			case 0:
				return (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						exit={{ opacity: 1 }}
						className="album-horizons"
					></motion.div>
				);
			case 1:
				return (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						exit={{ opacity: 1 }}
						className="album-leaf"
					></motion.div>
				);
			case 2:
				return (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						exit={{ opacity: 1 }}
						className="album-city"
					></motion.div>
				);
			case 3:
				return (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						exit={{ opacity: 1 }}
						className="album-gcn"
					></motion.div>
				);
			default:
				return "";
		}
	}
	function gameName() {
		switch (album) {
			case 0:
				return "New Horizons";
			case 1:
				return "New Leaf";
			case 2:
				return "City Folk";
			case 3:
				return "Gamecube";
			default:
				return "";
		}
	}

	const [date, setTime] = useState(new Date().toLocaleTimeString());
	const [hour, setHour] = useState(
		new Date().toLocaleTimeString(["en-US"], { hour: "2-digit" })
	);

	const [gameMenu, setMenu] = useState(false);
	const [album, setAlbum] = useState(0);

	const [playback, setPlayback] = useState(false);

	const [volumeBar, setVolumeHover] = useState(false);

	setInterval(() => {
		setTime(new Date().toLocaleTimeString());
		setHour(new Date().toLocaleTimeString([], { hour: "2-digit" }));
	}, 1000);

	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data } = useSWR("https://api.ipify.org/?format=json", fetcher, {
		initialData: props.req,
	});

	return (
		<>
			<Head>
				<title>Animal Crossing - {hour}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
				/>
				<meta
					name="description"
					content="Animal Crossing Music Depending on the time!"
				/>
				<meta property="og:title" content="Animal Crossing Time" />
				<meta property="og:image" content="/favicon.ico" />
				<meta
					property="og:description"
					content="Animal Crossing Music Depending on the time!"
				/>
				<meta name="twitter:image" content="/favion.ico" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Animal Crossing Time" />
				<meta name="twitter:creator" content="@wwwdotca" />
				<meta name="twitter:site" content="@wwwdotca" />
				<meta name="theme-color" content="#16b816" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<AnimatePresence initial={false}>{backgroundArt()}</AnimatePresence>
			<div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col items-center justify-center z-10 absolute w-full h-full">
				<motion.div
					initial="initial"
					animate="enter"
					variants={fourth}
					className="font-bold text-white m-6 absolute top-0 left-0"
				>
					{date}
				</motion.div>
				<AnimatePresence initial={false}>
					{gameMenu && (
						<motion.div
							initial="initial"
							animate="open"
							exit="close"
							variants={menu}
							className="2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-wrap content-center flex 2xl:p-10 xl:p-10 lg:p-10 md:p-10 p-5 menu-bg rounded-lg shadow-xl"
						>
							<img
								src="/albums/newhorizons.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-16 rounded-md cursor-pointer 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-0 mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-8"
								onClick={() => setAlbum(0)}
							></img>
							<img
								src="/albums/newleaf.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-16 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-4"
								onClick={() => setAlbum(1)}
							></img>
							<img
								src="/albums/cityfolk.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-16 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-8"
								onClick={() => setAlbum(2)}
							></img>
							<img
								src="/albums/GCN.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-16 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-4"
								onClick={() => setAlbum(3)}
							></img>
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div
					initial="initial"
					animate="enter"
					variants={first}
					onClick={() => setMenu(!gameMenu)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="h-8 w-8 text-white cursor-pointer 2xl:flex xl:flex lg:flex md:flex hidden"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="h-8 w-8 text-white cursor-pointer 2xl:hidden xl:hidde lg:hidden md:hidden flex"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						/>
					</svg>
				</motion.div>
				<div className="relative">
					<motion.img
						src={menuSelection()}
						className="mt-5 max-w-xl w-full rounded-xl shadow-lg cursor-pointer"
						id="album"
						initial="initial"
						animate="enter"
						variants={first}
					/>
					<motion.div
						className="play-bg absolute rounded-lg p-2 cursor-pointer 2xl:ft-64 xl:left-64 lg:left-64 md:left-64 left-36 2xl:top-31 xl:top-31 lg:top-31 md:top-31 top-24"
						initial="initial"
						animate="play"
						variants={playButton}
						onClick={() => setPlayback(!playback)}
					>
						<AudioPlayerProvider>
							<AudioPlayer
								file={`/music/${gameName()}/${new Date().toLocaleTimeString(
									["en-US"],
									{
										hour: "2-digit",
									}
								)}.mp3`}
								pauseButton="/pause.svg"
								playButton="/play.svg"
							/>
						</AudioPlayerProvider>
					</motion.div>
				</div>
				<div className="flex-col">
					<motion.div
						initial="initial"
						animate="enter"
						className="font-bold p-3 text-lg md:text-2xl text-white cursor-default"
						variants={second}
					>
						<motion.span
							initial="initial"
							animate="enter"
							variants={third}
						></motion.span>{" "}
						<motion.span
							initial="initial"
							animate="enter"
							className="font-extrabold text-3xl hover:underline cursor-pointer"
							variants={songName}
						>
							{gameName()} - <span>{hour}</span>
						</motion.span>
						<br />
						Animal Crossing{" "}
					</motion.div>
					<motion.div
						initial="initial"
						animate="enter"
						className="font-bold p-3 text-white flex flex-row"
						variants={third}
					>
						<svg // soon to be mute button
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="h-6 w-6 cursor-pointer"
						>
							<path
								fillRule="evenodd"
								d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
								clipRule="evenodd"
							/>
						</svg>

						<motion.div
							className="ml-2 mt-1.5 px-1 flex flex-wrap content-center menu-bg w-32 h-3 rounded-lg"
							whileHover={{ scale: 1.1, height: 14 }}
						>
							<motion.div
								className="bg-white w-10 h-1 rounded-md flex justify-end"
								initial={{ width: `${Math.round(Howler.volume() * 100)}%` }}
								animate={{ width: `${Math.round(Howler.volume() * 100)}%` }}
								whileHover={() => setVolumeHover(true)}
								onHoverEnd={() => setVolumeHover(false)}
							>
								<AnimatePresence initial={false}>
									{volumeBar && (
										<motion.div
											className="bg-gray-200 w-2 h-2 rounded-lg -mt-0.5 content-center flex flex-wrap"
											drag="x"
											dragConstraints={{ left: 0, right: `100%` }}
											onDragEnd={() => dragToVolume()}
											initial={{
												opacity: 0,
											}}
											animate={{
												opacity: 1,
											}}
											exit={{ opacity: 0 }}
											whileHover={{ scale: 1.5 }}
										>
											<motion.div className="bg-white w-1 h-1 rounded-lg ml-0.5"></motion.div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						</motion.div>

						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 ml-4 mt-1 cursor-pointer select-none"
							onClick={() => audioUp()}
							whileTap={{ scale: 1.15 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</motion.svg>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 ml-2 mt-1 cursor-pointer select-none"
							onClick={() => audioDown()}
							whileTap={{ scale: 0.8 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M18 12H6"
							/>
						</motion.svg>
					</motion.div>
				</div>
			</div>
		</>
	);
}
