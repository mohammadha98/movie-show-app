import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-cast-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cast-carousel.component.html',
  styleUrl: './cast-carousel.component.scss'
})
export class CastCarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() title: string = 'Cast';
  @Input() castMembers: any[] = []; // Input property for cast data
  
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
          slidesPerView: 2,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 15
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 20
        }
      }
    });

    return this.swiper;
  }
}
