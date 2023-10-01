import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"


const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)


  useEffect( () => {
    projectFirestore.collection("movies").get().then( (snapshot) => {


      if (snapshot.empty){
        setError("Žádné filmy k vypsání")
      } else {
        let result = []
        snapshot.docs.forEach( (oneMovie) => {
          result.push( {id: oneMovie.id, ...oneMovie.data()} )
        } )
        setData(result)
      }
    }).catch( (err) => {
      setError(err.message)
    })
  }, [])


  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete()
  }



  return <div className="all-movies">
    {error && <p>{error}</p>}
    {data.map( (oneMovie) => {
      const {id, title, minage, time} = oneMovie


      return <div key={id} className="one-movie">
        <p>{title}, {time} minut, {minage}+</p>
        <button type="button" onClick={ () => deleteMovie(id) }>Smazat</button>
      </div>


    } )}
  </div>
}


export default App
