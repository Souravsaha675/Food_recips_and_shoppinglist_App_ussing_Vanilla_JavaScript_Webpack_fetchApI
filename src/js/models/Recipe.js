import axios from 'axios';

export default class Recipe{

    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //console.log(res);
            this.title = res.data.recipe.title;

            this.author = res.data.recipe.publisher;
            
            this.image_url = res.data.recipe.image_url;

            this.source_url = res.data.recipe.source_url;

            this.ingredients = res.data.recipe.ingredients;
        
        } catch(err){
            console.log(err);
        }
    }

    calculateCookingTime(){
        const numIngredients = this.ingredients.length;
        
        const periods = Math.ceil(numIngredients/3);

        this.time = periods*15;  //assuming 15 min for each 3 ingrident
    }

    calculateServings(){
        this.servings = 4;
    }
}