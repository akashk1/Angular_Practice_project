import { Recipe } from "./recipe.model";
import { Injectable} from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Subject } from "../../../node_modules/rxjs";
@Injectable()
export class RecipeService{
   recipeChanged=new Subject<Recipe[]>();
    recipes:Recipe[]=[
        new Recipe('First Recipe','This is my First Recipe','https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F11%2F04%2Ffettuccine-olive-oil-ck-x.jpg%3Fitok%3DN9u99OOY&w=700&q=85',[
            new Ingredient('bread',2),
            new Ingredient('Meat',2)
        ]),
        new Recipe('Second Recipe','This is my First Recipe','https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2018/01/Butter-chicken-recipe.jpg',
    [new Ingredient('Meat',2),
new Ingredient('French Fries',20)])
      ];constructor(private shoppingService:ShoppingListService){}
 
      
      getRecipe()
      {
          return this.recipes.slice();
      }
      getRecipes(index:number)
      {
          return this.recipes[index];
      }
    addIngredientToShoppingList(ingredients:Ingredient[])
    {
this.shoppingService.addIngredients(ingredients);
    }  
    addRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe)
    {
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number)
    {
this.recipes.splice(index,1);
this.recipeChanged.next(this.recipes.slice());
    }
}