export class IngredientEntity {
  name: string;
  measure: string;
  constructor(name?: string, measure?: string) {
    this.name = name ?? '';
    this.measure = measure ?? '';
  }
}
