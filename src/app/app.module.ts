import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoComponentsModule, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [AppComponent, CadastroComponent, LoginComponent],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		FormsModule,
		PoComponentsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		PoModule,
		PoTemplatesModule,
		AgmCoreModule.forRoot({
			apiKey: 'informe a chave de acesso da api do google maps',
		}),
	],

	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'pt-BR',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
