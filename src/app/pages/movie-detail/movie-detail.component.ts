import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { Movie, Genre } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { CastCarouselComponent } from '../../shared/components/cast-carousel/cast-carousel.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, BannerComponent, MovieCarouselComponent,CastCarouselComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export default class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  similarMovies: Movie[] = [];
  castMembers: any[] = [];
  trailerKey: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const movieId = Number(params.get('id'));
        if (!movieId) {
          throw new Error('Movie ID is required');
        }
        
        // Fetch movie details, videos, recommendations, and credits in parallel
        return forkJoin({
          movie: this.movieService.getMovieDetails(movieId),
          videos: this.movieService.getMovieVideos(movieId),
          similarMovies: this.movieService.getMovieRecommendations(movieId),
          credits: this.movieService.getMovieCredits(movieId)
        });
      }),
      catchError(error => {
        this.error = error.message || 'An error occurred while fetching movie data';
        this.loading = false;
        return of({ movie: null, videos: [], similarMovies: [], credits: { cast: [] } });
      })
    ).subscribe(({ movie, videos, similarMovies, credits }) => {
      this.movie = movie;
      this.similarMovies = similarMovies;
      
      // Get cast members (limit to top 6)
      this.castMembers = credits.cast.slice(0, 6);
      
      // Find trailer in videos
      const trailer = videos.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      if (trailer) {
        this.trailerKey = trailer.key;
      }
      
      this.loading = false;
    });
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  getYear(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }
}
