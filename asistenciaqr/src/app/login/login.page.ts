import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toast: AlertController,
    private authSer: AuthService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async onlogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const authentic = await this.authSer.authentic(email, password);
        if (authentic) {
          if (email.endsWith('@duocuc.cl')) {
            this.route.navigate(['/student/home-student']);
            this.loginForm.reset();
          } else if (email.endsWith('@profesor.duoc.cl')) {
            this.route.navigate(['/home-profesor']);
          }
          this.loginForm.reset();
        } else {
          this.showAlert(
            'Error',
            'Credenciales invalidas. Por favor, intente nuevamnete'
          );
        }
      } catch (error) {
        this.showAlert('error', 'error');
      }
    } else {
      this.showAlert(
        'Error',
        'Por favor, complete todos los campos correctamente.'
      );
    }
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.toast.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
