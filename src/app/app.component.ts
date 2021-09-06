import { Component, OnInit } from '@angular/core';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
  PoTagType,
} from '@po-ui/ng-components';
import { BehaviorSubject } from 'rxjs';
import { FindEasyService } from './services/findEasy.service';

export interface MenuItemInterface extends PoMenuItem {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Find Easy';
  endereco: string = '';
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  data_hora: string = '';
  lat: number = 0; //-23.4761566667;
  lng: number = 0; //-46.58499992;
  zoom: number = 18;
  typeStatus: any;
  corTag: any;
  msgStatus: string = '';
  hasConnection: boolean = false;
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

  constructor(private feService: FindEasyService) {}

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.feService.get('FindById/1', 'Get Dados').subscribe((resp) => {
      if (resp !== null && resp !== undefined) {
        if (resp.hasOwnProperty('data')) {
          this.hasConnection = true;
          const dados = resp.data[0].Atual;
          this.lat = dados.latitude;
          this.lng = dados.longitude;
          this.data_hora = ' ' + dados.data_inclusao + ' hs';
        } else {
          this.data_hora = resp.data[0].Anterior.data_inclusao;
        }
      }
      this.hideLoading = true;

      setTimeout(() => {
        this.getDados();
      }, 1000);
    });
  }
}
