import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
	{
		path: '',
		component: MenuComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('../mapa/mapa.module').then((m) => m.MapaModule),
			},
			{
				path: 'monitoring',
				loadChildren: () => import('../mapa/mapa.module').then((m) => m.MapaModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MenuRoutingModule {}
