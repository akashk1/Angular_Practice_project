import { Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slform: NgForm;

  constructor(private shoppingService: ShoppingListService) { }
subscription: Subscription;
editMode = false;
editedItemIndex: number;
editIngredient: Ingredient;
  ngOnInit() {
   this.subscription = this.shoppingService.editStarted.subscribe(
(index: number) => {
  this.editMode = true;
  this.editedItemIndex = index;
  this.editIngredient = this.shoppingService.getIngredients(index);
this.slform.setValue({
  name: this.editIngredient.name,
  amount: this.editIngredient.amount

});

}
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.onUpdateIngredient(this.editedItemIndex, newIngredient);
    } else {
    this.shoppingService.addIngredient(newIngredient);
    }
    this.slform.reset();
    this.editMode = false;
  }
  onDeleteItem() {
    this.shoppingService.onDeleteIngredient(this.editedItemIndex);
    this.slform.reset();
    this.editMode = false;
  }
  onClear() {
    this.slform.reset();
    this.editMode = false;
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
