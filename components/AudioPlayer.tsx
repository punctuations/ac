import React, { FC, useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

interface AudioPlayerProps {
	file: string;
	playButton: string;
	pauseButton: string;
	state?: boolean;
}

const AudioPlayer: FC<AudioPlayerProps> = ({
	file,
	playButton,
	pauseButton,
	state,
}) => {
	const [mounted, setMounted] = useState(false);

	const { togglePlayPause, isPlaying, isReady, isLoading } = useAudioPlayer(
		file,
		{
			autoplay: true,
			loop: true,
			format: "ogg",
		},
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	if (!isReady && !isLoading) return <div>No audio to play</div>;

	if (isLoading) {
		return (
			<img
				src={pauseButton}
				className="w-12 h-12 select-none"
				style={{ cursor: "pointer" }}
			/>
		);
	}

	return state ? (
		<img
			src={!isPlaying ? pauseButton : playButton}
			onClick={togglePlayPause}
			className="w-12 h-12 select-none"
			style={{ cursor: "pointer" }}
		/>
	) : (
		<img
			src={pauseButton}
			className="w-12 h-12 select-none"
			style={{ cursor: "pointer" }}
		/>
	);
};

export default AudioPlayer;
