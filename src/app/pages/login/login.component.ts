import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GoogleLoginProvider, SocialAuthService, SocialUser, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  user: SocialUser | null = null;


  localstrService = inject(LocalStorageService);
  router = inject(Router);
  authService = inject(SocialAuthService);


  ngOnInit() {

    this.authService.initState.subscribe(() => {
      const googleLoginOptions = {
        prompt: 'select_account',
        ux_mode: 'popup',
        disableOAth2: false,
        scope: 'email profile'
      }


      this.authService.authState.subscribe((user) => {
        this.user = user;
        if (user) {
          this.localstrService.setItem(environment.AUTH_TOKEN_KEY, { ...user });
          this.router.navigate(['browse'])
        }
      });
    })
  }

  async signInWithGoogle() {
    const response = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(response);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
