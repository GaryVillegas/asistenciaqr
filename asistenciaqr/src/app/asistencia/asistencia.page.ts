import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  constructor() {}

  ngOnInit() {
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }
}
