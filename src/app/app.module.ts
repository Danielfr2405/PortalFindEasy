import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoComponentsModule, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent],
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
