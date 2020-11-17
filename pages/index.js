import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { first, second, third, songName } from "../components/Animations";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const req = await fetcher("https://api.ipify.org/?format=json");
  return { props: { req } };
}

export default function Home(props) {
  const [newSong, setSongState] = useState(false);

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
      <div className="flex flex-col items-center justify-center">
        <motion.hr
          initial="initial"
          animate="enter"
          className="mt-8 h-2 w-1/2 lg:w-4/12"
          variants={first}
        />
        <motion.div
          initial="initial"
          animate="enter"
          className="font-bold p-3 text-lg md:text-2xl text-black"
          variants={second}
        >
          {data}{" "}
          <motion.span initial="initial" animate="enter" variants={third}>
            •
          </motion.span>{" "}
          <motion.span
            initial="initial"
            animate={newSong ? "leave" : "enter"}
            variants={songName}
          >
            GCN - 12PM
          </motion.span>
        </motion.div>
      </div>

      <button
        className="border-2 rounded-lg border-green-500 hover:border-teal-400 p-2 px-4"
        onClick={() => setSongState(!newSong)}
      >
        Test
      </button>
    </>
  );
}
