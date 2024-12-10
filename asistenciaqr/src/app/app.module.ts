import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreService } from './store.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      projectId: 'asistenciaqr-33651',
      appId: '1:872636596605:web:c261c798b303cdf5074c14',
      storageBucket: 'asistenciaqr-33651.firebasestorage.app',
      apiKey: 'AIzaSyCkXsuyaZgLyg20nOlx7KYoxdFe-qfreC0',
      authDomain: 'asistenciaqr-33651.firebaseapp.com',
      messagingSenderId: '872636596605',
    }),
    AngularFirestoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireAuth,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'asistenciaqr-33651',
        appId: '1:872636596605:web:c261c798b303cdf5074c14',
        storageBucket: 'asistenciaqr-33651.firebasestorage.app',
        apiKey: 'AIzaSyCkXsuyaZgLyg20nOlx7KYoxdFe-qfreC0',
        authDomain: 'asistenciaqr-33651.firebaseapp.com',
        messagingSenderId: '872636596605',
      })
    ),
    StoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
