import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
	PoBreadcrumb,
	PoNotificationService,
	PoToolbarAction,
	PoToolbarProfile,
} from '@po-ui/ng-components';
import { BehaviorSubject } from 'rxjs';
import { FindEasyService } from '../services/findEasy.service';
import { Utils } from '../utils/functions.utils';

interface Cadastro {
	nome?: string;
	sobrenome?: string;
	email?: string;
	usuario?: string;
	dispositivo?: string;
	password?: string;
	dt_nasc?: Date;
}
@Component({
	selector: 'fe-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
	formCadastro: FormGroup;
	isLoading: boolean = true;
	loadingBtnsave: boolean = false;

	toolbarActions: Array<PoToolbarAction> = [
		{
			label: 'Item 1',
			icon: 'po-icon-folder',
			separator: true,
			//action: ,
			visible: false,
		},
	];

	public breadcrumb: PoBreadcrumb = {
		items: [],
	};

	/**
	 * Criação dos itens para o menu do Perfil
	 */
	profileActions: Array<PoToolbarAction> = [
		{
			icon: 'po-icon-exit',
			label: 'Exit',
			// action: this.logoff.bind(this), type: 'danger'
		},
	];

	// Perfil do usuário
	profileUser: PoToolbarProfile = {
		avatar: 'https://img.freepik.com/psd-gratuitas/homem-jovem-sorrindo-e-apontar_1187-6834.jpg?size=338&ext=jpg',
		title: 'Usuário teste',
		subtitle: 'usuario@gmail.com',
	};

	/**
	 * Variável que alimenta a lista de notificações do Menu!
	 */
	listNotifications: BehaviorSubject<Array<NotificationAction>>;

	constructor(
		private router: Router,
		private feService: FindEasyService,
		private formBuilder: FormBuilder,
		public poNotification: PoNotificationService
	) {}

	ngOnInit(): void {
		this.createCadastro({} as Cadastro);
	}

	createCadastro(cadastro: Cadastro) {
		this.formCadastro = this.formBuilder.group({
			nome: [cadastro.nome, Validators.compose([Validators.required])],
			sobrenome: [cadastro.nome, Validators.compose([Validators.required])],
			email: [cadastro.email, Validators.compose([Validators.required])],
			usuario: [cadastro.usuario, Validators.compose([Validators.required])],
			dispositivo: [cadastro.dispositivo, Validators.compose([Validators.required])],
			password: [cadastro.password, Validators.compose([Validators.required])],
			dt_nasc: [cadastro.dt_nasc],
		});
	}

	onCancel() {
		this.router.navigate(['/login']);
	}

	submitCadastro() {
		this.loadingBtnsave = true;
		if (this.formCadastro.valid) {
			const request: Cadastro = this.formCadastro.value;
			request.password = btoa(request.password);

			this.feService.post('/Auth', 'Cadastro de Usuário', request).subscribe((resp) => {
				if (!Utils.isEmpty(resp.data)) {
					this.poNotification.success(resp.message);
					this.router.navigate(['/login']);
					this.restoreForm();
				} else {
					this.loadingBtnsave = false;
					this.poNotification.error(resp.message);
				}
			});
		} else {
			this.loadingBtnsave = false;
			this.poNotification.warning('Existem campos obrigatórios não preenchidos. Verifique!');
		}
	}

	restoreForm() {
		this.formCadastro.patchValue({
			nome: '',
			email: '',
			usuario: '',
			dispositivo: '',
			senha: '',
			dt_nasc: '',
		});
	}
}
