import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import jwt from 'jsonwebtoken';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = await this.extractAuthHeader(authHeader);
    if (!token) return false;

    try {
      const user = await this.firebaseService.validateToken(token);

      console.log(user);

      if (!user) return false;

      request['user'] = user;

      return true;
    } catch (err) {
      return false;
    }
  }

  async extractAuthHeader(authString: string) {
    const [type, token] = authString.split(' ');
    if (type !== 'Bearer') return false;
    return token;
  }
}
