import { AgmCoreModule } from '@agm/core';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { MapaComponent } from './mapa.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK-sMfXQ4wrruu3Xaogt1ZGjtbgybPUW8',
    }),
  ],

  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [],
})
export class MapaModule {}
