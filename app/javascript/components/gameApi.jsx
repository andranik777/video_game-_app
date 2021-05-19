import React, {useState, useEffect} from "react"

import  windows from"./logos/windows"
import  linux from"./logos/linux"
import  mobile from"./logos/mobile"
import ps4 from  "./logos/ps4"
import nintendo from "./logos/switch"
import xbox from "./logos/xbox"
import apple from "./logos/apple"


let index =0;


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("https://api.rawg.io/api/games?page_size=20&key=8b5da92a0206420a8ceaf5deb8618889")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      )
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <section>
        {items.map(item => (
        <div key={item.slug}>
          <p>{item.name}</p>
          <img src={item.background_image} width="300px"/>
            <div key={item.name + item.id} className="row ml-1">
            {item.parent_platforms.map(element=>(
              <div key={element.platform.slug}>
              {(element.platform.slug == "playstation"? <img src={ps4} alt="logos ps4"  className="mr-2"/>:"")}
              {(element.platform.slug == "pc"? <img src={windows} alt="logos windows" className="mr-2"/>:"")}
              {(element.platform.slug == "nintendo"? <img src={nintendo} alt="logos nintendo"  className="mr-2"/>:"")}
              {(element.platform.slug == "xbox"? <img src={xbox} alt="logos xbox"  className="mr-2"/>:"")}
              {(element.platform.slug == "linux"? <img src={linux} alt="logos linux"  className="mr-2"/>:"")}
              {(element.platform.slug == "ios"? <img src={mobile} alt="logos mobile"  className="mr-2"/>:"")}
              {(element.platform.slug == "mac"? <img src={apple} alt="logos mobile" width="24px"  className="mr-2"/>:"")}
              </div>     
              )
            )}
          </div>
        </div>
        ))}
      </section>
    );
  }
}


export default App;



//https://fr.reactjs.org/docs/faq-ajax.html