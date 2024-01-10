// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../service/auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(username: string, password: string): Promise<any> {
//     const isOtp = /^[0-9]{6}$/.test(password);

//     if (isOtp) {
//       const user = await this.authService.validateUserByOtp(username, password);
//       if (!user) {
//         throw new UnauthorizedException('Invalid OTP');
//       }
//       return user;
//     } else {
//       const user = await this.authService.validateUserByPassword(
//         username,
//         password,
//       );
//       if (!user) {
//         throw new UnauthorizedException('Invalid credentials');
//       }
//       return user;
//     }
//   }
// }
