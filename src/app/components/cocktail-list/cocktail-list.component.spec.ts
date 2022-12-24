import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CocktailListComponent } from './cocktail-list.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CocktailDetailComponent } from '../cocktail-detail/cocktail-detail.component';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let breadcrumb: BreadcrumbsComponent;
  let breadcrumbFixture: ComponentFixture<BreadcrumbsComponent>;
  let router: Router;

  const routes: Routes = [
    {path: 'cocktail/:alcoholic/detail/:idDrink', component: CocktailDetailComponent},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatListModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [CocktailListComponent, BreadcrumbsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ alcoholic: 1 }),
            snapshot: {
              params: {
                alcoholic: 1,
              },
              paramMap: {
                get(name: string): string {
                  return '';
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailListComponent);
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

  it('should create breadcrumb', () => {
    expect(breadcrumb).toBeTruthy();
  });

  it('should clear selection', () => {
    component.clearSelection();
    expect(component.selectedDrink).toEqual('');
    expect(component.filteredDrinks).toEqual([]);
  });

  it(`should navigate to non alcoholic drink 123`, () => {
    component.showInfo('123');
    expect(router.navigate).toHaveBeenCalledWith(['cocktail', '0', 'detail', '123']);
  });

  it(`should navigate to non alcoholic drink 124`, () => {
    component.selectedDrink = { idDrink: '124' };
    component.onSelected();
    expect(router.navigate).toHaveBeenCalledWith(['cocktail', '0', 'detail', '124']);
  });
});
