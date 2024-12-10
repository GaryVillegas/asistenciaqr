import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentPageRoutingModule } from './student-routing.module';
import { StudentPage } from './student.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    ReactiveFormsModule,
    QrCodeModule,
  ],
  declarations: [StudentPage],
})
export class StudentPageModule {}
