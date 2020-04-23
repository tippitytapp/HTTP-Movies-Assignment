import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars:""
}

function AddMovie(props){
    const {push} = useHistory();
    const [newMovie, setNewMovie] = useState(initialValue);
    const {id} = useParams();

    // useEffect(()=>{
    //     axios.put
    // },[])
    const inputHandler = event => {
        event.persist();
        let value = event.target.value;
        if(event.target.name === "stars"){
            value = event.target.value.split(',')
        }
        setNewMovie({
            ...newMovie,
            [event.target.name]:value
        })
    }

    const movieAddHandler = event => {
        // event.preventDefault();
        axios.post("/api/movies", newMovie)
        .then(res => {console.log(res.data)
            props.setMoviesList([...props.moviesList, res.data]);
        push("/");
    })
        .catch(err => {console.log(err)})
    }
return(
    <div className="addForm">
    <h2>Add Your Movie</h2>
    <form className="updateFormFields" onSubmit={movieAddHandler}>
        <label htmlFor="title">Title:  </label><br />
        <input type="text" id="title" name="title" value={newMovie.title} onChange={inputHandler}/><br />
        <label htmlFor="director">Director:   </label><br />
        <input type="text" id="director" name="director" value={newMovie.director} onChange={inputHandler}/><br />
        <label htmlFor="metascore">Metascore:   </label><br />
        <input type="text" id="metascore" name="metascore" value={newMovie.metascore} onChange={inputHandler}/><br />
        <label htmlFor="stars">Stars:   </label><br />
        <input type="text" id="stars" name="stars" value={newMovie.stars} onChange={inputHandler}/>
        <br/>
        <button>Add</button>
    </form>
    </div>
)
}

export default AddMovie