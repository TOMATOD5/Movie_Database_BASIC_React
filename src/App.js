import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"


const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
    // useState pro formulář
    const [movieTitle, setMovieTitle] = useState("")
    const [movieAge, setMovieAge] = useState(null)
    const [movieTime, setMovieTime] = useState(null)


  useEffect( () => {
    const unsubscribe = 
    projectFirestore.collection("movies").onSnapshot( (snapshot) => {


      if (snapshot.empty){
        setError("Žádné filmy k vypsání")
        setData([])
      } else {
        let result = []
        snapshot.docs.forEach( (oneMovie) => {
          result.push( {id: oneMovie.id, ...oneMovie.data()} )
        } )
        setData(result)
        setError("")
      }
    }, err => setError(err.message) )
 
    return () => unsubscribe()


  }, [])



  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete()
  }

  const submitForm = (e) => {
    e.preventDefault()

    const newMovie = {title: movieTitle, minage: movieAge, time: movieTime}

    try {
        projectFirestore.collection("movies").add(newMovie)
        setMovieTitle("")
        setMovieAge("")
        setMovieTime("")
      } catch (err) {
        setError("Film nebyl přidán " + err.message)
      }
  }

  return <div className="all-movies">

<form onSubmit={submitForm} className="form">
      <input
        type="text"
        className="input"
        onChange={ (e) => setMovieTitle( e.target.value ) }
        placeholder="Název filmu"
        value={movieTitle}
      /><br />


      <input
        type="number"
        className="input"
        onChange={ (e) => setMovieAge(e.target.value) }  
        placeholder="Minimální věk"
        min="0"
        value={movieAge}
      /><br />


      <input
        type="number"
        className="input"
        onChange={(e) => setMovieTime(e.target.value)}
        placeholder="Doba trvání"
        min="0"
        value={movieTime}
      /><br />


      <input type="submit" value="Přidat" />
    </form>


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
