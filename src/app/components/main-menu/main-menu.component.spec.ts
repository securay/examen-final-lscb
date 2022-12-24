import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MainMenuComponent } from './main-menu.component';
import { CocktailListComponent } from '../cocktail-list/cocktail-list.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let breadcrumb: BreadcrumbsComponent;
  let breadcrumbFixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;

  const routes: Routes = [
    {path: 'cocktail/:alcoholic', component: CocktailListComponent},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent, MainMenuComponent, CocktailListComponent],
      imports: [MatCardModule,CommonModule,RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    breadcrumbFixture = TestBed.createComponent(BreadcrumbsComponent);
    breadcrumb = breadcrumbFixture.componentInstance;
    breadcrumbFixture.detectChanges();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true)); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(breadcrumb).toBeTruthy();
  });

  it(`should navigate to alcoholic`, () => {
    component.goToAlcoholic();
    expect(router.navigate).toHaveBeenCalledWith(['cocktail', '1']);
  });

  it(`should navigate to non alcoholic`, () => {
    component.goToNonAlcoholic();
    expect(router.navigate).toHaveBeenCalledWith(['cocktail', '0']);
  });
});
