import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import flecheRetour from "../../assets/fleche.png";

function ArtisteDetail() {
    const [data, setData] = useState([]);
    const [dataArtist, setDataArtist] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [id, setId] = useState(searchParams.get("id"));

    useEffect(() => {

        fetch(`http://localhost:8000/artists/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })

    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/albums/artist/${id}`)
            .then((res2) => res2.json())
            .then((res2) => {
                setDataArtist(res2);
            })
    }, []);

    function navigateTo (id){
        navigate(`/albumDetail?id=${id}`);
    }

    function showBio (){
        document.getElementsByClassName("blocWait")[0].style="display:flex";
    }
    function deleteBio (){
        document.getElementsByClassName("blocWait")[0].style="display:none";
    }

    function goBack (){
        navigate(`/artiste`);
    }


    return (
        <div className="container">
            <div className="blocRetour">
                <img className="flecheRetour" alt="Flèche de retour à la page précédente" src={flecheRetour} onClick={goBack}/>
                <p className="txtRetour">Retour</p>
            </div>
            <div className="blocWait" onClick={() => deleteBio()}>
                <div className="blocBio">
                    <p className="textBio">{data['bio']}</p>
                </div>
            </div>
            <div className="album-cover">
                <img className="imgArtiste" alt="Image de profil de l'artiste" src={data['photo']} alt="Couverture de l'album"/>
                <div className="album-info">
                    <div className="blocInfoArti">
                        <div className="artisteName">{data['name']}</div>
                        <div className="artisteDesc">{data['description']}</div>
                        <div className="description bio" onClick={() => showBio()}>Bio ></div>
                    </div>
                </div>
            </div>
            <div className="blocPrincipaleAccueil">
                {dataArtist.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                    <img className="imgAlbum" alt="Image de couverture de l'album"  src={i['cover']}/>
                    <p className="textCoverAlbum">{i['name']}</p>
                </div>)}
            </div>
        </div>
    )

}

export default ArtisteDetail
