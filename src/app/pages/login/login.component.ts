import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GoogleLoginProvider, SocialAuthService, SocialUser,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';




@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  user: SocialUser | null = null;

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
