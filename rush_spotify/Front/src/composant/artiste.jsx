import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useMyContext} from "../context";

function Artiste() {
    const [data, setData] = useState([]);
    const { result,  updateData } = useMyContext();
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        updateData("artiste");

        if(result){
            if(result['artists'].length>0){
                setData(result['artists']);
                return;
            }
        }

        window.addEventListener('scroll', handleScroll);

        fetch(`http://localhost:8000/artists/?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((res) => {
                if(res.length>0){
                    setData(res);
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
        navigate(`/artisteDetail?id=${id}`);
    }


    return (
        <div className="blocPrincipaleAccueil">
            {data.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                <img className="imgArtiste" alt="Image de profil de l'artiste"  src={i['photo']}/>
                <p className="textCoverAlbum">{i['name']}</p>
            </div>)}
        </div>
    )

}

export default Artiste
