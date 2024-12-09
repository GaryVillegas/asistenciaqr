import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authSer: AngularFireAuth, private route: Router) {}
  private allwoedDomains = ['@duocuc.cl', '@profesor.duoc.cl'];

  private isAllowedEmail(email: string): boolean {
    return this.allwoedDomains.some((domain) => email.endsWith(domain));
  }

  async authentic(email: string, password: string): Promise<boolean> {
    if (!this.isAllowedEmail(email)) {
      throw new Error('El dominio del correo electronico no está permitido.');
    }
    try {
      await this.authSer.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('Error en la autenticación.');
      return false;
    }
  }

  async register(email: string, password: string): Promise<string> {
    try {
      const userCredential = await this.authSer.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user?.uid;
      if (uid) {
        return uid;
      } else {
        throw new Error('No se pudo obtener el UID del usuario.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.authSer.authState;
  }
}
