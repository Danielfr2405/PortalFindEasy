import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { FindEasyService } from './services/findEasy.service';
import { Utils } from './utils/functions.utils';

@Injectable({
	providedIn: 'root',
})
@Component({
	selector: 'fe-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	hideMenu: boolean = false;
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

	/**
	 * Criação dos itens para o menu do Perfil
	 */
	profileActions: Array<PoToolbarAction> = [
		{
			icon: 'po-icon-exit',
			label: 'Exit',
			action: this.logoff.bind(this),
			type: 'danger',
		},
	];

	// Perfil do usuário
	profileUser: PoToolbarProfile = {
		avatar: '',
		title: 'Usuário teste',
		subtitle: 'usuario@gmail.com',
	};

	// Menus
	menus: Array<PoMenuItem> = [
		{
			label: 'Home',
			shortLabel: 'Home',
			icon: 'po-icon-home',
		},
	];

	toolbarActions: Array<PoToolbarAction> = [
		{
			label: 'Item 1',
			icon: 'po-icon-folder',
			separator: true,
			visible: false,
		},
	];

	constructor(private router: Router, private feService: FindEasyService) {
		this.hideMenu = this.router.url === '/login';
	}

	ngOnInit(): void {
		this.configPage();
	}

	configPage() {
		const userId: string = window.localStorage.getItem('userId');
		if (!Utils.isEmpty(window.localStorage.getItem('tokenFE')) && !Utils.isEmpty(userId)) {
			this.hideLoading = false;
			this.getInfoUser(userId);
		} else {
			this.router.navigate(['/login']);
		}
	}

	logoff() {
		window.localStorage.clear();
		this.hideMenu = true;
		this.router.navigate(['/login']);
	}

	getInfoUser(userId: string) {
		this.feService.get(`/FindUser/${userId}`, '').subscribe((infoUserId) => {
			if (infoUserId.data.hasOwnProperty('usuario')) {
				this.getDados(infoUserId.data.dispositivo);
				this.profileUser = {
					title: `${infoUserId.data.nome} ${infoUserId.data.sobrenome}`,
					subtitle: infoUserId.data.email,
					avatar: '',
				};
			}
			this.hideLoading = true;
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
					this.dataHora = Utils.makeFormatDate(new Date(dados.data_inclusao));
					this.validConnection(resp, dados.data_inclusao);
				}
			}

			this.hideLoading = true;

			setTimeout(() => {
				this.getDados(userId);
			}, 1000);
		});
	}

	validConnection(resp, dateResp: string) {
		const now: Date = new Date();
		now.setMinutes(now.getMinutes() - 30);

		const dateLocation: Date = new Date(dateResp);

		this.hasConnection =
			resp.hasOwnProperty('data') &&
			!Utils.isEmpty(resp.data) &&
			dateLocation.getTime() >= now.getTime();
	}
}
