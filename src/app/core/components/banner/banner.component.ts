import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
  @Input() bannerTitle: string = '';
  @Input() bannerOverview: string = '';
  @Input() key: string = '';

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key'] && this.key) {
      const youtubeUrl = `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${this.key}`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
    }
  }
}
