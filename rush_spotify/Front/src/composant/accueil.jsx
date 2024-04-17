import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useMyContext} from "../context";
function Accueil() {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(Math.floor(Math.random() * 60));
    const navigate = useNavigate();
    const { result,  updateData } = useMyContext();


    useEffect(() => {
        updateData("album")
        if(result){
            if(result['albums'].length>0){
                setData(result['albums']);
                return;
            }
        }

        window.addEventListener('scroll', handleScroll);
        fetch(`http://localhost:8000/albums?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((res) => {
                if(res.length>0){
                    setData(res);
                }else{
                    setPage(Math.floor(Math.random() * 82));
                }
            })
    }, [limit,result]);

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


    return (
        <div className="blocPrincipaleAccueil">
            {data.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                <img className="imgAlbum" alt="Image de couverture de l'album"  src={i['cover_small']}/>
                <p className="textCoverAlbum">{i['name']}</p>
            </div>)}
        </div>
    )
}

export default Accueil
