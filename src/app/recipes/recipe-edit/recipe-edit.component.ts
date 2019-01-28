import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';

import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { VALID } from '../../../../node_modules/@angular/forms/src/model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editMode=false;
private recipeForm: FormGroup;
  constructor( private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>
      {
        this.id=+params['id'];
        this.editMode=params['id']!=null;
       
        console.log(this.editMode);
        this.initForm();
      }
    );
  
  }
 
initForm()
{
  let recipeName='';
  let recipeDescription='';
  let recipeImagePath='';
  let recipeIngredients=new FormArray([]);
  console.log("akash");
  if(this.editMode)
  {
    const recipes =this.recipeService.getRecipes(this.id);
    recipeName=recipes.name;
    recipeImagePath=recipes.imagePath;
    recipeDescription=recipes.description;
    if(recipes['ingredients'])
    {
      for(let ingredient of recipes.ingredients)
      {
        recipeIngredients.push(
          new FormGroup(
            {
              name: new FormControl(ingredient.name,Validators.required),
            amount:new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])

            }
          )
        );
      }
    }

  }
  this.recipeForm=new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
}
onSubmit()
{
 // const newRecipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['imagePath'],
//this.recipeForm.value['description'],this.recipeForm.value['ingredients']);
if(this.editMode)
{
  this.recipeService.updateRecipe(this.id,this.recipeForm.value);
}
else
{
  this.recipeService.addRecipe(this.recipeForm.value);
}
this.onCancel();
}
onCancel()
{
  this.recipeForm.reset();
  this.router.navigate(['../'],{relativeTo:this.route});
}
onDeleteIngredients(index:number)
{
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
onAddIngredients()
{
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup(
      {
        name:new FormControl(),
        amount:new FormControl()
      }
    )
  );
}
}
