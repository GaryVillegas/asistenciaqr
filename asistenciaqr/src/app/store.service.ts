import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'platform',
})
export class StoreService {
  constructor(private firestore: AngularFirestore) {}

  async saveUserData(uid: string, userData: any): Promise<void> {
    try {
      await this.firestore.collection('Users').doc(uid).set(userData);
      console.log('Datos del usuario guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar datos en Firestore:', error);
      throw error;
    }
  }

  getUserData(uid: string) {
    return this.firestore.collection('Users').doc(uid).valueChanges();
  }

  async saveClassData(profesorUid: string, classData: any) {
    try {
      await this.firestore
        .collection('Class')
        .doc(profesorUid)
        .collection('Classes')
        .add(classData);
      console.log('Datos de clase guardados');
    } catch (error) {
      console.error('Error al guardar datos.', error);
      throw error;
    }
  }

  getAllClasses() {
    return this.firestore.collectionGroup('Classes').valueChanges();
  }

  //Filtro solo por diurnoVespertino
  getFilterClasses(hour: string) {
    return this.firestore
      .collectionGroup('Classes', (ref) => ref.where('hour', '==', hour))
      .valueChanges();
  }

  getFilteredClasses(hour: string, career: string) {
    return this.firestore
      .collectionGroup('Classes', (ref) =>
        ref.where('hour', '==', hour).where('careerClass', '==', career)
      )
      .valueChanges();
  }

  async saveAsistenciaData(classId: string, asistenciaData: any) {
    try {
      await this.firestore
        .collection('Asistens')
        .doc(classId)
        .set(asistenciaData);
      console.log('Datos de clase guardados');
    } catch (error) {
      console.error('Error al guardar datos.', error);
      throw error;
    }
  }

  getAllAsistens() {
    return this.firestore.collection('Asistens').valueChanges();
  }

  getProfesors() {
    return this.firestore
      .collection('Users', (ref) => ref.where('tipePerson', '==', 'Profesor'))
      .valueChanges();
  }

  getAsistencias(uid: string) {
    console.log('Consultando asistencias con uid: ', uid);
    return this.firestore
      .collection('Asistens', (ref) => ref.where('userUid', '==', uid))
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.log('Error: ', error);
          return throwError(() => new Error('Error al obtener asistencias.'));
        })
      );
  }
}
