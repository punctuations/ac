import Head from "next/head";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { AudioPlayerProvider } from "react-use-audio-player";
import AudioPlayer from "../components/AudioPlayer";
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

export async function getStaticProps() {
	const fetcher = (url) => fetch(url).then((r) => r.json());

	const res = await fetcher("https://api.ipify.org/?format=json");
	const weather = await fetcher(
		`http://api.weatherapi.com/v1/current.json?key=c827c9095017472998c34458201611&q=${res.ip}`
	);

	return {
		props: {
			res,
			weather,
		},
	};
}

export default function Home(props) {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data: client } = useSWR(
		"https://api.ipify.org/?format=json",
		fetcher,
		{ initialData: props.res }
	);
	const {
		data: weather,
	} = useSWR(
		`http://api.weatherapi.com/v1/current.json?key=c827c9095017472998c34458201611&q=${client.ip}`,
		fetcher,
		{ initialData: props.weather }
	);

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

	const [override, setOverride] = useState(null);

	function changeTime() {
		if (document.getElementById("time").value != "") {
			if (parseInt(document.getElementById("time").value.split(":")[0]) == 0) {
				setOverride(`12 AM`);
			} else if (
				parseInt(document.getElementById("time").value.split(":")[0]) == 12
			) {
				setOverride(`12 PM`);
			} else if (
				parseInt(document.getElementById("time").value.split(":")[0]) >= 13
			) {
				setOverride(
					`${
						parseInt(document.getElementById("time").value.split(":")[0]) % 12
					} PM`
				);
			} else {
				setOverride(
					`${parseInt(document.getElementById("time").value.split(":")[0])} AM`
				);
			}
		}
	}

	function music() {
		switch (override != null) {
			case true:
				switch (weatherOpt) {
					case true:
						const str = `${weather.current.condition.text}`;
						if (str.match(/rain/i)) {
							return `/music/${gameName()}/rain/${override}.mp3`;
						} else if (str.match(/snow/i)) {
							return `/music/${gameName()}/snow/${override}.mp3`;
						} else {
							return `/music/${gameName()}/${override}.mp3`;
						}
					case false:
						return `/music/${gameName()}/${override}.mp3`;
				}
			case false:
				switch (weatherOpt) {
					case true:
						const str = `${weather.current.condition.text}`;
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

	function gameHour() {
		if (override != null) {
			return override;
		} else {
			return hour;
		}
	}

	const [weatherOpt, setWeatherPref] = useState(true);

	const [gameMenu, setMenu] = useState(false);
	const [album, setAlbum] = useState(0);

	const [muted, setMutedState] = useState(false);

	const [playback, setPlayback] = useState(false);

	const [volumeBar, setVolumeHover] = useState(false);

	const [optionsMenu, setOptions] = useState(false);
	const [tooltip, setTooltip] = useState(false);

	setInterval(() => {
		setTime(new Date().toLocaleTimeString());
		setHour(new Date().toLocaleTimeString([], { hour: "2-digit" }));
	}, 1000);

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
			<div>{backgroundArt()}</div>
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
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
							></path>
						</svg>
					</a>
				</motion.div>
				<motion.div
					initial="initial"
					animate="enter"
					variants={fourth}
					className="z-40 text-white absolute top-0 right-0 m-6"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="#999797"
						className="w-5 h-5 2xl:opacity-50 xl:opacity-50 lg:opacity-50 md:opacity-50 sm:opacity-50 opacity-100 hover:opacity-75 cursor-pointer"
						onClick={() => setOptions(!optionsMenu)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</motion.div>
				<AnimatePresence initial={false}>
					{optionsMenu && (
						<>
							<AnimatePresence initial={false}>
								{tooltip && (
									<>
										<motion.div
											className="z-40 menu-bg text-sm text-white shadow-md mr-90 mt-14 p-12 absolute top-0 right-0 rounded-lg 2xl:flex xl:flex lg:flex md:flex sm:flex hidden"
											initial={{ opacity: 0, x: -40 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -40 }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="h-4 w-4 float-left mr-1"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
												/>
											</svg>
											<p>
												I believe in privacy, that is why there is{" "}
												<span className="font-bold">no</span> tracking,
												<br /> your location is soley used to get the weather.
												<br />
												Your location is not touched other than this reason.
												<br />
												If you want more information on how
												<br />
												your location is used you can look at the
												<br /> GitHub repo, you can find it in the bottom right.{" "}
											</p>
										</motion.div>

										<div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden flex justify-center items-center">
											<motion.div
												className="z-40 menu-bg absolute text-sm text-white shadow-md p-12 rounded-lg"
												initial={{ opacity: 0, y: 40 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 40 }}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													className="h-4 w-4 absolute top-0 right-0 m-6"
													onClick={() => setTooltip(!tooltip)}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													className="h-4 w-4 float-left mr-1"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
													/>
												</svg>
												<p>
													I believe in privacy, that is why there is{" "}
													<span className="font-bold">no</span> tracking,
													<br /> your location is soley used to get the weather.
													<br />
													Your location is not touched other than this reason.
													<br />
													If you want more information on how
													<br />
													your location is used you can look at the
													<br /> GitHub repo, you can find it in the bottom
													right.{" "}
												</p>
											</motion.div>
										</div>
									</>
								)}
							</AnimatePresence>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 50 }}
								className="z-30 menu-bg text-md font-bold text-white shadow-md 2xl:mr-4 xl:mr-4 lg:mr-4 md:mr-4 sm:mr-4 mr-0 2xl:mt-14 xl:mt-14 lg:mt-14 md:mt-14 sm:mt-14 mt-0 p-12 absolute top-0 right-0 rounded-lg 2xl:w-auto xl:w-auto lg:w-auto md:w-auto sm:w-auto w-full 2xl:h-auto xl:h-auto lg:h-auto md:h-auto sm:h-auto h-full"
							>
								<div className="text-shadow">
									<motion.svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="h-4 w-4 inline mr-1 select-none"
										whileHover={() => setTooltip(true)}
										onHoverEnd={() => setTooltip(false)}
										onClick={() => setTooltip(!tooltip)}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</motion.svg>
									Opt-{weatherOpt ? "Out of" : "In to"} weather:
									{weatherOpt ? (
										<>
											<br />
											<p className="font-semibold inline">
												You are currently Opted-In
											</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="h-6 w-6 ml-1 inline cursor-pointer select-none text-green-200"
												onClick={() => setWeatherPref(false)}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
												/>
											</svg>
										</>
									) : (
										<>
											<br />
											<p className="font-semibold inline">
												You are currently Opted-Out
											</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="h-6 w-6 ml-1 inline cursor-pointer select-none text-rose-300"
												onClick={() => setWeatherPref(true)}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
												/>
											</svg>
										</>
									)}
								</div>
								<div>
									Custom Time:<br></br>
									<input
										id="time"
										type="time"
										placeholder="--:-- --"
										className="opacity-50"
									/>
									<input
										onClick={() => changeTime()}
										type="submit"
										className=" ml-2 shadow-lg p-1 rounded-md focus:outline-none cursor-pointer glass opacity-75"
									/>
								</div>
							</motion.div>
						</>
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
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-20 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-10 rounded-md cursor-pointer 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-0 mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml4"
								onClick={() => setAlbum(0)}
							></img>
							<img
								src="/albums/newleaf.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-20 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-10 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-2"
								onClick={() => setAlbum(1)}
							></img>
							<img
								src="/albums/cityfolk.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-20 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-10 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-2"
								onClick={() => setAlbum(2)}
							></img>
							<img
								src="/albums/GCN.jpeg"
								className="2xl:w-64 xl:w-64 lg:w-64 md:w-64 w-20 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-10 rounded-md cursor-pointer mt-4 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 ml-2"
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
					<div className="flex items-center justify-center">
						<motion.img
							src={menuSelection()}
							className="transform-origin z-0 mt-5 max-w-xl w-full rounded-xl shadow-lg cursor-pointer"
							id="album"
							initial="initial"
							animate="enter"
							variants={first}
						/>
						<motion.div
							className="absolute z-20 play-bg rounded-lg p-2 cursor-pointer"
							initial="initial"
							animate="play"
							variants={playButton}
							onClick={() => setPlayback(!playback)}
						>
							<AudioPlayerProvider>
								<AudioPlayer
									file={music()}
									pauseButton="/pause.svg"
									playButton="/play.svg"
								/>
							</AudioPlayerProvider>
						</motion.div>
					</div>
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
							{gameName()} - <span>{gameHour()}</span>
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
