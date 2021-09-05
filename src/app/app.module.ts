import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, CadastroComponent, LoginComponent],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    AgmCoreModule.forRoot({
      apiKey: 'informe a chave de acesso da api do google maps',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
