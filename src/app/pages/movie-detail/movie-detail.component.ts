import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { Movie, Genre } from '../../core/models/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, BannerComponent, MovieCarouselComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export default class MovieDetailComponent implements OnInit {
  movie: Movie;
  similarMovies: Movie[] = [];
  castMembers: any[] = [];
  trailerKey: string = '';

  constructor(private route: ActivatedRoute) {
    // Mock data for UI implementation (no actual service calls)
    this.movie = this.getMockMovie();
    this.similarMovies = this.getMockSimilarMovies();
    this.castMembers = this.getMockCastMembers();
    this.trailerKey = 'dQw4w9WgXcQ'; // Example YouTube video ID
  }

  ngOnInit(): void {
    // In a real implementation, we would get the movie ID from the route
    // and fetch the movie data from a service
  }

  private getMockMovie(): Movie {
    return {
      adult: false,
      backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
      belongs_to_collection: null,
      budget: 200000000,
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 878, name: 'Science Fiction' }
      ],
      homepage: 'https://www.example.com',
      id: 123456,
      imdb_id: 'tt1234567',
      origin_country: ['US'],
      original_language: 'en',
      original_title: 'Dune: Part Two',
      overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
      popularity: 1234.56,
      poster_path: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
      production_companies: [],
      production_countries: [],
      release_date: '2024-03-01',
      revenue: 500000000,
      runtime: 166,
      spoken_languages: [],
      status: 'Released',
      tagline: 'Long live the fighters.',
      title: 'Dune: Part Two',
      video: false,
      vote_average: 8.5,
      vote_count: 1234
    };
  }

  private getMockSimilarMovies(): Movie[] {
    return Array(10).fill(null).map((_, index) => ({
      ...this.getMockMovie(),
      id: 1000 + index,
      title: `Similar Movie ${index + 1}`,
      overview: `This is a similar movie to the main feature. It shares themes, actors, or genre elements.`,
      poster_path: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
      vote_average: 7.0 + (index % 3)
    }));
  }

  private getMockCastMembers(): any[] {
    return [
      { name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/5vUux2vNUTqwCzb7tVcH18XnsF.jpg' },
      { name: 'Zendaya', character: 'Chani', profile_path: '/r3A7ev7QkjOGocVn3kQrJ0eOouk.jpg' },
      { name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/lJloTOheuQSirSLXNA3ZHwyJ8y3.jpg' },
      { name: 'Javier Bardem', character: 'Stilgar', profile_path: '/oGYDRQRCdCJOAt73k5mDqYZgSLx.jpg' },
      { name: 'Josh Brolin', character: 'Gurney Halleck', profile_path: '/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg' },
      { name: 'Austin Butler', character: 'Feyd-Rautha', profile_path: '/338qJL6Rz1ogzjTrKN55t2KV2Io.jpg' }
    ];
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
