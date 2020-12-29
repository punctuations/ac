import React from "react";
import { useAudioPlayer } from "react-use-audio-player";

const AudioPlayer = ({ file, playButton, pauseButton, state }) => {
	const { play, pause, ready, loading, playing } = useAudioPlayer({
		src: file,
		format: "mp3",
		autoplay: true,
		loop: true,
	});

	const togglePlay = () => {
		if (playing) {
			pause();
		} else {
			play();
		}
	};

	if (!ready && !loading) return <div>No audio to play</div>;
	if (loading)
		return (
			<img
				src={pauseButton}
				className="w-12 h-12 select-none"
				style={{ cursor: "pointer" }}
			/>
		);

	return (
		<>
			{state ? (
				<img
					src={!playing ? pauseButton : playButton}
					onClick={togglePlay}
					className="w-12 h-12 select-none"
					style={{ cursor: "pointer" }}
				/>
			) : (
				<img
					src={pauseButton}
					className="w-12 h-12 select-none"
					style={{ cursor: "pointer" }}
				/>
			)}
		</>
	);
};

export default AudioPlayer;
