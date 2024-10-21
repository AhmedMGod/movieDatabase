package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("movie")
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Integer id) {
        return movieService.getMovie(id);
    }

    @PostMapping("/add")
    public void addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
    }

    @PutMapping("/update/{id}")
    public void updateMovie(@RequestBody Movie movie) {
        Movie updatedMovie = movieService.getMovie(movie.getId());
        if (updatedMovie != null) {
            updatedMovie.setTitle(movie.getTitle());
            updatedMovie.setGenre(movie.getGenre());
            updatedMovie.setDescription(movie.getDescription());
            movieService.updateMovie(updatedMovie);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMovie(@PathVariable Integer id) {
        movieService.deleteMovie(id);
    }

}
