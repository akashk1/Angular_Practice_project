import { Ingredient } from "../shared/ingredient.model";

import { Subject } from "../../../node_modules/rxjs";


export class ShoppingListService{
    editStarted=new Subject<number>();
    ingredientChanged=new Subject<Ingredient[]>();
   private ingredients: Ingredient[] = [new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getIngredient()
  {
      return this.ingredients.slice();
  }
  getIngredients(index:number)
  {
      return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient)
  {
      this.ingredients.push(ingredient);
      this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[])
  {
      this.ingredients.push(...ingredients);
      this.ingredientChanged.next(this.ingredients.slice());

  }
  onUpdateIngredient(index:number,newIngredient:Ingredient)
  {
     this.ingredients[index]= new Ingredient(newIngredient.name,newIngredient.amount);
     this.ingredientChanged.next(this.ingredients.slice());
  }
  onDeleteIngredient(index:number)
  {
      this.ingredients.splice(index,1);
      this.ingredientChanged.next(this.ingredients.slice());
  }
}