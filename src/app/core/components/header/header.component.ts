import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../models/user.model';
import { NavListModel } from '../../models/navlist.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  localStrService = inject(LocalStorageService);

  username: string = "";
  userImg: string = "";


  ngOnInit() {
    this.username = (this.localStrService.getItem(environment.AUTH_TOKEN_KEY) as User)?.name || 'Guest';
    this.userImg = (this.localStrService.getItem(environment.AUTH_TOKEN_KEY) as User)?.photoUrl
  }


  navList: NavListModel[] = [{ title: "Home", link: "/browse" }, { title: "Tv Shows", link: "/movie-list/tv-shows" }, { title: "News & Popular", link: "/movie-list/new-popular" }];

  signOut() {

  }
}
