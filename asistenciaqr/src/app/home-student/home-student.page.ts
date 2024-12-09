import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.page.html',
  styleUrls: ['./home-student.page.scss'],
})
export class HomeStudentPage implements OnInit {
  constructor() {}

  ngOnInit() {
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  isMobile: boolean = true;
  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }
}
