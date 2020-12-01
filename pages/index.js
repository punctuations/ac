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
	const res = await fetcher(
		`http://api.weatherapi.com/v1/current.json?key=c827c9095017472998c34458201611&q=${req.ip}`
	);
	return { props: { req, res } };
}

export default function Home(props) {
	useEffect(() => {
		const albumElm = document.getElementById("album");
		const { x, y, width, height } = albumElm.getBoundingClientRect();
		const centerPoint = { x: x + width / 2, y: y + height / 2 };

		window.addEventListener("mousemove", (e) => {
			const degreeX = (e.clientY - centerPoint.y) * -0.002;
			const degreeY = (e.clientX - centerPoint.x) * 0.002;

			albumElm.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
		});
	}, []);

	function music() {
		switch (weatherOpt) {
			case true:
				const str = `${props.res.current.condition.text}`;
				if (str.match(/rain/i)) {
					return `/music/${gameName()}/rain/${new Date().toLocaleTimeString(
						["en-US"],
						{
							hour: "2-digit",
						}
					)}.mp3`;
				} else if (str.match(/snow/i)) {
					return `/music/${gameName()}/snow/${new Date().toLocaleTimeString(
						["en-US"],
						{
							hour: "2-digit",
						}
					)}.mp3`;
				} else {
					return `/music/${gameName()}/${new Date().toLocaleTimeString(
						["en-US"],
						{
							hour: "2-digit",
						}
					)}.mp3`;
				}
			case false:
				return `/music/${gameName()}/${new Date().toLocaleTimeString(
					["en-US"],
					{
						hour: "2-digit",
					}
				)}.mp3`;
		}
	}

	function dragToVolume() {}

	function indicator() {
		switch (muted) {
			case true:
				return "/muted.svg";
			case false:
				return "/sound.svg";
		}
	}

	function toggleMute() {
		switch (muted) {
			case false:
				Howler.mute(true);
				setMutedState(true);
				break;
			case true:
				Howler.mute(false);
				setMutedState(false);
		}
	}

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

	const [weatherOpt, setWeatherPref] = useState(true);

	const [gameMenu, setMenu] = useState(false);
	const [album, setAlbum] = useState(0);

	const [muted, setMutedState] = useState(false);

	const [playback, setPlayback] = useState(false);

	const [volumeBar, setVolumeHover] = useState(false);

	const [optionsMenu, setOptions] = useState(false);

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

				<motion.div
					initial="initial"
					animate="enter"
					variants={fourth}
					className="text-white absolute bottom-0 right-0 m-6"
				>
					<a href="https://github.com/punctuations/ac" target="_blank">
						<svg
							width="24"
							height="24"
							fill="currentColor"
							className="opacity-50 hover:opacity-75 cursor-pointer"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
							></path>
						</svg>
					</a>
				</motion.div>
				<motion.div
					initial="initial"
					animate="enter"
					variants={fourth}
					className="text-white absolute top-0 right-0 m-6"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-7 h-7 opacity-50 hover:opacity-75 cursor-pointer"
						onClick={() => setOptions(!optionsMenu)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
						/>
					</svg>
				</motion.div>
				<AnimatePresence initial={false}>
					{optionsMenu && (
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							className="menu-bg text-md font-bold text-white shadow-md mr-4 mt-16 p-12 absolute top-0 right-0 rounded-lg"
						>
							<div>
								Custom Time:<br></br>
								<input type="time"></input>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
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
						className="z-0 mt-5 max-w-xl w-full rounded-xl shadow-lg cursor-pointer"
						id="album"
						initial="initial"
						animate="enter"
						variants={first}
					/>
					<motion.div
						className="z-999 play-bg absolute rounded-lg p-2 cursor-pointer 2xl:ft-64 xl:left-64 lg:left-64 md:left-64 left-36 2xl:top-31 xl:top-31 lg:top-31 md:top-31 top-24"
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
								)}.mp3`} //change out for music() once songs are added
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
						<img
							className="h-6 w-6 cursor-pointer indicator"
							src={indicator()}
							onClick={() => toggleMute()}
						/>

						<motion.div
							className="shadow-sm ml-2 mt-1.5 px-1 flex flex-wrap content-center menu-bg w-32 h-3 rounded-lg"
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
