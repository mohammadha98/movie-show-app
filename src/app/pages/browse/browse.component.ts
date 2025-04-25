import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { forkJoin, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ BannerComponent, MovieCarouselComponent,AsyncPipe],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export default class BrowseComponent implements OnInit {
  bannerData = {
    title: 'Stranger Things',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    videoKey: 'b9EkMc79ZSU'
  };
  bannerDetail = new Observable<Movie>();
  bannerVideo = new Observable<any>();

  movieService = inject(MovieService);

  trendingMovies: Movie[] = [];
  tvShows: Movie[] = [];
  ratedMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  sources = [
    this.movieService.getTrendingMovies(),
    this.movieService.getTrendingTVShows(),
    this.movieService.getPopularMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getTopRatedMovies(),
    this.movieService.getUpcomingMovies()
  ];


  ngOnInit(): void {
    forkJoin(this.sources).pipe(
      map(([trendingMovies, tvShows, popularMovies, nowPlayingMovies, topRatedMovies2, upcomingMovies]) => {

        this.bannerDetail = this.movieService.getMovieDetails(trendingMovies[0].id);
        console.log(trendingMovies[0].id);
        
        this.bannerVideo = this.movieService.getBannerVideo(trendingMovies[0].id)
       this.bannerVideo.subscribe({
        next: (result: any) => {
          console.log(result);

        }})
        return { trendingMovies, tvShows, popularMovies, nowPlayingMovies, topRatedMovies2, upcomingMovies }
      })
    ).subscribe({
      next: (result: any) => {
        this.trendingMovies = result.trendingMovies;
        this.tvShows = result.tvShows;
        this.topRatedMovies = result.topRatedMovies2;
        this.popularMovies = result.popularMovies;
        this.nowPlayingMovies = result.nowPlayingMovies;
        this.upcomingMovies = result.upcomingMovies;
      }
    });
  }
}
