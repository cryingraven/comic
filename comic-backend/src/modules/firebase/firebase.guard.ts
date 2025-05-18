import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = await this.extractAuthHeader(authHeader);
    if (!token) return false;

    try {
      const user = decode(token, { complete: true }) as any;

      if (!user) return false;

      request['user'] = {
        ...user,
        uid: user.payload.user_id,
      };

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
