import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
	declarations: [MenuComponent, CadastroComponent],

	imports: [CommonModule, PoModule, FormsModule, ReactiveFormsModule, MenuRoutingModule],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'pt-BR',
		},
	],
	bootstrap: [],
})
export class MenuModule {}
