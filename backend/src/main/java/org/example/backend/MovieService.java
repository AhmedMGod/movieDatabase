package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovie(Integer id) {
        return movieRepository.findById(id).orElse(null);
    }

    public void addMovie(Movie movie) {
        movieRepository.save(movie);
    }

    public void updateMovie(Movie movie) {
        Movie updatedMovie = movieRepository.findById(movie.getId()).orElse(null);
        if (updatedMovie != null) {
            updatedMovie.setTitle(movie.getTitle());
            updatedMovie.setGenre(movie.getGenre());
            updatedMovie.setDescription(movie.getDescription());
            movieRepository.save(updatedMovie);
        }
    }

    public void deleteMovie(Integer id) {
        movieRepository.deleteById(id);
    }
}
