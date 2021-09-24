import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { FindEasyService } from '../services/findEasy.service';
import { Utils } from '../utils/functions.utils';

@Component({
	selector: 'fe-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
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

	constructor(private router: Router, private feService: FindEasyService) {}

	ngOnInit(): void {
		this.configPage();
	}

	configPage() {
		const userId: string = window.localStorage.getItem('userId');
		if (!Utils.isEmpty(window.localStorage.getItem('tokenFE')) && !Utils.isEmpty(userId)) {
			this.getInfoUser(userId);
		} else {
			this.router.navigate(['/login']);
		}
	}

	logoff() {
		window.localStorage.clear();
		this.router.navigate(['/login']);
	}

	getInfoUser(userId: string) {
		this.feService.get(`/FindUser/${userId}`, '').subscribe((infoUserId) => {
			console.log(infoUserId);
			if (infoUserId.data.hasOwnProperty('usuario')) {
				this.profileUser = {
					title: `${infoUserId.data.nome} ${infoUserId.data.sobrenome}`,
					subtitle: infoUserId.data.email,
					avatar: '',
				};
			}
		});
	}
}
