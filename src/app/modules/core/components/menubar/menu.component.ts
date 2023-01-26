import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class CoreMenuComponent {

  items: MenuItem[] = [
    {
      label: 'Heroes',
      icon: 'pi pi-list',
      routerLink: ['/heroes'],
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Team',
      icon: 'pi pi-users',
      routerLink: ['/team'],
      routerLinkActiveOptions: { exact: true },
    }
  ];

}
