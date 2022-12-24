import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbEntity } from 'src/app/entities/breadcrumb-entity';
import { DrinkEntity } from 'src/app/entities/drink-entity';
import { DrinkResponseEntity } from 'src/app/entities/drink-response-entity';
import { IngredientEntity } from 'src/app/entities/ingredient-entity';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss'],
})
export class CocktailDetailComponent implements OnInit {
  private idDrink: string;
  drink: DrinkEntity;
  ingredients: IngredientEntity[] = [];
  ingredientsColumns: string[] = ['Nombre', 'Cantidad'];

  breadcrumbs: BreadcrumbEntity[] = [
    new BreadcrumbEntity(['/'], 'Inicio', true)
  ];
  
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService
  ) {}

  ngOnInit(): void {
    this.idDrink = this.route.snapshot.params['idDrink'];
    this.drinkService.lookup(this.idDrink).subscribe({
      next: (response: DrinkResponseEntity) => {
        if (response.drinks.length) {
          this.drink = response.drinks[0];

          let path: string[] = ['/', 'cocktail'];
          if (this.drink.strAlcoholic === 'Alcoholic') {
            path.push('1');
            this.breadcrumbs.push(new BreadcrumbEntity([...path], 'Bebidas Alcoholicas', true));
          } else {
            path.push('0');
            this.breadcrumbs.push(new BreadcrumbEntity([...path], 'Bebidas No Alcoholicas', true));
          }
          path.push('detail');
          path.push(this.drink.idDrink);
          this.breadcrumbs.push(new BreadcrumbEntity(path, this.drink.strDrink ?? '-', false));
          
          type ObjectKey = keyof typeof this.drink;

          for (let i = 1; i <= 15; i++) {
            const ingredientIndex = ('strIngredient' + i) as ObjectKey;
            const measureIndex = ('strMeasure' + i) as ObjectKey;
            this.addIngredient(
              new IngredientEntity(
                this.drink[ingredientIndex],
                this.drink[measureIndex]
              )
            );
          }
        }
      },
      error: (error) => {
        console.log(`Error: ${error}`);
      },
    });
  }

  addIngredient(ingredient: IngredientEntity) {
    if (ingredient.name && ingredient.measure) {
      this.ingredients.push(ingredient);
    }
  }
}
