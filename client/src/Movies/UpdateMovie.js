import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars:[]
}

const UpdateMovie = props=> {
    const {push} = useHistory();
    const [movie, setMovie] = useState(initialValue);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {console.log(res.data);
        setMovie(res.data)})
    },[id])
    return(
        <div className="updateForm">
            <h2>Update Your Movie</h2>
            <form className="updateFormFields">
                <label htmlFor="title">Title:  </label><br />
                <input type="text" id="title" name="title" value={movie.title} /><br />
                <label htmlFor="director">Director:   </label><br />
                <input type="text" id="director" name="director" /><br />
                <label htmlFor="metascore">Metascore:   </label><br />
                <input type="text" id="metascore" name="metascore" /><br />
                <label htmlFor="stars">Stars:   </label><br />
                {movie.stars.map((item, i)=>{
                    return (
                        <input type="text" id="stars" key={i} name={`name${i}`}/>
                    )
                })}
            </form>
        </div>
    )
}

export default UpdateMovie;