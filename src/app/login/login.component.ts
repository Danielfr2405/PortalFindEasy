import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import {
  PoPageLogin,
  PoPageLoginComponent,
  PoPageLoginLiterals,
} from '@po-ui/ng-templates';
import { FindEasyService } from '../services/findEasy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginCustomLiterals: PoPageLoginLiterals = {
    welcome: ' ',
    loginErrorPattern: 'Login obrigatório',
    loginHint:
      'Caso não possua usuário entre em contato com o administrador do sistema',
    loginLabel: 'Insira seu usuário',
    loginPlaceholder: 'Insira seu usuário de acesso',
    customFieldPlaceholder: 'Insira seu alias de acesso',
    rememberUser: 'Logar automaticamente',
    submitLabel: 'Entrar',
    support: 'Ajuda',
    forgotPassword: 'Problemas com seu login? Clique aqui',
  };

  isLoading: boolean = false;
  bLoading: boolean = false;

  @ViewChild('login') paginaLogin: PoPageLoginComponent;

  constructor(
    private router: Router,
    private feService: FindEasyService,
    public poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {}

  /**
   * Realiza Autenticação Local - Sem mingle
   * @param loginData - Pagina do Login
   */
  loginSubmit(loginData: PoPageLogin) {
    this.bLoading = true;
    let isValid: boolean = false;
    const usuario: string = loginData.login;

    this.feService.get('/FindUser/' + usuario, 'Login').subscribe((resp) => {
      if (resp !== null && resp !== undefined) {
        if (resp.hasOwnProperty('usuario')) {
          isValid = this.validaUsuario(resp.usuario, resp.senha, loginData);

          if (isValid) {
            this.router.navigate(['/mapa']);
          } else {
            this.poNotification.warning(
              'Usuário ou senha digitados estão incorretos. Verifique!'
            );
          }
        }
      } else {
        this.poNotification.warning('Usuário ou senha incorretos. Verifique!');
      }
      this.bLoading = false;
    });
  }

  validaUsuario(user: string, password: string, dadosDigitados: any) {
    let usuario = user.replace("'", '');
    usuario = usuario.replace("'", '');
    usuario = usuario.replace('b', '');

    let senha = password.replace("'", '');
    senha = senha.replace("'", '');
    senha = senha.replace('b', '');

    return (
      dadosDigitados.login === atob(usuario) &&
      dadosDigitados.password === atob(senha)
    );
  }
}
