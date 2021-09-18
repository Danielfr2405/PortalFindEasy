import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoComponentsModule, PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		PoModule,
		FormsModule,
		ReactiveFormsModule,
		PoComponentsModule,
		HttpClientModule,
		LoginRoutingModule,
		PoTemplatesModule,
	],

	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'pt-BR',
		},
	],
	bootstrap: [],
})
export class LoginModule {}
