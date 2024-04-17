import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {useMyContext} from "../context";


function Album() {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(20)
    const navigate = useNavigate();
    const { result,  updateData } = useMyContext();
    const [page, setPage] = useState(1)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [id, setId] = useState(searchParams.get("id"))
    const [idData, setIdData] = useState([])


    useEffect(() => {
        if(id){
            fetch(`http://localhost:8000/genres/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setIdData(res)
                })
        }
    }, []);

    useEffect(() => {
        if(id){
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
        }

    }, [limit, idData]);



    useEffect(() => {
        if(!id){
            updateData("album")
            if(result){
                if(result['albums'].length>0){
                    setData(result['albums'])
                    return
                }
            }
            window.addEventListener('scroll', handleScroll);
            fetch(`http://localhost:8000/albums?page=${page}&limit=${limit}`)
                .then((res) => res.json())
                .then((res) => {
                    setData(res)
                })
        }
    }, [limit,result]);




    const handleScroll = () => {

        //Taille max:
        const totalPageHeight = document.documentElement.scrollHeight;
        //Taille actuelle (emplacement du user) :
        const scrollPoint = window.scrollY + window.innerHeight+400;

        if (scrollPoint >= totalPageHeight) {
            setLimit(limit+10);
        }
    }

    function navigateTo (id){
        navigate(`/albumDetail?id=${id}`);
    }


    return (
        <div className="blocPrincipaleAccueil">
            {data.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                <img className="imgAlbum" alt="Image de couverture de l'album"  src={i['cover']}/>
                <p className="textCoverAlbum">{i['name']}</p>
            </div>)}
        </div>
    )
}

export default Album
