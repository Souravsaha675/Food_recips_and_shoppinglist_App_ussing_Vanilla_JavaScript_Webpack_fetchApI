import Search from "./models/Search"
import {elements,renderLoader,clearLoader} from "./views/base"
import * as searchView from "./views/searchView"
import * as recipeView from "./views/recipeView"
import Recipe from "./models/Recipe";
import ShoppingList from "./models/ShoppingList";
import * as ShoppingListView from "./views/shoppingListView";
import Likes from "./models/Like";
import * as LikesView from "./views/likesView";

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    
    if(query){
        state.search = new Search(query);

        //console.log(search);
        searchView.clearInput();

        searchView.clearResults();

        renderLoader(elements.searchResult);

        try{
            await state.search.getResults();

            clearLoader();
            //console.log(state.search.result);
            searchView.renderResults(state.search.result);
        } catch (err){
            console.log(err);
            
            clearLoader();
        }
    }
} 

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPage.addEventListener("click", e => {

    const btn = e.target.closest(".btn-inline");

    if(btn) {
        const gotoPage = parseInt(btn.dataset.goto,10);

        searchView.clearResults();

        searchView.renderResults (state.search.result,gotoPage);
    }
})

////////////////////////////Recipe/////////////////////////


const controlRecipe = async () =>{

    const id = window.location.hash.replace("#","");
    
    //console.log(id);

    if(id){  

        recipeView.clearRecipes();

        renderLoader(elements.recipes);

        if(state.Search) {searchView.highlightSelected(id);}

        state.recipe = new Recipe(id);
        
        try {

            await state.recipe.getRecipe();
            //console.log(state.recipe.ingredients);
            state.recipe.parseIngridents();

            state.recipe.calculateServings();
            
            state.recipe.calculateCookingTime();

            //console.log(state.recipe);

            clearLoader();

            recipeView.renderRecipes(state.recipe,state.likes.isLiked(id));
        
        } catch (err){
            console.log(err);
        }
    }
}


["hashchange","load"].forEach(e=> window.addEventListener(e,controlRecipe));

elements.recipes.addEventListener("click", e=>{
    if(e.target.matches(".btn-decrease,.btn-decrease *")){
        if(state.recipe.servings>1){
            
            state.recipe.updateServing("dec");
            
            recipeView.updateServingIngredients(state.recipe);
        
        }

    } else if(e.target.matches(".btn-increase,.btn-increase *")){
        state.recipe.updateServing("inc");
        
        recipeView.updateServingIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShoppingList();
    } else if(e.target.matches(".recipe__love,.recipe__love *")){
        controlLikes();
    }

    //console.log(state.recipe);
    
});





///////////////////////////shoppingList/////////////////////////////////////////


//window.l = new ShoppingList();

const controlShoppingList = ()=>{
    if(!state.list) state.list =new ShoppingList();
    
    state.recipe.ingredients.map(item=>{
        //console.log(item);
        
        const lists = state.list.addItem(item.count,item.unit,item.ingredient);

        ShoppingListView.renderList(lists);
    });
}


elements.shoppingList.addEventListener("click",e=>{
    const id = e.target.closest(".shopping__item").dataset.itemid;

    if(e.target.matches(".shopping__delete,.shopping__delete *")){
        state.list.deleteItem(id);

        ShoppingListView.deleteItem(id);
    } else if(e.target.matches(".shopping__count-value")){
        const newCount =parseFloat(e.target.value,10);

        state.list.updateCount(id,newCount);
    }
})





///////////////////////////////Likes //////////////////////////


const controlLikes= ()=>{

    if(!state.likes) state.likes=new Likes();

    const currentId = state.recipe.id;

    if(!state.likes.isLiked(currentId)){

        const newLike= state.likes.addLikes(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image_url
        );

        LikesView.toggleLiked(true);

        LikesView.renderLikke(newLike);

        console.log(state.likes);
    } else {
        state.likes.deleteLike(currentId);

        LikesView.toggleLiked(false);
        
        LikesView.deleteLike(currentId)
    }

    LikesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}

//window.s=state;


window.addEventListener('load', ()=>{
    state.likes = new Likes();

    state.likes.getlocalData();

    LikesView.toggleLikeMenu(state.likes.getNumberOfLikes());

    state.likes.Likes.map(like =>LikesView.renderLikke(like));
})