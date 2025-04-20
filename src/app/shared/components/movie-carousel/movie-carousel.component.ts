import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { Movie } from '../../../core/models/movie.model';
import { Router } from '@angular/router';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss'
})
export class MovieCarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() title: string = 'Movie Carousel';
  @Input() movies: Movie[] = []; // Add input property for movies data
  
  router=inject(Router);

  private swiper: Swiper | null = null;

  ngAfterViewInit() {
    // Small timeout to ensure DOM is fully rendered
    setTimeout(() => {
      this.initSwiper();
    }, 0);
  }

  initSwiper() {
    if (!this.swiperContainer) {
      console.error('Swiper container not found');
      return null;
    }

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 15,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      }
    });

    return this.swiper;
  }


  navigateToMovieDeatil(id: number) {
    if (id) {
      this.router.navigate(['/movie', id]);
    }
  }
}
