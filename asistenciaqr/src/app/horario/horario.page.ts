import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  constructor() {}

  ngOnInit() {
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }
}
