import Search from "./models/Search"
import {elements,renderLoader,clearLoader} from "./views/base"
import * as searchView from "./views/searchView"
import Recipe from "./models/Recipe";

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




const controlRecipe = async () =>{

    const id = window.location.hash.replace("#","");
    
    //console.log(id);

    if(id){
        state.recipe = new Recipe(id);
        
        try {

            await state.recipe.getRecipe();

            state.recipe.calculateServings();
            
            state.recipe.calculateCookingTime();

            console.log(state.recipe);

        } catch (err){
            console.log(err);
        }
    }
}


["hashchange","load"].forEach(e=> window.addEventListener(e,controlRecipe));