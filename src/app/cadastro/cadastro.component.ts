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
import { MenuItemInterface } from '../mapa/mapa.component';
import { FindEasyService } from '../services/findEasy.service';

interface Cadastro {
  nome?: string;
  email?: string;
  usuario?: string;
  dispositivo?: string;
  senha?: string;
  dt_nasc?: Date;
}
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;
  isLoading: boolean = true;
  loadingBtnsave: boolean = false;
  hideLoading: boolean = false;

  // Menus
  menus: Array<MenuItemInterface> = [
    { id: '', label: 'Home', shortLabel: 'Home', icon: 'po-icon-home' },
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
    avatar:
      'https://img.freepik.com/psd-gratuitas/homem-jovem-sorrindo-e-apontar_1187-6834.jpg?size=338&ext=jpg',
    title: 'Usuário teste',
    subtitle: 'usuario@gmail.com',
  };

  /**
   * Variável que alimenta a lista de notificações do Menu!
   */
  listNotifications: BehaviorSubject<Array<NotificationAction>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feService: FindEasyService,
    private formBuilder: FormBuilder,
    public poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.createCadastro({} as Cadastro);
    this.hideLoading = true;
  }

  createCadastro(cadastro: Cadastro) {
    this.formCadastro = this.formBuilder.group({
      nome: [cadastro.nome, Validators.compose([Validators.required])],
      email: [cadastro.email, Validators.compose([Validators.required])],
      usuario: [cadastro.usuario, Validators.compose([Validators.required])],
      dispositivo: [
        cadastro.dispositivo,
        Validators.compose([Validators.required]),
      ],
      senha: [cadastro.senha, Validators.compose([Validators.required])],
      dt_nasc: [cadastro.dt_nasc],
    });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

  submitCadastro() {
    this.loadingBtnsave = true;
    if (this.formCadastro.valid) {
      this.feService
        .post('/CadastraUsuario', 3, JSON.stringify(this.formCadastro.value))
        .subscribe((resp) => {
          if (typeof resp.data === 'boolean') {
            this.poNotification.success(
              'Cadastro concluído com sucesso! Necessário realizar login'
            );
            this.router.navigate(['/login']);
            this.restoreForm();
          } else {
            this.poNotification.success(
              'Não foi possível realizar o cadastro. Valide os dados preenchidos e tente novamente.'
            );
          }
          this.loadingBtnsave = true;
        });
    } else {
      this.poNotification.warning(
        'Existem campos obrigatórios não preenchidos. Verifique!'
      );
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
