import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {
  qrData: string = 'Texto de base';
  createdCode: string = '';
  claseForm: FormGroup;

  constructor(
    private toast: ToastController,
    private fb: FormBuilder,
    private authSer: AuthService,
    private store: StoreService
  ) {
    this.claseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      careerClass: ['', Validators.required],
      iniTime: ['', Validators.required],
      finishTime: ['', Validators.required],
      hour: ['', Validators.required],
      week: ['', Validators.required],
      profesor: ['', Validators.required],
    });
  }
  career: string[] = [
    'Ingeniería Informatica',
    'Tecnico Informatico',
    'Medicina',
    'Derecho',
    'Arquitectura',
    'Administración',
  ];
  hour: string[] = ['Diurno', 'Vespertino'];
  week: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  usuario: any = { name: '' };
  profesors: any[] = []; //variable para almacenar a profesores.
  clases: any[] = []; //variable para almacenar las clases

  async ngOnInit() {
    this.loadClasses();
    this.loadProfesor();
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.authSer.getCurrentUser().subscribe((user) => {
      if (user) {
        this.store.getUserData(user.uid).subscribe((userData: any) => {
          this.usuario.name = userData?.name || 'Usuario'; // Asigna el nombre o un valor por defecto
        });
      } else {
        this.usuario.nombre = 'Invitado';
      }
    });
  }

  isMobile: boolean = false;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  //Modal crear clase
  isCrearModalOpen = false;
  setOpenCrear(isOpen: boolean) {
    this.isCrearModalOpen = isOpen;
  }

  setQrData(clases: any) {
    if (clases) {
      this.createdCode = JSON.stringify(clases.id);
      console.log('Código QR generado:', this.createdCode);
    } else {
      console.error('Clase no válida:', clases);
      this.createdCode = ''; // Fallback a string vacío si los datos no son válidos
    }
    this.isModalOpen = true; // Abre el modal
  }

  // Modal QR
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async saveClass() {
    if (this.claseForm.valid) {
      const data = this.claseForm.value;
      try {
        const classId = new Date().toDateString();

        const classData = {
          ...data,
          id: classId,
          createAt: new Date().toDateString(),
        };

        const uid = data.profesor;
        await this.store.saveClassData(uid, classData);
        this.claseForm.reset();
        this.showMessage('Exito!', 'Clase creada exitosamente.');
      } catch (error) {
        console.log('Error al guardar clase: ', error);
        this.showMessage('Error!', 'Error al guardar clase');
      }
    } else {
      this.showMessage(
        'Error',
        'Por favor complete todos los campos correctamente.'
      );
      console.error('Formulario inválido:', this.claseForm.errors);
    }
  }

  loadProfesor() {
    this.store.getProfesors().subscribe(
      (data) => {
        this.profesors = data;
        console.log('Profesores Cargados: ', this.profesors);
      },
      (error) => {
        console.error('Error al cargar los profesores: ', error);
        this.showMessage('Error', error);
      }
    );
  }

  loadClasses() {
    this.store.getAllClasses().subscribe(
      (data) => {
        this.clases = data;
        console.log('Clases Cargadas: ', this.clases);
      },
      (error) => {
        console.error('Error al cargar las clases: ', error);
        this.showMessage('Error al cargar clases', error);
      }
    );
  }

  async showMessage(head: string, mensaje: string) {
    const toast = await this.toast.create({
      header: head,
      message: mensaje,
      buttons: ['OK'],
    });
    toast.present();
  }
}
