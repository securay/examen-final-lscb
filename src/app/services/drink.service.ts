import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrinkResponseEntity } from '../entities/drink-response-entity';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private base_url: string = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  listDrinksByName(name: string) {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}search.php?s=${name}`);
  }

  listIngredients() {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}list.php?i=list`);
  }

  listDrinksByIngredient(ingredient: string) {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}filter.php?i=${ingredient}`);
  }

  listAlcoholicDrinks() {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}filter.php?a=Alcoholic`);
  }

  listNonAlcoholicDrinks() {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}filter.php?a=Non_Alcoholic`);
  }

  lookup(idDrink: string) {
    return this.http.get<DrinkResponseEntity>(`${this.base_url}lookup.php?i=${idDrink}`);
  }
}
