import ListOfMovies from "./components/ListOfMovies.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import FooterComponent from "./components/Footer.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MovieComponent from "./components/MovieComponent.tsx";

export default function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<ListOfMovies />}></Route>
                        <Route path="/movies" element={<ListOfMovies />}></Route>
                        <Route path="/add-movie" element={<MovieComponent />}></Route>
                        <Route path="/update-movie/:id" element={<MovieComponent />}></Route>
                    </Routes>
                <FooterComponent />
            </BrowserRouter>
        </>
    )
}
