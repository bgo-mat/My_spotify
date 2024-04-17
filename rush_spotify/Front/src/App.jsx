import './App.css'
import Accueil from './composant/accueil.jsx'
import Album from './composant/album.jsx'
import AlbumDetail from './composant/detail/albumDetail.jsx'
import Genre from './composant/genre.jsx'
import GenreDetail from './composant/detail/genreDetail.jsx'
import Artiste from './composant/artiste.jsx'
import ArtisteDetail from './composant/detail/artisteDetail.jsx'
import {BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate, useLocation} from "react-router-dom";
import {useMyContext} from "./context.jsx";
import {useEffect} from "react";


function Header() {

    const { search, updateResult} = useMyContext("");
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const runSearch = () => {
        console.log(search)

        const value = document.getElementsByClassName("search-bar")['0'].value;

        if(search==="artiste"){

            fetch(`http://localhost:8000/search?query=${value}&type=artist`)
                .then((res) => res.json())
                .then((res) => {
                   updateResult(res);
                    if(location['pathname']==="/albumDetail"){
                        navigate(`/artiste`)
                    }
                })

        }else if(search==="album"){

            fetch(`http://localhost:8000/search?query=${value}&type=album`)
                .then((res) => res.json())
                .then((res) => {
                    updateResult(res);
                    if(location['pathname']==="/albumDetail"){
                        navigate(`/album`)
                    }
                })

        }else if(search==="genre"){

            fetch(`http://localhost:8000/search?query=${value}&type=genre`)
                .then((res) => res.json())
                .then((res) => {
                   navigate(`/album?id=${res['genres'][0]['id']}`);
                })
        }
    }

    useEffect(() => {
        if(location['pathname']==="/album"|| location['pathname']==="/albumDetail"){

            document.getElementsByClassName("link")[0].style="text-decoration:none";
            document.getElementsByClassName("link")[1].style="text-decoration:underline";
            document.getElementsByClassName("link")[2].style="text-decoration:none";
            document.getElementsByClassName("link")[3].style="text-decoration:none";

        }else if(location['pathname']==="/genre"|| location['pathname']==="/genreDetail"){

            document.getElementsByClassName("link")[0].style="text-decoration:none";
            document.getElementsByClassName("link")[1].style="text-decoration:none";
            document.getElementsByClassName("link")[2].style="text-decoration:none";
            document.getElementsByClassName("link")[3].style="text-decoration:underline";

        }else if(location['pathname']==="/artiste"|| location['pathname']==="/artisteDetail"){

            document.getElementsByClassName("link")[0].style="text-decoration:none";
            document.getElementsByClassName("link")[1].style="text-decoration:none";
            document.getElementsByClassName("link")[2].style="text-decoration:underline";
            document.getElementsByClassName("link")[3].style="text-decoration:none";

        }else if(location['pathname']==="/accueil"){

            document.getElementsByClassName("link")[0].style="text-decoration:underline";
            document.getElementsByClassName("link")[1].style="text-decoration:none";
            document.getElementsByClassName("link")[2].style="text-decoration:none";
            document.getElementsByClassName("link")[3].style="text-decoration:none";

        }
    }, [location]);
    const reset = () => {
        updateResult("");
        const searchBar = document.getElementsByClassName("search-bar")[0];
            searchBar.value = "";
    }

    return (
        <>
            <header style={{display: 'flex', justifyContent:"space-between", gap: '50px', fontSize: '2vw' }}>
                <div className="blocLink">
                    <Link className="link" onClick={reset} to={`/accueil`}>Accueil</Link>
                    <Link  className="link" onClick={reset} to={`/album`}>Album</Link>
                    <Link className="link" onClick={reset} to={`/artiste`}>Artiste</Link>
                    <Link className="link" onClick={reset} to={`/genre`}>Genre</Link>
                </div>
                <div className="searchBar">
                    <input type="text" className="search-bar" placeholder={`Search by ${search}`}/>
                    <button className="searchBtn" onClick={runSearch}>🔍</button>
                </div>

            </header>

            <div style={{fontSize: '2vw', display: 'flex', justifyContent: 'center'}}>
                <Outlet/>
            </div>
        </>
    )
}

function App() {

  return (
      <Router>
          <Routes>
              <Route path={""} element={<Header/>}>
                  <Route path={"/accueil"} element={ <Accueil/> } />
                  <Route path={"/album"} element={ <Album/> } />
                  <Route path={"/albumDetail"} element={ <AlbumDetail/> } />
                  <Route path={"/genre"} element={ <Genre/> } />
                  <Route path={"/genreDetail"} element={ <GenreDetail/> } />
                  <Route path={"/artiste"} element={ <Artiste/> }/>
                  <Route path={"/artisteDetail"} element={ <ArtisteDetail/> } />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
