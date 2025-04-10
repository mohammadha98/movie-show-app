import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  localStrService = inject(LocalStorageService);

  username = (this.localStrService.getItem(environment.AUTH_TOKEN_KEY) as User)?.name || 'Guest';
  userImg = (this.localStrService.getItem(environment.AUTH_TOKEN_KEY) as User)?.photoUrl || 'assets/images/default-avatar.png';

  navList = ["Home", "Tv Shows", "News & Popular", "My List", "Browse By Language"];

  signOut() {

  }
}
