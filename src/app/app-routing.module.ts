import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
	},
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'register',
		component: CadastroComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
