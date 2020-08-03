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

    parseIngridents(){

        const unitsLong = ['tablespoons',"tablespoon","ounces","ounce","teaspoons","teaspoon","cups","pounds"];

        const unitsShort = ['tbsp','tbsp','oz',"oz","tsp","tsp","cup","pound"];

        const units = [...unitsShort,"kg","g","lbs"];

        const newIngridents = this.ingredients.map(item =>{

            let ingredient = item.toLowerCase();

            unitsLong.map((unit,i) =>{
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            ingredient = ingredient.replace(/ *\([^)]*\) */g," ");

            const ingredientString = ingredient.split(" ");

            const IsNumber = ingredientString.findIndex(item =>units.includes(item));
        
            let ingredientObject;

            if(IsNumber > -1) {

                const ingredientNumber = ingredientString.slice(0,IsNumber);

                let count;

                if(ingredientNumber.length ===1){
                    
                    count = eval(ingredientNumber[0].replace("-","+"));
                
                } else {

                    count = eval(ingredientNumber.slice(0,IsNumber).join("+"));

                }

                ingredientObject ={
                    count,
                    unit : ingredientString[IsNumber],
                    ingredient : ingredientString.slice(IsNumber+1).join(" ")
                }

            } else if(parseInt(ingredientString[0],10)){
                
                ingredientObject ={
                    count:  parseInt(ingredientString[0],10),
                    unit: '',
                    ingredient : ingredientString.slice(1).join(" ")
                }

            } else if(IsNumber === -1){

                ingredientObject = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredientObject;
        });

        this.ingredients = newIngridents;

    }
}