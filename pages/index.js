import Head from "next/head";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import {
  first,
  second,
  third,
  fourth,
  songName,
  menu
} from "../components/animations";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const req = await fetcher("https://api.ipify.org/?format=json");
  return { props: { req } };
}

export default function Home(props) {
  // const music = new Audio(
  //   `/music/New Horizons/${new Date().toLocaleTimeString([], {
  //     hour: "2-digit",
  //   })}.mp3`
  // );
  // music.play();
  // fix this
  
  function menuSelection() {
      switch(album) {
        case 0:
          return "/albums/newhorizons.jpeg";
        case 1:
          return "/albums/newleaf.jpeg";
        case 2:
          return "/albums/cityfolk.jpeg";
        case 3:
          return "/albums/GCN.jpeg"
        default:
          return '';
      }
  }
  function backgroundArt() {
    switch(album) {
      case 0:
        return <div className="album-horizons"></div>;
      case 1:
        return <div className="album-leaf"></div>;
      case 2:
        return <div className="album-city"></div>;
      case 3:
        return <div className="album-gcn"></div>;
      default:
        return '';
    }
}

  const [date, setTime] = useState(new Date().toLocaleTimeString());
  const [hour, setHour] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit" })
  );

  const [gameMenu, setMenu] = useState(false);
  const [album, setAlbum] = useState(0);

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
        <title>Animal Crossing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <audio controls autoplay loop src="/music/New Horizons/10PM.mp3"></audio> */}
      {backgroundArt()}
      <div className="flex flex-row items-center justify-center z-10 absolute w-full h-full">
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
            className="p-10 menu-bg rounded-lg shadow shadow-xl">
                <img src="/albums/newhorizons.jpeg" className="w-64 h-32 rounded-md cursor-pointer" onClick={() => setAlbum(0)}></img>
                <img src="/albums/newleaf.jpeg" className="w-64 h-32 rounded-md cursor-pointer mt-4" onClick={() => setAlbum(1)}></img>
                <img src="/albums/cityfolk.jpeg" className="w-64 h-32 rounded-md cursor-pointer mt-4" onClick={() => setAlbum(2)}></img>
                <img src="/albums/GCN.jpeg" className="w-64 h-32 rounded-md cursor-pointer mt-4" onClick={() => setAlbum(3)}></img>
            </motion.div>
        )}
        </AnimatePresence>
        <motion.div initial="initial" animate="enter" variants={first} onClick={() => setMenu(!gameMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8 text-white cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </motion.div>
        <motion.img
          src={menuSelection()}
          className="mt-5 max-w-xl w-full rounded-xl shadow-lg cursor-pointer"
          initial="initial"
          animate="enter"
          variants={first}
        />
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
              New Horizons - <span>{hour}</span>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 cursor-default"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 ml-4 mt-1 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 ml-2 mt-1 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
}
