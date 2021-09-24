import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

	constructor(private feService: FindEasyService, private router: Router) {}

	ngOnInit() {
		const userId: string = window.localStorage.getItem('userId');
		if (!Utils.isEmpty(window.localStorage.getItem('tokenFE')) && !Utils.isEmpty(userId)) {
			this.getInfoUser(userId);
		} else {
			this.router.navigate(['/login']);
		}
	}

	getInfoUser(userId: string) {
		this.feService.get(`/FindUser/${userId}`, '').subscribe((infoUserId) => {
			if (infoUserId.data.hasOwnProperty('usuario')) {
				this.getDados(infoUserId.data.dispositivo);
			}
		});
	}

	/**
	 * Função responsável por buscar as coordenadas do mapa
	 */
	getDados(userId: string) {
		this.feService.get(`FindById/${userId}`, 'Get Dados').subscribe((resp) => {
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
				this.getDados(userId);
			}, 1000);
		});
	}
}
