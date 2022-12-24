import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkEntity } from 'src/app/entities/drink-entity';
import { DrinkResponseEntity } from 'src/app/entities/drink-response-entity';
import { DrinkService } from 'src/app/services/drink.service';

import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { BreadcrumbEntity } from 'src/app/entities/breadcrumb-entity';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  alcoholic: boolean;
  private alcoholicStr: string;
  keyword: string = '';

  searchDrinkCtrl = new FormControl();
  filteredDrinks: DrinkEntity[];
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedDrink: any = '';

  breadcrumbs: BreadcrumbEntity[] = [
    new BreadcrumbEntity(['/'], 'Inicio', true)
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private drinkService: DrinkService
  ) {}

  showInfo(idDrink: string): void {
    this.router.navigate(['cocktail', `${this.alcoholic ? '1' : '0'}`, 'detail', idDrink]);
  }

  ngOnInit(): void {
    console.log(this.route);
    this.alcoholic = this.route.snapshot.params['alcoholic'] === '1';
    this.alcoholicStr = this.alcoholic ? 'Alcoholic' : 'Non alcoholic';
    
    if (this.alcoholic) {
      this.drinkService.listAlcoholicDrinks().subscribe({
        next: (response: DrinkResponseEntity) => {
          this.filteredDrinks = response.drinks;
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
      this.breadcrumbs.push(new BreadcrumbEntity(['/', 'cocktail', '1'], 'Bebidas Alcoholicas', false));
    } else {
      this.drinkService.listNonAlcoholicDrinks().subscribe({
        next: (response: DrinkResponseEntity) => {
          this.filteredDrinks = response.drinks;
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
      this.breadcrumbs.push(new BreadcrumbEntity(['/', 'cocktail', '0'], 'Bebidas No Alcoholicas', false));
    }

    this.searchDrinkCtrl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = '';
          this.filteredDrinks = [];
          this.isLoading = true;
        }),
        switchMap((value: string) => this.drinkService.listDrinksByName(value ?? '')
            .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe((data: DrinkResponseEntity) => {
        console.log(data);
        if (data.drinks === null) {
          this.errorMsg = 'No se encontraron resultados';
          this.filteredDrinks = [];
        } else {
          this.filteredDrinks = data.drinks.filter((drink) => drink.strAlcoholic === this.alcoholicStr);
          this.errorMsg = this.filteredDrinks
            ? ''
            : 'No se encontraron resultados';
        }
        console.log(this.filteredDrinks);
      });
  }

  onSelected() {
    console.log(this.selectedDrink);
    this.showInfo(this.selectedDrink.idDrink);
  }

  displayWith(value: DrinkEntity) {
    return value?.strDrink ?? '';
  }

  clearSelection() {
    this.selectedDrink = '';
    this.filteredDrinks = [];
  }
}
