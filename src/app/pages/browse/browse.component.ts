import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export default class BrowseComponent implements OnInit {
  bannerData = {
    title: 'Stranger Things',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    videoKey: 'b9EkMc79ZSU'
  };

  ngOnInit(): void {
    // You could fetch this data from a service in a real application
    // For example:
    // this.movieService.getFeaturedMovie().subscribe(data => {
    //   this.bannerData = data;
    // });
  }
}
