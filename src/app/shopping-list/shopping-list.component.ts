import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {


  ingredients: Ingredient[];
private subscription: Subscription;
  constructor(private shoppingService: ShoppingListService) {

  }

  ngOnInit() {
   this.ingredients = this.shoppingService.getIngredient();
  this.subscription = this.shoppingService.ingredientChanged.subscribe(
     (ingredient: Ingredient[]) => {
       this.ingredients = ingredient;
     }
   );

  }
  onEditItem(index: number) {
    this.shoppingService.editStarted.next(index);
  }
ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
