import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeProfesorPageRoutingModule } from './home-profesor-routing.module';
import { HomeProfesorPage } from './home-profesor.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeProfesorPageRoutingModule,
    ReactiveFormsModule,
    QrCodeModule,
  ],
  declarations: [HomeProfesorPage],
})
export class HomeProfesorPageModule {}
