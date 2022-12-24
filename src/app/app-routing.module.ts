import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { CocktailDetailComponent } from './components/cocktail-detail/cocktail-detail.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  {
    path: 'cocktail/:alcoholic',
    component: CocktailListComponent
  },
  {
    path: 'cocktail/:alcoholic/detail/:idDrink',
    component: CocktailDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
