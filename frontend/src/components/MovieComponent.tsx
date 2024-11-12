import React, {useEffect, useState} from "react";
import {addMovie, getMovie, getMovieById, updateMovie} from "../services/MovieService";
import { useNavigate, useParams } from "react-router-dom";

const MovieComponent = () => {

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const {paramId} = useParams();
    const [errors, setErrors] = useState({
        id: "",
        title: "",
        genre: "",
        description: "",
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(paramId){
            getMovieById(paramId).then((repsonse) => {
                setTitle(repsonse.data.title);
                setGenre(repsonse.data.genre);
                setDescription(repsonse.data.description);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [paramId]);

    function saveOrUpdateMovie(e){
        e.preventDefault();

        if(validateForm()){
            const movie = {id, title, genre, description, image};
            console.log(movie.id);
            if(paramId){
                updateMovie(movie.id, movie).then((response) => {
                    console.log(response.data);
                    navigator("/movie");
                }).catch(error => {
                    console.error(error);
                })
            } else{
                addMovie(movie).then((response) => {
                    console.log(response.data);
                    navigator("/movies")
                }).catch(error => {
                    console.error(error);
                })
            }
        }

    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(id.trim()){
            errorsCopy.id = "";
        } else {
            errorsCopy.id = "Id muss angegeben werden!"
            valid = false;
        }

        if(title.trim()){
            errorsCopy.title = "";
        } else {
            errorsCopy.title = "Titel muss angegeben werden!"
            valid = false;
        }

        if(genre.trim()){
            errorsCopy.genre = "";
        } else {
            errorsCopy.genre = "Genre muss angegeben werden!"
            valid = false;
        }

        if(description.trim()){
            errorsCopy.description = "";
        } else {
            errorsCopy.description = "Beschreibung muss angegeben werden!"
            valid = false;
        }


        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(paramId) {
            return <h2 className="text-center">Änder Film um</h2>
        } else {
            return <h2 className="text-center">Füge einen Film hinzu</h2>
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="form-label">Platzierung</label>
                                <input
                                    type="number"
                                    placeholder="Gib die Platzierung ein"
                                    name="id"
                                    value={id}
                                    className={`form-control ${errors.id ? `is-invalid`: "" }`}
                                    onChange={(e) => setId(e.target.value)}
                                >
                                </input>
                                {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="form-label">Titel</label>
                                <input
                                    type="text"
                                    placeholder="Gib den Titel ein"
                                    name="titel"
                                    value={title}
                                    className={`form-control ${errors.title ? `is-invalid`: "" }`}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="form-label">Genre</label>
                                <input
                                    type="text"
                                    placeholder="Gib das Genre ein"
                                    name="genre"
                                    value={genre}
                                    className={`form-control ${errors.genre ? `is-invalid`: "" }`}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                </input>
                                {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="form-label">Beschreibung</label>
                                <input
                                    type="text"
                                    placeholder="Gib das Genre ein"
                                    name="description"
                                    value={description}
                                    className={`form-control ${errors.description ? `is-invalid`: "" }`}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="form-label">Bild</label>
                                <input
                                    type="text"
                                    placeholder="Füge einen Link zu einem Bild hinzu"
                                    name="image"
                                    value={image}
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </input>
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateMovie}>Eingabe</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MovieComponent