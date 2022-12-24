import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbEntity } from 'src/app/entities/breadcrumb-entity';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  breadcrumbs: BreadcrumbEntity[] = [
    new BreadcrumbEntity(['/'], 'Inicio', false)
  ];

  constructor(private router: Router) { }
  goToAlcoholic() {
    this.router.navigate(['cocktail', '1']);
  }

  goToNonAlcoholic() {
    this.router.navigate(['cocktail', '0']);
  }
}
