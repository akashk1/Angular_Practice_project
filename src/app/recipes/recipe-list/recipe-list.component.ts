import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected=new EventEmitter<Recipe>();
recipes:Recipe[]=[
  new Recipe('First Recipe','This is my First Recipe','https://img.sndimg.com/food/image/upload/w_707,h_398,c_fill,fl_progressive,q_80/v1/img/recipes/40/49/7/iUlxb54sSWaD9Zp44kfP_FGgWFV4mSVq8aISp1eQG_baked%20wings%20(1%20of%204).jpg'),
  new Recipe('First Recipe','This is my First Recipe','https://img.sndimg.com/food/image/upload/w_707,h_398,c_fill,fl_progressive,q_80/v1/img/recipes/40/49/7/iUlxb54sSWaD9Zp44kfP_FGgWFV4mSVq8aISp1eQG_baked%20wings%20(1%20of%204).jpg')
];
  constructor() { }

  ngOnInit() {
  }
onRecipeSelected(recipe:Recipe)
{
this.recipeWasSelected.emit(recipe);
}
}
