package org.example.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovieDatabaseServiceTest {
    @Mock
    MovieRepository movieRepository;
    @InjectMocks
    MovieService movieService;

    @Test
    public void should_Return_Movie_Database_When_Call_With_Id() {
        Integer expectedId = 1;
        Movie generated = new Movie(1, "Killer", "Crime", "Detective is looking for many crimes in a city.");
        movieRepository.save(generated);

        when(movieRepository.findById(expectedId)).thenReturn(Optional.of(generated));

        Movie actual = movieService.getMovie(expectedId);
        assertEquals(generated, actual);
    }

    @Test
    public void should_Return_Movie_By_Id_When_Call_With_Id() {
        Integer expectedId = 5;
        Movie generated = new Movie(expectedId, "Best friends", "Comedy", "Two best friends.");
        movieRepository.save(generated);

        when(movieRepository.findById(expectedId)).thenReturn(Optional.of(generated));

        Movie actual = movieService.getMovie(expectedId);
        assertEquals(generated, actual);
    }

    @Test
    public void add_Movie_To_Database() {
        Movie addMovie = new Movie(2, "Animals", "Documentation", "Life of some animals.");
        movieRepository.save(addMovie);

        when(movieRepository.save(addMovie)).thenReturn(addMovie);

        Movie actual = movieService.getMovie(2);
        assertEquals(addMovie, actual);
    }

    @Test
    public void should_Update_Movie_Database_When_Call_With_Id() {
        Integer expectedId = 1;
        Movie newMovie = new Movie(expectedId, "Animals", "Documentation", "Life of some animals.");
        movieRepository.save(newMovie);

        when(movieRepository.findById(expectedId)).thenReturn(Optional.of(newMovie));
        when(movieRepository.save(any(Movie.class))).thenReturn(newMovie);

        Movie actual = movieService.getMovie(expectedId);
        assertEquals(newMovie, actual);
    }

    @Test
    public void should_Remove_Movie_From_Database() {
        Integer expectedId = 2;
        Movie deleteMovie = new Movie(1, "Animals", "Documentation", "Life of some animals.");
        movieRepository.save(deleteMovie);

        movieRepository.delete(deleteMovie);

        verify(movieRepository, times(1)).delete(deleteMovie);
    }
}
