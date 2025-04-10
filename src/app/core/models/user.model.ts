export enum AuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  EMAIL = 'EMAIL'
}

export interface User {
  idToken: string;
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: AuthProvider;
}

