import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CocktailDetailComponent } from './cocktail-detail.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IngredientEntity } from 'src/app/entities/ingredient-entity';

describe('CocktailDetailComponent', () => {
  let component: CocktailDetailComponent;
  let fixture: ComponentFixture<CocktailDetailComponent>;
  let breadcrumb: BreadcrumbsComponent;
  let breadcrumbFixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [CocktailDetailComponent, BreadcrumbsComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
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

    fixture = TestBed.createComponent(CocktailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    breadcrumbFixture = TestBed.createComponent(BreadcrumbsComponent);
    breadcrumb = breadcrumbFixture.componentInstance;
    breadcrumbFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(breadcrumb).toBeTruthy();
  });

  it('should add ingredient', () => {
    const il = component.ingredients.length;
    component.addIngredient(new IngredientEntity('I1', 'M1'));
    expect(il + 1).toEqual(component.ingredients.length);
  });
});
