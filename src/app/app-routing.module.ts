import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';

export const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
    children: [
      {
        path: 'mapa',
        loadChildren: () =>
          import('./mapa/mapa.module').then((m) => m.MapaModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'mapa',
    component: MapaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
