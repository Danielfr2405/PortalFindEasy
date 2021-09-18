import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
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
		avatar: 'https://img.freepik.com/psd-gratuitas/homem-jovem-sorrindo-e-apontar_1187-6834.jpg?size=338&ext=jpg',
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
			//action: ,
			visible: false,
		},
	];

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.configPage();
	}

	configPage() {
		if (Utils.isEmpty(window.localStorage.getItem('tokenFE'))) {
			this.router.navigate(['/login']);
		}
	}

	logoff() {
		window.localStorage.clear();
		this.router.navigate(['/login']);
	}
}
