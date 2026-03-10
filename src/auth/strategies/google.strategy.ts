import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { name, emails, photos } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('No email found from Google');
    }

    const userProfile = {
      email: emails[0].value,
      firstName: name?.givenName || '',
      lastName: name?.familyName || '',
      picture: photos && photos.length > 0 ? photos[0].value : null,
    };

    return this.authService.validateOAuthUser(userProfile);
  }
}
