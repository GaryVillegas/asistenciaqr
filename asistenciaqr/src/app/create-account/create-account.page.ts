import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  personForm: FormGroup; //formulario
  tipe: string[] = ['Alumno', 'Profesor']; //variable tipo de persona
  hour: string[] = ['Diurno', 'Vespertino']; //variable tipo horario
  showHour = false; //variable para no mostrar horario en caso de ser profesor
  placeholderCorreo = 'correo@duocuc.cl | correo@profesor.duoc.cl'; //variable para cambiar dominio según tipo persona
  career: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];

  constructor(
    private fb: FormBuilder,
    private toast: ToastController,
    private authSer: AuthService,
    private store: StoreService,
    private route: Router
  ) {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      career: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      tipePerson: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@(duocuc.cl|profesor.duoc.cl)$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async savePerson() {
    if (this.personForm.valid) {
      const { email, password, ...additionalData } = this.personForm.value;

      try {
        const uid = await this.authSer.register(email, password);
        const dataWhitUid = { ...additionalData, uid };
        await this.store.saveUserData(uid, dataWhitUid);
        this.mostrarMensaje('Cuenta creada exitosamente.');
        setTimeout(() => {
          this.route.navigate(['/']);
        }, 1000);
      } catch (error) {
        console.error('este es el error: ', error);
      }
    } else {
      this.mostrarMensaje('Por favor complete todos los campos correctamente.');
    }
  }

  onTipePersonChange(event: any) {
    const tipePerson = event.detail.value;
    if (tipePerson === 'Alumno') {
      this.showHour = true;
      this.placeholderCorreo = 'correo@duocu.cl';
      this.personForm.get('hour')?.setValidators(Validators.required);
    } else if (tipePerson === 'Profesor') {
      this.showHour = false;
      this.placeholderCorreo = 'correo@profesor.duoc.cl';
      this.personForm.get('hour')?.clearValidators();
    }

    this.personForm.get('hour')?.updateValueAndValidity();
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
