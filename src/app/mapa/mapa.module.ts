import { NgModule } from '@angular/core';
import { PoComponentsModule, PoModule } from '@po-ui/ng-components';
import { MapaComponent } from './mapa.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { MapaRoutingModule } from './mapa-routing.module';

@NgModule({
	declarations: [MapaComponent],
	imports: [
		CommonModule,
		PoModule,
		PoComponentsModule,
		PoTemplatesModule,
		MapaRoutingModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDK-sMfXQ4wrruu3Xaogt1ZGjtbgybPUW8',
		}),
	],

	providers: [],

	bootstrap: [MapaComponent],
})
export class MapaModule {}
