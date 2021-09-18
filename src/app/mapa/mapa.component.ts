import { Component, OnInit } from '@angular/core';
import { FindEasyService } from '../services/findEasy.service';
import { Utils } from '../utils/functions.utils';

@Component({
	selector: 'fe-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
	title = 'Find Easy';
	endereco: string = '';
	dataHora: string = '';
	msgStatus: string = '';
	lat: number = 0;
	lng: number = 0;
	zoom: number = 18;
	typeStatus: any;
	corTag: any;
	hasConnection: boolean = false;
	hideLoading: boolean = true;

	constructor(private feService: FindEasyService) {}

	ngOnInit() {
		if (Utils.isEmpty(window.localStorage.getItem('tokenFE'))) {
			this.getDados();
		}
	}

	/**
	 * Função responsável por buscar as coordenadas do mapa
	 */
	getDados() {
		this.feService.get('FindById/1', 'Get Dados').subscribe((resp) => {
			if (resp.hasOwnProperty('data') && !Utils.isEmpty(resp.data)) {
				this.hasConnection = true;
				const dados = resp.data[0].hasOwnProperty('Atual')
					? resp.data[0].Atual
					: resp.data[0].hasOwnProperty('Anterior')
					? resp.data[0].Anterior
					: undefined;

				if (!Utils.isEmpty(dados)) {
					this.lat = dados.latitude;
					this.lng = dados.longitude;
					this.dataHora = dados.data_inclusao;
				}
			}

			this.hideLoading = true;

			setTimeout(() => {
				this.getDados();
			}, 1000);
		});
	}
}
