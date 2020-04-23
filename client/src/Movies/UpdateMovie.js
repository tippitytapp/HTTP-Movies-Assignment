import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars:""
}

const UpdateMovie = props=> {
    const {push} = useHistory();
    const [movie, setMovie] = useState(initialValue);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {console.log(res.data);
        setMovie(res.data)})
        .catch(err => {console.log(err)})
    },[id])

    const inputHandler = event => {
        event.persist();
        let value = event.target.value;
        if(event.target.name === "stars"){
            value = event.target.value.split(',')
        }
        setMovie({
            ...movie,
            [event.target.name]: value
        })
    }
    // const starInputHandler = event => {
    //     setMovie({
    //         ...movie,
    //         stars:{
    //             ...movie.stars,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }
    const submitHandler = event => {
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res);
            props.setMoviesList([...props.moviesList, res.data]);
            push("/");
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return(
        <div className="updateForm">
            <h2>Update Your Movie</h2>
            <form className="updateFormFields" onSubmit={submitHandler}>
                <label htmlFor="title">Title:  </label><br />
                <input type="text" id="title" name="title" value={movie.title} onChange={inputHandler}/><br />
                <label htmlFor="director">Director:   </label><br />
                <input type="text" id="director" name="director" value={movie.director} onChange={inputHandler}/><br />
                <label htmlFor="metascore">Metascore:   </label><br />
                <input type="text" id="metascore" name="metascore" value={movie.metascore} onChange={inputHandler}/><br />
                <label htmlFor="stars">Stars:   </label><br />
                <input type="text" id="stars" name="stars" value={movie.stars} onChange={inputHandler}/>
                <br/>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;