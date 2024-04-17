import React, { useState } from 'react';
import playButton from '../assets/play.png';
import pauseButton from '../assets/pause.png';

export default function AudioPlayer({ url, id, onPlay }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const audio = document.getElementById(id);
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
            onPlay(id);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="blocPlayer">
            <audio id={id} src={url} preload="auto" />
            <img src={isPlaying ? pauseButton : playButton} alt="Bouton play stop pour jouer une musique" className="playButton" onClick={togglePlay} />
        </div>
    );
}
