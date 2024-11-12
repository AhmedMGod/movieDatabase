import React, {useEffect, useState} from "react";
import {deleteMovie, listMovies, updateMovie, getMovieById, addMovie} from "../services/MovieService.js"
import { useNavigate } from "react-router-dom";



function ListOfMovies() {

    const [movie, setMovie] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllMovies();
    }, []);

    function getAllMovies() {
        listMovies().then((response) => {
            setMovie(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewMovie() {
        navigator(("/add-movie"))
    }

    function updateMovie(id) {
        navigator((`/update-movie/${id}`))
    }

    function removeMovie(id){
        console.log(id)

        deleteMovie(id).then((response) => {
            getAllMovies();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Movies</h2>
            <button className="btn btn-primary mb-2" onClick={addNewMovie}>Füge Film hinzu</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Platzierung</th>
                    <th>Titel</th>
                    <th>Genre</th>
                    <th>Beschreibung</th>
                    <th>Bild</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {
                    movie.map(movie =>
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.description}</td>
                            <td>{movie.image}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateMovie(movie.id)}>Ändern</button>
                                <button className="btn btn-danger" onClick={() => removeMovie(movie.id)}>Löschen</button>
                            </td>
                        </tr>)
                }
                <tr>

                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListOfMovies