import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor(
    private toast: ToastController,
    private authSer: AuthService,
    private store: StoreService
  ) {}
  asistens: any[] = [];
  usuario: any = { name: '', career: '', uid: '' };

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.authSer.getCurrentUser().subscribe((user) => {
      if (user) {
        this.store.getUserData(user.uid).subscribe((userData: any) => {
          this.usuario.name = userData?.name || 'Usuario'; // Asigna el nombre o un valor por defecto
          this.usuario.career = userData?.career || 'Carrera';
          this.usuario.uid = userData?.uid || 'Id';
          this.loadAsistens(this.usuario.uid);
        });
      } else {
        this.usuario.nombre = 'Invitado';
      }
    });
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  loadAsistens(uid: string) {
    this.store.getAsistencias(uid).subscribe({
      next: (asistencias) => {
        console.log('Asistencias: ', asistencias);
        this.asistens = asistencias;
      },
      error: (error) => {
        console.error('Error al cargar la asistencias: ', error);
      },
    });
  }

  async showMessage(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 2000,
    });

    toast.present();
  }
}
