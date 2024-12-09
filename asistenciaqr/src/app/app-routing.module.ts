import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./create-account/create-account.module').then(
        (m) => m.CreateAccountPageModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentPageModule),
  },
  {
    path: 'home-profesor',
    loadChildren: () =>
      import('./home-profesor/home-profesor.module').then(
        (m) => m.HomeProfesorPageModule
      ),
  },
  {
    path: 'home-student',
    loadChildren: () => import('./home-student/home-student.module').then( m => m.HomeStudentPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horario.module').then( m => m.HorarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
