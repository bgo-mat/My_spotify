import {useEffect, useState} from 'react'
import {useNavigate,useLocation} from "react-router-dom";
import playButton from '../../assets/play.png'
import AudioPlayer from '../audioPlayer.jsx'
import flecheRetour from "../../assets/fleche.png";

function AlbumDetail() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState([]);
    const [artistInfo, setArtistInfo] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [id, setId] = useState(searchParams.get("id"));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/albums/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setTracks(res['tracks']);
            })
    }, []);

    useEffect(() => {
        if (data['album'] && data['album']['artist_id']) {
            fetch(`http://localhost:8000/artists/${data['album']['artist_id']}`)
                .then((res2) => res2.json())
                .then((res2) => {
                    setArtistInfo(res2);
                });
        }
    }, [data]);

    const transformDuration = (input) => {
        const mins = Math.floor(input / 60);
        const secs = input % 60;

        const formattedMins = mins.toString().padStart(2, '0');
        const formattedSecs = secs.toString().padStart(2, '0');

        return `${formattedMins}:${formattedSecs}`;
    }

    const [playingAudioId, setPlayingAudioId] = useState(null);

    const playAudio = (id) => {
        if (playingAudioId && playingAudioId !== id) {
            const previousAudio = document.getElementById(playingAudioId);
            if (previousAudio) {
                previousAudio.pause();
            }
        }
        setPlayingAudioId(id);
    };

    function showBio (){
        document.getElementsByClassName("blocWait")[0].style="display:flex";
    }
    function deleteBio (){
        document.getElementsByClassName("blocWait")[0].style="display:none";
    }

    function goBack (){
        navigate(`/album`);
    }

    return (
        <div className="container">
            <div className="blocWait" onClick={() => deleteBio()}>
                <div className="blocBio">
                    <p className="textBio">{data['album'] ? data['album']['description'] : ''}</p>
                </div>
            </div>
            <div className="blocRetour">
                <img className="flecheRetour" src={flecheRetour} onClick={goBack}/>
                <p className="txtRetour">Retour</p>
            </div>
            <div className="album-cover">

                <img src={data['album'] ? data['album']['cover'] : ''} alt="Couverture de l'album"/>
                <div className="album-info">
                    <div className="blocInfoArti">
                        <div className="title">{data['album'] ? data['album']['name'] : ''}</div>
                        <div className="artist">{artistInfo['name']}</div>
                        <div className="description bio" onClick={() => showBio()}>Description ></div>
                    </div>
                </div>
            </div>

            <ul className="track-list">

                {tracks.map((i, index) => <div className="blocTracks">
                    <p className="textCoverAlbum">{i['track_no']}</p>
                    <p className="textCoverAlbum">{i['name']}</p>
                    <p className="textCoverAlbum">{transformDuration(i['duration'])}</p>
                    <AudioPlayer url={i['mp3']} id={`audio-element-${index}`}
                                 onPlay={() => playAudio(`audio-element-${index}`)}/>
                </div>)}

            </ul>
        </div>
    )
}

export default AlbumDetail
