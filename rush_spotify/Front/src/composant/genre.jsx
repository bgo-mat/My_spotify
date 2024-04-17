import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useMyContext} from "../context";
import classiqueImg from "../assets/classique.jpg";
import Electronica from "../assets/electronique.jpg";
import newAge from "../assets/newAge.jpg";
import world from "../assets/world.jpg";
import ambiant from "../assets/ambiant.jpg";
import jazz from "../assets/jazz.jpg";
import hiphop from "../assets/hiphop.jpg";
import altRock from "../assets/altRock.jpg";
import electroRock from "../assets/electroRock.jpg";
import hardRock from "../assets/hardRock.jpg";



function Genre() {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(20)
    const navigate = useNavigate();
    const { result,  updateData } = useMyContext();
    const [page, setPage] = useState(1);




    useEffect(() => {
        updateData("genre");

        if(result){
            if(result['genres'].length>0){
                setData(result['genres']);
                return
            }
        }
        fetch(`http://localhost:8000/genres?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
    }, [limit,result]);

    function navigateTo (id){
        navigate(`/genreDetail?id=${id}`);
    }

    function setImg (input){

        if(input==="Classical"){
            return classiqueImg;
        }else if(input==="New Age"){
            return newAge;
        }else if(input==="Electronica"){
            return Electronica;
        }else if(input==="World"){
            return world;
        }else if(input==="Ambient"){
            return ambiant;
        }else if(input==="Jazz"){
            return jazz;
        }else if(input==="Hip Hop"){
            return hiphop;
        }else if(input==="Alt Rock"){
            return altRock;
        }else if(input==="Electro Rock"){
            return electroRock;
        }else if(input==="Hard Rock"){
            return hardRock;
        }

    }


    return (
        <div className="blocPrincipaleAccueil">
            {data.map((i, index) => <div className="blocAlbum" onClick={() => navigateTo(i['id'])}>
                <img className="imgGenre" alt="Image de couverture de l'album"  src={setImg(i['name'])}/>
                <p className="textCoverAlbum">{i['name']}</p>
            </div>)}
        </div>
    )
}

export default Genre
