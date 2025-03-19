import { Injectable } from '@nestjs/common';
import { credential } from 'firebase-admin';
import { initializeApp, Credential, getApp, App } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService {
  private defaultApp: App;
  private auth: Auth;
  private messaging: Messaging;
  constructor() {
    const adminSDKEnv = process.env.FIREBASE_ADMIN_JSON || '{}';
    const adminSDK = JSON.parse(adminSDKEnv);

    this.defaultApp = initializeApp({
      credential: credential.cert(adminSDK),
    });

    this.auth = getAuth(this.defaultApp);
    this.messaging = getMessaging(this.defaultApp);
  }

  getAuth() {
    return this.auth;
  }

  getMessaging() {
    return this.messaging;
  }

  validateToken(token: string) {
    return this.auth.verifyIdToken(token);
  }

  getUserByUid(uid: string) {
    return this.auth.getUser(uid);
  }
}
