import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import flecheRetour from "../../assets/fleche.png"
function GenreDetail() {
    const [idData, setIdData] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [id, setId] = useState(searchParams.get("id"));
    const [limit, setLimit] = useState(20);


    useEffect(() => {

        fetch(`http://localhost:8000/genres/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setIdData(res);
            })

    }, []);

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        if (idData && idData['albums']) {
            const fetchAlbums = async () => {

                const albums = await Promise.all(

                    idData['albums'].slice(0, limit).map(albumId =>

                        fetch(`http://localhost:8000/albums/${albumId}`)
                            .then(res2 => res2.json())
                            .then(res2 => res2['album'])
                    )
                );
                setData(albums);
            };

            fetchAlbums();
        }
    }, [limit, idData]);

    const handleScroll = () => {


        const totalPageHeight = document.documentElement.scrollHeight;
        const scrollPoint = window.scrollY + window.innerHeight+400;

        if (scrollPoint >= totalPageHeight) {
            setLimit(limit+10);
        }
    }


    function navigateTo (id){
        navigate(`/albumDetail?id=${id}`);
    }

    function goBack (){
        navigate(`/genre`);
    }

    return (
        <div className="blocGenreD">
            <div className="blocRetour">
                <img className="flecheRetour" src={flecheRetour} alt="Flèche de retour à la page précédente" onClick={goBack}/>
                <p className="txtRetour">Retour</p>
            </div>
            <div className="blocPrincipaleAccueil">

                {data.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                    <img className="imgAlbum" alt="Image de couverture de l'album" src={i['cover']}/>
                    <p className="textCoverAlbum">{i['name']}</p>
                </div>)}
            </div>
        </div>


    )

}

export default GenreDetail
