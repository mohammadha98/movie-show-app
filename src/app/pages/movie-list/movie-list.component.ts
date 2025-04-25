import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export default class MovieListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  
  genreTitle: string = '';
  movies: Movie[] = [];
  currentPage: number = 1;
  loading: boolean = true;
  error: string | null = null;
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.loading = true;
        const genre = params.get('genre');
        
        if (!genre) {
          throw new Error('Genre parameter is required');
        }
        
        // Set the title based on the genre parameter
        this.setGenreTitle(genre);
        
        // Return the appropriate observable based on the genre
        return this.getMoviesByGenre(genre);
      }),
      catchError(error => {
        this.error = error.message || 'An error occurred while fetching movies';
        this.loading = false;
        return of([]);
      })
    ).subscribe(movies => {
      this.movies = movies;
      this.loading = false;
    });
  }
  
  private setGenreTitle(genre: string): void {
    // Map route parameters to user-friendly titles
    switch(genre) {
      case 'tv-shows':
        this.genreTitle = 'TV Shows';
        break;
      case 'new-popular':
        this.genreTitle = 'New & Popular';
        break;
      case 'action':
        this.genreTitle = 'Action Movies';
        break;
      case 'comedy':
        this.genreTitle = 'Comedy Movies';
        break;
      case 'horror':
        this.genreTitle = 'Horror Movies';
        break;
      case 'romance':
        this.genreTitle = 'Romance Movies';
        break;
      default:
        this.genreTitle = genre.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
  }
  
  private getMoviesByGenre(genre: string) {
    switch(genre) {
      case 'tv-shows':
        return this.movieService.getPopularTVShows(this.currentPage);
      case 'new-popular':
        return this.movieService.getUpcomingMovies(this.currentPage);
      case 'action':
        return this.movieService.getMoviesByGenre(28, this.currentPage); // 28 is the ID for Action genre
      case 'comedy':
        return this.movieService.getMoviesByGenre(35, this.currentPage); // 35 is the ID for Comedy genre
      case 'horror':
        return this.movieService.getMoviesByGenre(27, this.currentPage); // 27 is the ID for Horror genre
      case 'romance':
        return this.movieService.getMoviesByGenre(10749, this.currentPage); // 10749 is the ID for Romance genre
      default:
        return this.movieService.getPopularMovies(this.currentPage);
    }
  }
  
  loadMore() {
    this.currentPage++;
    const genre = this.route.snapshot.paramMap.get('genre') || '';
    
    this.getMoviesByGenre(genre).subscribe(newMovies => {
      this.movies = [...this.movies, ...newMovies];
    });
  }
}
