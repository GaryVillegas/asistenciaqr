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
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreService } from './store.service';
import { QrCodeModule } from 'ng-qrcode';

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
      projectId: 'asistenciaqr-157f6',
      appId: '1:517154336221:web:5dea8c852c3d828d579a34',
      storageBucket: 'asistenciaqr-157f6.firebasestorage.app',
      apiKey: 'AIzaSyB3JL8iqqW78uP2xbsKdhLvG90qHEYNabs',
      authDomain: 'asistenciaqr-157f6.firebaseapp.com',
      messagingSenderId: '517154336221',
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
    StoreService,
    QrCodeModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'asistenciaqr-157f6',
        appId: '1:517154336221:web:5dea8c852c3d828d579a34',
        storageBucket: 'asistenciaqr-157f6.firebasestorage.app',
        apiKey: 'AIzaSyB3JL8iqqW78uP2xbsKdhLvG90qHEYNabs',
        authDomain: 'asistenciaqr-157f6.firebaseapp.com',
        messagingSenderId: '517154336221',
      })
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
