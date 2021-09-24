import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginComponent, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { FindEasyService } from '../services/findEasy.service';
import { litLogin } from './login.literals';
import { Utils } from '../utils/functions.utils';

@Component({
	selector: 'fe-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	loginCustomLiterals: PoPageLoginLiterals = litLogin;

	isLoading: boolean = false;

	@ViewChild('login') paginaLogin: PoPageLoginComponent;

	constructor(
		private router: Router,
		private feService: FindEasyService,
		public poNotification: PoNotificationService
	) {}

	/**
	 * Realiza Autenticação Local - Sem mingle
	 * @param loginData - Pagina do Login
	 */
	loginSubmit(loginData: PoPageLogin) {
		this.isLoading = true;
		window.localStorage.clear();

		this.feService
			.post(
				'/Auth',
				'',
				btoa(`${loginData.login.trim()}:auth:${btoa(loginData.password.trim())}`)
			)
			.subscribe((vldLogin) => {
				if (!Utils.isEmpty(vldLogin)) {
					if (!Utils.isEmpty(vldLogin.data)) {
						window.localStorage.setItem('tokenFE', vldLogin.data);
						window.localStorage.setItem('userId', loginData.login.trim());
						this.router.navigate(['/monitoring']);
					} else {
						this.isLoading = false;
						this.poNotification.error(vldLogin.message);
					}
				}
			});
	}

	navigator() {
		this.router.navigate(['/register']);
	}
}
