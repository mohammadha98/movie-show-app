import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.TMDB.READ_ACCESS_TOKEN}`
  });

  constructor(private http: HttpClient) { }

  // Get trending movies
  getTrendingMovies(timeWindow: 'day' | 'week' = 'day'): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.apiUrl}/trending/movie/${timeWindow}`,
      { headers: this.headers }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get trending TV shows
  getTrendingTVShows(timeWindow: 'day' | 'week' = 'day'): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.apiUrl}/trending/tv/${timeWindow}`,
      { headers: this.headers }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get movie details
  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${movieId}`,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Get TV show details
  getTVShowDetails(tvId: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.apiUrl}/tv/${tvId}`,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Get popular movies
  getPopularMovies(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/movie/popular`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get popular TV shows
  getPopularTVShows(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/tv/popular`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get top rated movies
  getTopRatedMovies(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/movie/top_rated`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get top rated TV shows
  getTopRatedTVShows(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/tv/top_rated`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get upcoming movies
  getUpcomingMovies(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/movie/upcoming`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get now playing movies
  getNowPlayingMovies(page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/movie/now_playing`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Search for movies
  searchMovies(query: string, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/search/movie`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Search for TV shows
  searchTVShows(query: string, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/search/tv`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get movie videos (trailers, teasers, etc.)
  getMovieVideos(movieId: number): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/movie/${movieId}/videos`,
      { headers: this.headers }
    ).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  getBannerVideo(id:number){
    return this.http.get<any>(
        `${this.apiUrl}/movie/${id}/videos`,
        { headers: this.headers }
      ).pipe(
        map(response => response.results),
        catchError(this.handleError)
      );
  }

  // Get TV show videos
  getTVShowVideos(tvId: number): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/tv/${tvId}/videos`,
      { headers: this.headers }
    ).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  // Get movie recommendations
  getMovieRecommendations(movieId: number, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/movie/${movieId}/recommendations`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get TV show recommendations
  getTVShowRecommendations(tvId: number, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams().set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/tv/${tvId}/recommendations`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get movies by genre
  getMoviesByGenre(genreId: number, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('with_genres', genreId.toString())
      .set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/discover/movie`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get TV shows by genre
  getTVShowsByGenre(genreId: number, page: number = 1): Observable<Movie[]> {
    const params = new HttpParams()
      .set('with_genres', genreId.toString())
      .set('page', page.toString());
    
    return this.http.get<any>(
      `${this.apiUrl}/discover/tv`,
      { headers: this.headers, params }
    ).pipe(
      map(response => response.results as Movie[]),
      catchError(this.handleError)
    );
  }

  // Get movie genres list
  getMovieGenres(): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/genre/movie/list`,
      { headers: this.headers }
    ).pipe(
      map(response => response.genres),
      catchError(this.handleError)
    );
  }

  // Get TV show genres list
  getTVGenres(): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/genre/tv/list`,
      { headers: this.headers }
    ).pipe(
      map(response => response.genres),
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}